from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker
import random

User = get_user_model()


class Command(BaseCommand):
    help = "Generate fake users"

    def add_arguments(self, parser):
        parser.add_argument("n", type=int, help="Number of users to create")
        parser.add_argument("--seed", type=int, help="Seed for random number generator")

    def handle(self, *args, **kwargs):
        n = kwargs["n"]
        seed = kwargs.get("seed", None)

        if seed is not None:
            Faker.seed(seed)
            random.seed(seed)

        faker = Faker()

        for _ in range(n):
            email = faker.email()
            password = faker.password()
            User.objects.create_user(
                email=email,
                password=password,
            )

        self.stdout.write(self.style.SUCCESS(f"Successfully generated {n} users"))
