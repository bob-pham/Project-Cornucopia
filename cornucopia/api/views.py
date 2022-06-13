from django.shortcuts import render
from rest_framework import generics

from .serializers import UserSerializer, ProductSerializer
from .models import User, Product

# Create your views here.

class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer