from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
# from .models import *
# from django.db.models import fields


User=get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model=User
        fields = ('id', 'email', 'first_name', 'password')

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'profile_picture', 'birth_date', 'location', 'is_seller', 'is_active']
        
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserAccount
        fields = ('id', 'first_name', 'last_name', 'email', 'phone', 'profile_picture', 'birth_date', 'location')
        
