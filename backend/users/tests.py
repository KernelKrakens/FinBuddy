from django.test import TestCase
from .models import CustomUser


class CustomUserTestCase(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@email.com", password="testpass123"
        )

    def test_create_user(self):
        self.assertEqual(self.user.email, "test@email.com")
        self.assertFalse(self.user.is_superuser)
        self.assertTrue(self.user.is_active)

    def test_create_superuser(self):
        admin_user = CustomUser.objects.create_superuser(
            email="admin@email.com", password="adminpass123"
        )
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)
