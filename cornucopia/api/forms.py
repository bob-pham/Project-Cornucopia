from django import forms
from .models import Receipt

class ImageForm(forms.ModelForm):
    class Meta:
        model = Receipt
        fields = ["title", "image"]