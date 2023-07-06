from rest_framework import serializers
from .models import *
from accounts.models import *
from django.db.models import fields

class Shopserializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
############# serializer for display shop details ##################        
##### serializer to get shop owner object
class ObjectAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id','first_name', 'last_name', 'email']

##### serializer to get shop Category object
class ShopCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']

class ShopDisplayOwnerSerializer(serializers.ModelSerializer):
    owner = ObjectAccountSerializer()
    category = ShopCategorySerializer()

    class Meta:
        model = Shop
        fields = ['id', 'title', 'owner', 'details', 'image', 'category', 'total_rate', 'template', 'created_at', 'report_count', 'shop_url','profile_image']
############# End serializer for display shop details ##################  


############# serializer for display products in shop  details ##################  
class ProductShopSerializer(serializers.ModelSerializer):

    class Meta:
        model=Product
        fields= fields = ['id', 'title', 'details','image', 'shop', 'owner', 'price', 'quantity', 'created_at', 'report_count','product_id','price_id']

############# End serializer for display products in shop  details ##################  



############# serializer for display comments in shop  details ##################  
class CommentShopSerializer(serializers.ModelSerializer):
    user=ObjectAccountSerializer()
    class Meta:
        model=CommentShop
        fields = ['id', 'shop', 'user', 'comment_body', 'report_count']

############# End serializer for display comments in shop  details ##################  


############# serializer for add comments in shop  details ##################  
class AddCommentShopSerializer(serializers.ModelSerializer):
    class Meta:
        model=CommentShop
        fields = [ 'shop', 'user', 'comment_body']

############# End serializer for add comments in shop  details ##################  


############# serializer for add comments in shop  details ##################  
class ShopRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopRate
        fields = ['id', 'shop', 'user', 'rate']
############# End serializer for add comments in shop  details ################## 



#############  serializer for add report about shop  details ################## 

class ShopReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopReport
        fields = ['id', 'shop', 'user', 'report_type']


############# End serializer for add report about shop  details ################## 


########### serializers for products #######################
class ProductRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRate
        fields = '__all__'
class ProductDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRate
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    ownerEmail = serializers.EmailField(write_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'details', 'price', 'quantity', 'total_rate', 'created_at', 'report_count','ownerEmail','image')
        read_only_fields = ('id', 'created_at', 'report_count', 'total_rate')

    def create(self, validated_data):
        product = Product.objects.create(
            title=validated_data['title'],
            details=validated_data['details'],
            owner=UserAccount.objects.get(email=validated_data['ownerEmail']),
            shop=Shop.objects.get(owner=UserAccount.objects.get(email=validated_data['ownerEmail'])),
            price=validated_data['price'],
            quantity=validated_data['quantity'],
            image=validated_data['image']
        )
        product.save()
        return product
class UpdateProductSerializer(serializers.ModelSerializer):
    owner = ObjectAccountSerializer()
    shop = Shopserializer()
    class Meta:
        model = Product
        fields = '__all__'

class CommentProductSerializer(serializers.ModelSerializer):
    user=ObjectAccountSerializer()
    class Meta:
        model = CommentProduct
        fields = '__all__'


class AddCommentProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentProduct
        fields = ( 'product', 'user', 'comment_body')



###############serializer allam#########
class ShopSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    # template = TemplateSerializer()

    class Meta:
        model = Shop
        fields = '__all__'
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'