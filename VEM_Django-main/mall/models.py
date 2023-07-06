from django.db import models
from accounts.models import UserAccount
from django.db.models import Avg,Sum,Count

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Template(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Shop(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100,unique=True)
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    details = models.TextField()
    image = models.ImageField(upload_to='build/static/shop_images/', default="build/static/shop_images/image1.png")    #why image for shop!
    profile_image = models.ImageField(upload_to='build/static/shop_images/', default="build/static/shop_images/image1.png")    #why image for shop!
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    total_rate = models.DecimalField(max_digits=3, decimal_places=2,default=0)
    template = models.ForeignKey(Template, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    report_count = models.PositiveIntegerField(default=0)
    shop_url = models.CharField(max_length=255, unique=True,default='url')
    
    def save(self, *args, **kwargs):
        self.shop_url = f"{self.owner.first_name}-{self.owner.last_name}-{self.title}/{self.template}"
        super().save(*args, **kwargs)

    def calculate_total_rating(self):
        ratings = ShopRate.objects.filter(shop=self)
        if ratings.exists():
            self.total_rate = ratings.aggregate(Avg('rate'))['rate__avg']
        else:
            self.total_rate = 0

    def calculate_total_report(self):
        reports = ShopReport.objects.filter(shop=self)
        if reports.exists():
            self.report_count = reports.aggregate(Count('id'))['report_state__sum']
        else:
            self.report_count = 0

    def __str__(self):
        return self.title


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    details = models.TextField()
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='build/static/product_pictures/', blank=True, null=True, default='build/static/product_pictures/profile.png')
    product_id = models.CharField(default="Default")
    price_id = models.CharField(default="Default")
    quantity = models.PositiveIntegerField(default=0)
    total_rate = models.DecimalField(max_digits=3, decimal_places=2,default=0)
    # total_like = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    report_count = models.PositiveIntegerField(default=0)

    def calculate_total_rating(self):
        ratings = ProductRate.objects.filter(product=self)
        if ratings.exists():
            self.total_rate = ratings.aggregate(Avg('rate'))['rate__avg']
            # return ratings.aggregate(Avg('rate'))['rate__avg']
        else:
            self.total_rate = 0
    

    def __str__(self):
        return self.title


# class ProductPicture(models.Model):
#     id = models.AutoField(primary_key=True)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     picture = models.ImageField(upload_to='build/static/product_images/')

#     def __str__(self):
#         return f'{self.product.title} - {self.id}'


class CommentProduct(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    comment_body = models.TextField()
    report_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user.email} - {self.product.title}'


class CommentShop(models.Model):
    id = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    comment_body = models.TextField()
    report_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user.email} - {self.shop.title}'
    
    def calculate_total_report(self):
        reports = CommentShopReport.objects.filter(comment=self)
        if reports.exists():
            self.report_count = reports.aggregate(Sum('report_state'))['report_state__sum']
        else:
            self.report_count = 0

class CommentShopReport(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.ForeignKey(CommentProduct, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    report_type_choices = [
        ('Inappropriate Content', 'Inappropriate Content'),
        ('Spam', 'Spam'),
        ('Other', 'Other')
    ]
    report_type = models.CharField(max_length=50, choices=report_type_choices)

    def __str__(self):
        return f'{self.user.email} - {self.comment.comment_body}'



class ProductReport(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    report_type_choices = [
        ('Inappropriate Content', 'Inappropriate Content'),
        ('Fake Product', 'Fake Product'),
        ('Other', 'Other')
    ]
    report_type = models.CharField(max_length=50, choices=report_type_choices)

    def __str__(self):
        return f'{self.user.email} - {self.product.title}'


class ShopReport(models.Model):
    id = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    report_type_choices = [
        ('Inappropriate Content', 'Inappropriate Content'),
        ('Fake Shop', 'Fake Shop'),
        ('Other', 'Other')
    ]
    report_type = models.CharField(max_length=50, choices=report_type_choices,null=True)


    def save(self, *args, **kwargs):
        if not self.pk:  # Check if instance is new
            self.shop.report_count += 1
            self.shop.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email} - {self.shop.title}'


class CommentReport(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.ForeignKey(CommentProduct, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    report_type_choices = [
        ('Inappropriate Content', 'Inappropriate Content'),
        ('Spam', 'Spam'),
        ('Other', 'Other')
    ]
    report_type = models.CharField(max_length=50, choices=report_type_choices)

    def __str__(self):
        return f'{self.user.email} - {self.comment.comment_body}'


class ProductRate(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    rate = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        super(ProductRate, self).save(*args, **kwargs)
        self.product.calculate_total_rating()
        self.product.save()
    
    def __str__(self):
        return f'{self.user.email} - {self.product.title}'


class ShopRate(models.Model):
    id = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    rate = models.PositiveIntegerField()
    
    def save(self, *args, **kwargs):
        super(ShopRate, self).save(*args, **kwargs)
        self.shop.calculate_total_rating()
        self.shop.save()


    def __str__(self):
        return f'{self.user.email} - {self.shop.title}'


# class ShopLike(models.Model):
#     id = models.AutoField(primary_key=True)
#     shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
#     user = models.ForeignKey(Profile, on_delete=models.CASCADE)

#     def __str__(self):
#         return f'{self.user.email} - {self.shop.title}'


# class ProductLike(models.Model):
#     id = models.AutoField(primary_key=True)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     user = models.ForeignKey(Profile, on_delete=models.CASCADE)

#     def __str__(self):
#         return f'{self.user.email} - {self.product.title}'


class ContactUs(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    problem = models.TextField()
    is_solved = models.BooleanField(default=False)
    date_solved = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.user.email} - {self.problem}'


class PurchaseHistory(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.email} - {self.product.title} - {self.shop.title}'


class ShopSubscribe(models.Model):
    id = models.AutoField(primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    type_choices = [
        ('Monthly', 'Monthly'),
        ('Yearly', 'Yearly')
    ]
    type = models.CharField(max_length=10, choices=type_choices)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateField()

    def __str__(self):
        return f'{self.user.email} - {self.shop.title} - {self.type}'