import graphene
from graphene_django import DjangoObjectType
from .models import Category
from graphql import GraphQLError
from graphql_jwt.decorators import login_required


class CategoryTypeChoices(graphene.Enum):
    INCOME = "income"
    OUTCOME = "outcome"
    EXPENSE = "expense"


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "category_type", "name", "created_user")


class Query(graphene.ObjectType):
    categories = graphene.List(CategoryType)

    @login_required
    def resolve_categories(self, info):
        user = info.context.user
        return Category.objects.filter(created_user=user)


class AddCategory(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        category_type = CategoryTypeChoices(required=True)

    category = graphene.Field(CategoryType)

    @login_required
    def mutate(self, info, name, category_type):
        user = info.context.user
        category = Category(name=name, category_type=category_type, created_user=user)
        category.save()
        return AddCategory(category=category)


class UpdateCategory(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        category_type = CategoryTypeChoices()

    category = graphene.Field(CategoryType)

    @login_required
    def mutate(self, info, id, name=None, category_type=None):
        user = info.context.user
        try:
            category = Category.objects.get(pk=id, created_user=user)
        except Category.DoesNotExist:
            raise GraphQLError(
                "No category found with the provided ID or insufficient permissions"
            )

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

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        try:
            category = Category.objects.get(pk=id, created_user=user)
        except Category.DoesNotExist:
            raise GraphQLError(
                "No category found with the provided ID or insufficient permissions"
            )

        category.delete()
        return DeleteCategory(success=True)


class Mutation(graphene.ObjectType):
    add_category = AddCategory.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
