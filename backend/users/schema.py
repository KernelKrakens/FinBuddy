import graphene
from graphene_django import DjangoObjectType
import graphql_jwt
from graphql_jwt.shortcuts import get_token
import requests

from .models import CustomUser


# UserType definition
class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser


class LimitedUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = ("id", "email")  # example of limited fields


class RegisterUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, email, password):
        user = CustomUser.objects.create_user(email=email, password=password)
        return RegisterUser(user=user)


class GoogleLogin(graphene.Mutation):
    class Arguments:
        id_token = graphene.String(required=True)

    jwt_token = graphene.String()

    @staticmethod
    def mutate(root, info, id_token):
        google_token_info_url = (
            "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token
        )

        try:
            response = requests.get(google_token_info_url)
            token_info = response.json()

            if not token_info.get("error"):
                if token_info["aud"] == "your-google-client-id":
                    user_email = token_info["email"]

                    user, created = CustomUser.objects.get_or_create(email=user_email)
                    if created:
                        user.set_password(CustomUser.objects.make_random_password())
                        user.save()

                    jwt_token = get_token(user)

                    return GoogleLogin(jwt_token=jwt_token)
                else:
                    raise Exception("Invalid audience/client ID")
            else:
                raise Exception("Invalid Google OAuth2 token")
        except Exception as e:
            raise Exception("Google authentication failed: " + str(e))


class Query(graphene.ObjectType):
    users = graphene.List(LimitedUserType)
    user_info = graphene.Field(UserType)

    def resolve_users(self, info):
        return CustomUser.objects.all()

    def resolve_user_info(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in or invalid token!")
        return user


# Combining in main schema
class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()

    # JWT mutations
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
