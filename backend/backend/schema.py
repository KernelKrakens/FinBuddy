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


class Mutation(users.schema.Mutation, graphene.ObjectType):
    # This will include all mutations from users.schema.Mutation
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
