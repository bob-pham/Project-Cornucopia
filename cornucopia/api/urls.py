from django.urls import path
from .views import UserView, ProductView 

urlpatterns = [
    path('', UserView.as_view())
]