from django.contrib import admin
from .models import Transaction


class TransactionAdmin(admin.ModelAdmin):
    list_display = ("amount", "user", "category", "date")  # 在列表頁面顯示的欄位
    list_filter = ("category", "date")  # 可以用來過濾的欄位
    search_fields = ("amount", "user__email", "category__name")  # 可以用來搜索的欄位


admin.site.register(Transaction, TransactionAdmin)
