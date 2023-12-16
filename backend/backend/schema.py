import graphene
import users.schema


class Query(users.schema.Query, graphene.ObjectType):
    pass


class Mutation(users.schema.Mutation, graphene.ObjectType):
    # This will include all mutations from users.schema.Mutation
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
