import graphene
from graphene_django import DjangoObjectType
from .models import Category


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "category_type", "name", "created_user")


class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)

    def resolve_all_categories(self, info):
        return Category.objects.all()


schema = graphene.Schema(query=Query)
