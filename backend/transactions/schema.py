import graphene
from graphene_django import DjangoObjectType
from .models import Transaction


class TransactionType(DjangoObjectType):
    class Meta:
        model = Transaction
        fields = ("id", "amount", "user", "category", "date")


class Query(graphene.ObjectType):
    all_transactions = graphene.List(TransactionType)

    def resolve_all_transactions(self, info):
        return Transaction.objects.all()


schema = graphene.Schema(query=Query)
