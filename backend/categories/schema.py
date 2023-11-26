import graphene
from graphene_django import DjangoObjectType
from .models import Category


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "category_type", "name", "created_user")


class Query(graphene.ObjectType):
    categories = graphene.List(CategoryType)

    def resolve_categories(self, info):
        return Category.objects.all()


schema = graphene.Schema(query=Query)
