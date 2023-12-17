from django.contrib import admin
from .models import Category


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category_type", "created_user")  # 在列表頁面顯示的欄位
    list_filter = ("category_type",)  # 可以用來過濾的欄位
    search_fields = ("name", "category_type", "created_user__email")  # 可以用來搜索的欄位


admin.site.register(Category, CategoryAdmin)
