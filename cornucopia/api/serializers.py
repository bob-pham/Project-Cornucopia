from pyexpat import model
from rest_framework import serializers
from .models import User, Product

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'user_name', 'name')
        # fields = ('id', 'user_name', 'name', 'owned_product')

        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'company', 'expiration_date')
        # fields = ('id', 'name', 'company', 'expiration_date', 'owned_by_users')