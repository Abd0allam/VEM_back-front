from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Shop)
admin.site.register(ShopRate)
admin.site.register(Product)
admin.site.register(ProductRate)
admin.site.register(Category)
admin.site.register(Template)
admin.site.register(ShopSubscribe)
admin.site.register(PurchaseHistory)
admin.site.register(ContactUs)
# admin.site.register(ProductPicture)
admin.site.register(CommentProduct)
admin.site.register(CommentShop)
admin.site.register(ProductReport)
admin.site.register(ShopReport)
admin.site.register(CommentReport)