import graphene
from graphene_django import DjangoObjectType
from .models import Category
from users.models import CustomUser
from graphql import GraphQLError


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "category_type", "name", "created_user")


class Query(graphene.ObjectType):
    categories = graphene.List(CategoryType)

    def resolve_categories(self, info):
        return Category.objects.all()


class AddCategory(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        category_type = graphene.String(required=True)
        created_user_id = graphene.ID(required=True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, name, category_type, created_user_id):
        try:
            created_user = CustomUser.objects.get(pk=created_user_id)
        except CustomUser.DoesNotExist:
            raise GraphQLError("No user found with the provided ID")

        category = Category(
            name=name, category_type=category_type, created_user=created_user
        )
        category.save()
        return AddCategory(category=category)


class UpdateCategory(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        category_type = graphene.String()

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, id, name=None, category_type=None):
        try:
            category = Category.objects.get(pk=id)
        except Category.DoesNotExist:
            raise GraphQLError("No category found with the provided ID")
        if name is not None:
            category.name = name
        if category_type is not None:
            category.category_type = category_type
        category.save()
        return UpdateCategory(category=category)


class DeleteCategory(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, id):
        try:
            category = Category.objects.get(pk=id)
        except Category.DoesNotExist:
            raise GraphQLError("No category found with the provided ID")

        category.delete()
        return DeleteCategory(success=True)


class Mutation(graphene.ObjectType):
    add_category = AddCategory.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
