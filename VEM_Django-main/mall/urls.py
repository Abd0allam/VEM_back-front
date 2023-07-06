from django.urls import path,re_path
from django.views.generic import TemplateView
from mall.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #paths for api
    path("rated", get_top_rated , name='get_top_rated'),
    path("myshop", display_myshop , name='display_myshop'),
    path("displayshop/<int:id>", display_shop , name='display_myshop'),
    path('myshop/products/', ProductList.as_view(), name='product_list'),
    path('mycart/products/', ProductCart.as_view(), name='product_list'),
    path('myshop/comments/',DisplayComments.as_view(), name='display_comments'),
    path('myshop/comments/create/',add_comment_shop, name='add_comment'),
    path('add-rate/',add_update_rate, name='add_update_rate'),
    path('set-report/',set_shop_report, name='set_shop_report'),
    path('allshops/', AllShopList.as_view(), name='all_shop-list'),# all
    path('<int:id>/', ShopList.as_view(), name='shop-list'),# one_shop
    path('add/', ShopCreate.as_view(), name='shop-create'),
    path('shopdetails/<int:pk>/', ShopDetail.as_view(), name='shop-detail'),
    path('shops/', NewShopView.as_view(), name='new-shops'),




    ######### products url
    path("addproducts", add_product , name='add_product'),
    path('products/<int:pk>/', update_product, name='update_product'),
    path('products/display/<int:id>/', display_product, name='display_product'),
    path('products/comments/<int:id>/', product_comments, name='product_comments'),
    path('products/comments/create/', new_product_comment, name='new_product_comment'),
    path('products/add-rate/', add_product_rate, name='add_product_rate'),
    path('products/delete/<int:pk>', ProductDelete.as_view(), name='delete_product'),
    
    path('create-checkout-session', StripeCheckoutView.as_view()),
    
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)