import graphene
from graphene_django import DjangoObjectType
import graphql_jwt

from .models import CustomUser


# UserType definition
class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser


# RegisterUser mutation
class RegisterUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, email, password):
        user = CustomUser.objects.create_user(email=email, password=password)
        return RegisterUser(user=user)


# Query class
class Query(graphene.ObjectType):
    users = graphene.List(UserType)
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
