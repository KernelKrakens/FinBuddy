import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.core.exceptions import ObjectDoesNotExist
from .models import Transaction
from categories.models import Category
from graphql_jwt.decorators import login_required


class TransactionType(DjangoObjectType):
    class Meta:
        model = Transaction
        fields = ("id", "amount", "user", "category", "date")


class Query(graphene.ObjectType):
    transactions = graphene.List(TransactionType)

    @login_required
    def resolve_transactions(self, info):
        user = info.context.user
        return Transaction.objects.filter(user=user)


class AddTransaction(graphene.Mutation):
    class Arguments:
        amount = graphene.Int(required=True)
        category_id = graphene.ID(required=True)
        date = graphene.DateTime(required=True)

    transaction = graphene.Field(TransactionType)

    @login_required
    def mutate(self, info, amount, category_id, date):
        user = info.context.user
        try:
            category = Category.objects.get(pk=category_id)
        except ObjectDoesNotExist as e:
            raise GraphQLError("An object does not exist with given ID: " + str(e))

        transaction = Transaction(
            amount=amount, user=user, category=category, date=date
        )
        transaction.save()
        return AddTransaction(transaction=transaction)


class UpdateTransaction(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        amount = graphene.Int()
        category_id = graphene.ID()
        date = graphene.DateTime()

    transaction = graphene.Field(TransactionType)

    @login_required
    def mutate(self, info, id, amount=None, category_id=None, date=None):
        user = info.context.user
        try:
            transaction = Transaction.objects.get(pk=id, user=user)
        except Transaction.DoesNotExist:
            raise GraphQLError(
                "No transaction found with the provided ID or insufficient permissions"
            )

        if category_id is not None:
            try:
                transaction.category = Category.objects.get(pk=category_id)
            except Category.DoesNotExist:
                raise GraphQLError("No category found with the provided ID")

        if amount is not None:
            transaction.amount = amount
        if date is not None:
            transaction.date = date

        transaction.save()
        return UpdateTransaction(transaction=transaction)


class DeleteTransaction(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    @login_required
    def mutate(self, info, id):
        user = info.context.user
        try:
            transaction = Transaction.objects.get(pk=id, user=user)
        except Transaction.DoesNotExist:
            raise GraphQLError(
                "No transaction found with the provided ID or insufficient permissions"
            )

        transaction.delete()
        return DeleteTransaction(success=True)


class Mutation(graphene.ObjectType):
    add_transaction = AddTransaction.Field()
    update_transaction = UpdateTransaction.Field()
    delete_transaction = DeleteTransaction.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
