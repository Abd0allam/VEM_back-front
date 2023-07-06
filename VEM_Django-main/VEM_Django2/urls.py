
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib.auth import authenticate, login
from accounts.views import *
from django.conf import settings
from django.conf.urls.static import static
from .views import redirect_to_react_confirm_password,redirect_to_react_confirm_gmail



urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('djoser.urls')),
    path('account/', include('djoser.urls.jwt')),
    path('account/', include('djoser.social.urls')),
    # path('profile/', ViewProfileApiView.as_view(),name="profile"),
    path("shop/", include('mall.urls')),
    path("profile/", include('accounts.urls')),
    path('password/reset/confirm/<str:uid>/<str:token>', redirect_to_react_confirm_password, name='redirect_to_react'),
    path('activate/<str:uid>/<str:token>', redirect_to_react_confirm_gmail, name='redirect_to_react'),


]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 
