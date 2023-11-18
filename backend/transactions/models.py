from django.db import models


class Transaction(models.Model):
    amount = models.IntegerField()
    user = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE)
    category = models.ForeignKey("category.Category", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "transactions"
