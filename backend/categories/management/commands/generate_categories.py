from django.core.management.base import BaseCommand
from faker import Faker
from categories.models import Category
import random
from users.models import CustomUser
from itertools import cycle

CATEGORY_NAMES = [
    "Rent",
    "Utilities",
    "Groceries",
    "Salary",
    "Entertainment",
    "Dining Out",
    "Transportation",
]


class Command(BaseCommand):
    help = "Generate fake categories"

    def add_arguments(self, parser):
        parser.add_argument("n", type=int, help="Number of categories to create")
        parser.add_argument("--seed", type=int, help="Seed for random number generator")

    def handle(self, *args, **kwargs):
        n = kwargs["n"]
        seed = kwargs.get("seed")

        if seed is not None:
            random.seed(seed)
            Faker.seed(seed)

        Faker()
        users_list = list(CustomUser.objects.all())

        if not users_list:
            self.stdout.write(
                self.style.ERROR("No users found. Please create some users first.")
            )
            return

        users_cycle = cycle(users_list)

        for _ in range(n):
            name = random.choice(CATEGORY_NAMES)
            category_type = random.choice(["income", "expense"])
            created_user = next(users_cycle)

            if not Category.objects.filter(
                name=name, category_type=category_type, created_user=created_user
            ).exists():
                Category.objects.create(
                    name=name, category_type=category_type, created_user=created_user
                )

        self.stdout.write(self.style.SUCCESS(f"Successfully generated {n} categories"))
