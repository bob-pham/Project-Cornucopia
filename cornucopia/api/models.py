from django.db import models

# Create your models here.

class User(models.Model):
    user_name = models.CharField(max_length=24)
    name = models.CharField(max_length=100)
    owned_product = models.ManyToManyField('Product')

class Product(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    expiration_date = models.DateField()
    owned_by_users = models.ManyToManyField('User')
