from django.test import TestCase
from .models import Category
from users.models import CustomUser


class CategoryModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user = CustomUser.objects.create_user(
            email="testuser@example.com", password="12345"
        )

        Category.objects.create(
            name="TestCategory", category_type="TestType", created_user=test_user
        )

    def test_category_content(self):
        category = Category.objects.get(id=1)
        expected_object_name = f"{category.name}"
        expected_object_type = f"{category.category_type}"
        self.assertEqual(expected_object_name, "TestCategory")
        self.assertEqual(expected_object_type, "TestType")

    def test_category_created_user(self):
        category = Category.objects.get(id=1)
        self.assertEqual(category.created_user.email, "testuser@example.com")
