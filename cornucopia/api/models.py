from django.db import models
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.

# User = get_user_model()

# def pkgen():
#     from base64 import b32encode
#     from hashlib import sha1
#     import string
#     import random

#     pk = "".join(random.choices(string.ascii_letters + string.digits, k=16))

#     return pk


# class User(models.Model):
#     user_name = models.CharField(max_length=24)
#     userID = models.CharField(max_length=15, primary_key=True, default=pkgen)
#     user = models.OneToOneField(User, related_name="account", on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     # owned_product = models.ManyToManyField('Product')

# class Product(models.Model):
#     name = models.CharField(max_length=100)
#     company = models.CharField(max_length=100)
#     expiration_date = models.DateField()
#     # owned_by_users = models.ManyToManyField('User')

class Receipt(models.Model):
    img = models.ImageField(upload_to='images/')
