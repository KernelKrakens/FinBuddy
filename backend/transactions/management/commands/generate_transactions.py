from django.core.management.base import BaseCommand
from faker import Faker
from transactions.models import Transaction
import random
from users.models import CustomUser
from categories.models import Category


class Command(BaseCommand):
    help = "Generate fake transaction records"

    def add_arguments(self, parser):
        parser.add_argument("n", type=int, help="Number of transactions to create")
        parser.add_argument("--seed", type=int, help="Seed for random number generator")

    def handle(self, *args, **kwargs):
        n = kwargs["n"]
        seed = kwargs.get("seed")

        if seed is not None:
            random.seed(seed)
            Faker.seed(seed)

        faker = Faker()
        users = list(CustomUser.objects.all())
        if not users:
            self.stdout.write(
                self.style.ERROR("No users found. Please create some users first.")
            )
            return

        categories = list(Category.objects.all())
        if not categories:
            self.stdout.write(
                self.style.ERROR(
                    "No categories found. Please create some categories first."
                )
            )
            return

        for _ in range(n):
            category = random.choice(categories)
            amount = (
                random.randint(50, 500)
                if category.category_type == "expense"
                else random.randint(1000, 2000)
            )
            date = faker.date_between(start_date="-1y", end_date="today")
            user = random.choice(users)

            Transaction.objects.create(
                amount=amount,
                date=date,
                user=user,
                category=category,
            )

        self.stdout.write(
            self.style.SUCCESS(f"Successfully generated {n} transactions")
        )
