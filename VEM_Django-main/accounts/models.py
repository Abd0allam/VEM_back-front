from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from django.contrib.auth import authenticate, login

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin,models.Model):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    phone = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='build/static/profile_pictures/', blank=True, null=True, default='build/static/profile_pictures/profile.png')
    birth_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=100 ,default='Location')
    is_seller = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email


# class Profile(models.Model):
#     id=models.AutoField(primary_key=True)
#     first_name = models.CharField(max_length=50)
#     last_name = models.CharField(max_length=50)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)
#     phone = models.CharField(max_length=20, blank=True, null=True)
#     profile_picture = models.ImageField(upload_to='static/profile_pictures/', blank=True, null=True, default='static/profile_pictures/profile.png')
#     birth_date = models.DateField(blank=True, null=True)
#     location = models.CharField(max_length=100)
#     is_seller = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)

#     def __str__(self):
#         return self.email
    

