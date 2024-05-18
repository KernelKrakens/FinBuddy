from django.db import models

CATEGORY_CHOICES = [
    ("income", "Income"),
    ("outcome", "Outcome"),
    ("expense", "Expense"),
]


class Category(models.Model):
    category_type = models.CharField(max_length=250, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=250)
    created_user = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE)

    class Meta:
        db_table = "categories"
