from django.shortcuts import render,redirect
from django.http import HttpResponse ,HttpResponseRedirect
from .models import *
from rest_framework.response import Response
from  rest_framework.decorators import  api_view
from .serializers import *
from rest_framework.status import *
from django.shortcuts import  get_object_or_404,get_list_or_404
# Create your views here.
#####authentication imports#######
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework import generics

##############imports for product 
from django.conf import settings
from rest_framework.views import APIView
import os
import stripe
from stripe.error import StripeError
stripe.api_key = settings.STRIPE_SECRET_KEY
import json

## @authentication_classes([JWTAuthentication]) ||| @permission_classes([IsAuthenticated])
##################################



@api_view(['GET'])
@permission_classes([AllowAny])
def get_top_rated(req):
    # top_rated_shops = Shop.objects.order_by('-total_rate')[:5]
    top_rated_shops = get_list_or_404(Shop.objects.order_by('-total_rate')[:5])


    if(top_rated_shops):
            shop_json = Shopserializer(top_rated_shops,many=True)
            return Response(status = HTTP_202_ACCEPTED, data={'Shop': shop_json.data})
    #else return status code 404 not found
    else:
        return  Response(status=HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
# @permission_classes([AllowAny])
def display_myshop(request):
    print(request.user.id)
    print(request.user)
    
    print("hello")
    # top_rated_shops = Shop.objects.order_by('-total_rate')[:5]
    instance_shop =Shop.objects.get(owner_id=request.user.id)
    print(instance_shop)
    print("hello before check ")
    if(instance_shop):
        serializer = ShopDisplayOwnerSerializer(instance_shop)
        return Response(serializer.data,status = HTTP_200_OK)
    else:
        return  Response(status=HTTP_404_NOT_FOUND)
    #########
    #######
    

    
######### product list view with generics
class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductShopSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        shop_id= self.request.query_params.get('shop_id')
        if shop_id:
            return Product.objects.filter(shop=shop_id)
        else:
            return Response(status=HTTP_404_NOT_FOUND)
        
######### product list to get cart product view with generics
class ProductCart(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductShopSerializer
    permission_classes = [AllowAny]
        
######### comments list view with generics

class DisplayComments(generics.ListCreateAPIView):
    serializer_class = CommentShopSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        shop_id= self.request.query_params.get('shop_id')
        if shop_id:
            return CommentShop.objects.filter(shop=shop_id)
        else:
            return Response(status=HTTP_404_NOT_FOUND)   


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_comment_shop(request):
    serializer = AddCommentShopSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user) # assuming the request includes a valid user token
        return Response(serializer.data, status=HTTP_201_CREATED)
    else:
        
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    





########view to dipslay shop as user (customer)##############
@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
def display_shop(request,id):
    # top_rated_shops = Shop.objects.order_by('-total_rate')[:5]
    instance_shop =Shop.objects.get(pk=id)
    print(instance_shop)
    if(instance_shop):
        serializer = ShopDisplayOwnerSerializer(instance_shop)
        return Response(serializer.data,status = HTTP_200_OK)
    else:
        return  Response(status=HTTP_404_NOT_FOUND)
################################################################    

################### set rate or update rate########
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_update_rate(request):
    print("hello")
    
    user = request.user
    shop_id = request.data.get('shop')
    rate = request.data.get('rate')
    print(user)
    print(shop_id)
    print(rate)
    try:
        # Check if user has already rated this shop
        shop_rate = ShopRate.objects.get(user=user, shop=shop_id)
        print("after try")
        print(shop_rate)
        shop_rate.rate = rate
        shop_rate.save()
    except ShopRate.DoesNotExist:
        # Create new shop rate
        instance_shop=Shop.objects.get(pk=shop_id)
        shop_rate = ShopRate.objects.create(user=user, shop=instance_shop, rate=rate)

    serializer = ShopRateSerializer(shop_rate)
    return Response(serializer.data, status=HTTP_201_CREATED)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def set_shop_report(request):
    
    user = request.user
    shop_id = request.data.get('shop')
    report_type = request.data.get('report_type')
    print(request.data)
    print(shop_id)
    print(user)
    print(report_type)
    try:
        # Create a new ShopReport object with the form data
        print("hello from try")
        shop_report = ShopReport.objects.get(user=user, shop=shop_id)
        shop_report.report_type = report_type
        shop_report.save()
    except ShopReport.DoesNotExist:
        print("hello from except")
        instance_shop=Shop.objects.get(pk=shop_id)

        shop_report = ShopReport.objects.create(
            shop=instance_shop,
            user=user,
            report_type=report_type,
        )
    serializer = ShopReportSerializer(shop_report)
    return Response(serializer.data, status=HTTP_201_CREATED)


############## products view##############
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_product(req):
    print(req.data)
    
    serializer = ProductSerializer(data=req.data)
    if serializer.is_valid():
        product = serializer.save()
        # Create product in Stripe
        stripe_product = stripe.Product.create(
            name=product.title,
            description=product.details,
        )

        # Create price for product
        stripe_price = stripe.Price.create(
            unit_amount=int(product.price * 100), # Stripe uses the amount in cents
            currency="usd",
            product=stripe_product.id
        )

        # Update the product with the Stripe product ID and price ID
        product.product_id = stripe_product.id
        product.price_id = stripe_price.id
        product.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

#################################### add images to product ###########################


#################################### payment for rent ###########################

# @permission_classes([AllowAny])
# class StripeCheckoutView(APIView):
#     def post(self, request):
#         try:
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price': 'price_1NMIsBKIlhL0Db7DroYuJa6n',
#                         'quantity': 1,
#                     },
#                 ],
#                 payment_method_types=['card'],
#                 mode='payment',
#                 success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
#                 cancel_url=settings.SITE_URL + '/?canceled=true',
#             )

#             return redirect(checkout_session.url)
#         except stripe.error.InvalidRequestError as e:
#             return Response(
#                 {'error': 'Invalid request error: ' + str(e)},
#                 status=HTTP_500_INTERNAL_SERVER_ERROR
#             )
#         except stripe.error.StripeError as e:
#             return Response(
#                 {'error': 'Stripe error: ' + str(e)},
#                 status=HTTP_500_INTERNAL_SERVER_ERROR
#             )
#         except Exception as e:
#             return Response(
#                 {'error': 'An error occurred: ' + str(e)},
#                 status=HTTP_500_INTERNAL_SERVER_ERROR
#             )

#################################### cart payment ###########################
# @api_view('POST')
@permission_classes([AllowAny])
class StripeCheckoutView(APIView):
    def post(self, request):
        # print(request.data['cart_items'])
        cart_items_str = request.data.get('cart_items', [])
        cart_items = json.loads(cart_items_str)

        print(cart_items)
        line_items = []

        for item in cart_items:
            line_item = {
                'price': item['price_id'],  # Updated line
                'quantity': item['quantity'],
            }
            line_items.append(line_item)

        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                payment_method_types=['card'],
                mode='payment',
                success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '/?canceled=true',
            )

            return redirect(checkout_session.url)
        except stripe.error.InvalidRequestError as e:
            return Response(
                {'error': 'Invalid request error: ' + str(e)},
                status=HTTP_500_INTERNAL_SERVER_ERROR
            )
        except stripe.error.StripeError as e:
            return Response(
                {'error': 'Stripe error: ' + str(e)},
                status=HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            return Response(
                {'error': 'An error occurred: ' + str(e)},
                status=HTTP_500_INTERNAL_SERVER_ERROR
            )

#################################### update product ###########################



class ProductDelete(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductDeleteSerializer

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
# @permission_classes([AllowAny])
def update_product(req, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND)
    print(req.data)

    serializer = UpdateProductSerializer(product, data=req.data , partial=True)
    if serializer.is_valid():
        if 'image' in req.FILES:
            # Delete the existing image file from the server
            if product.image:
                os.remove(product.image.path)

        serializer.save()
        try:
            # Retrieve the Stripe Price object using the stored Stripe Price ID
            stripe_price = stripe.Price.retrieve(product.price_id)
            print(product)
            print(stripe_price)
            # Archiving the existing Price object from Stripe

            stripe_price.active = False
            stripe_price.save()

            # Creating new price
            new_price = stripe.Price.create(
            unit_amount = int(product.price * 100),  # Price should be in cents
            currency = 'usd',
            product = product.product_id,
            # lookup_key = product.id
            )

            # Update the product with the Stripe product ID and price ID
            product.price_id = new_price.id
            product.save()
        except StripeError as e:
            # Handle any Stripe API errors
            print(f"Error updating price in Stripe: {str(e)}")
        return Response(serializer.data)
    else:
        print(serializer.errors)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)




#################################### display product info ###########################

@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
def display_product(request,id):
    current_product =Product.objects.get(pk=id)
    if(current_product):
        serializer = UpdateProductSerializer(current_product)
        return Response(serializer.data,status = HTTP_200_OK)
    else:
        return  Response(status=HTTP_404_NOT_FOUND)

#################################### get product  comments ###########################

@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
@permission_classes([AllowAny])
def product_comments(request,id):
    current_product_comments =CommentProduct.objects.filter(product=id)
    if(current_product_comments):
        serializer = CommentProductSerializer(current_product_comments ,many=True)
        return Response(serializer.data,status = HTTP_200_OK)
    else:
        return  Response(status=HTTP_404_NOT_FOUND)

#################################### add new product comment ###########################

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def new_product_comment(request):
    serializer = AddCommentProductSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        print(serializer.errors)
        serializer.save(user=request.user) # assuming the request includes a valid user token
        return Response(serializer.errors, status=HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)



################################# rate Product ########################

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_product_rate(request):
    user = request.user
    product_id = request.data.get('product')
    rate = request.data.get('rate')
    try:
        # Check if user has already rated this shop
        product_rate = ProductRate.objects.get(user=user, product=product_id)
        product_rate.rate = rate
        product_rate.save()
    except ProductRate.DoesNotExist:
        # Create new product rate
        instance_product=Product.objects.get(pk=product_id)
        product_rate = ProductRate.objects.create(user=user, product=instance_product, rate=rate)

    serializer = ProductRateSerializer(product_rate)
    return Response(serializer.data, status=HTTP_201_CREATED)







#################code allam 
class AllShopList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Shop.objects.all()
    serializer_class = ShopDisplayOwnerSerializer








class ShopList(generics.ListAPIView):
    serializer_class = ShopSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        owner_id = self.kwargs['id']
        return Shop.objects.filter(owner=owner_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        categories = Category.objects.all()
        templates = Template.objects.all()
        category_serializer = CategorySerializer(categories, many=True)
        template_serializer = TemplateSerializer(templates, many=True)

        data = {
            'shops': serializer.data,
            'categories': category_serializer.data,
            'templates': template_serializer.data
        }

        # Return the response as a JSON object
        return Response(data)
    
class ShopDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


class ShopCreate(generics.CreateAPIView):
    serializer_class = ShopSerializer



class ShopDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer



######################### Amr ###############

class NewShopView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Shop.objects.order_by('-created_at')[:5]
    serializer_class = Shopserializer