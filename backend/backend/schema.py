import graphene
import users.schema
import categories.schema
import transactions.schema


class Query(
    users.schema.Query,
    categories.schema.Query,
    transactions.schema.Query,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query)
