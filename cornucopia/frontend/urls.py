from django.urls import path
from django.views.generic import TemplateView
# from .views import index
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('home/', TemplateView.as_view(template_name='index.html'))
]