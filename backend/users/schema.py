import graphene
from graphene_django import DjangoObjectType
from .models import CustomUser


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser


class Query(graphene.ObjectType):
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return CustomUser.objects.all()
