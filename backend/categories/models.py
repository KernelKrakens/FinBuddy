from django.db import models


class Category(models.Model):
    INCOME = "income"
    OUTCOME = "outcome"
    CATEGORY_CHOICES = [
        (INCOME, "Income"),
        (OUTCOME, "Outcome"),
    ]

    category_type = models.CharField(max_length=250, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=250)
    created_user = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE)

    class Meta:
        db_table = "categories"
