from django.test import TestCase
from .models import Transaction
from users.models import CustomUser
from categories.models import Category
from django.utils import timezone


class TransactionModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user = CustomUser.objects.create_user(
            email="testuser@example.com", password="12345"
        )
        test_category = Category.objects.create(
            name="TestCategory", category_type="TestType", created_user=test_user
        )

        Transaction.objects.create(
            amount=100, user=test_user, category=test_category, date=timezone.now()
        )

    def test_transaction_content(self):
        transaction = Transaction.objects.get(id=1)
        self.assertEqual(transaction.amount, 100)
        self.assertEqual(transaction.user.email, "testuser@example.com")
        self.assertEqual(transaction.category.name, "TestCategory")
