from django.forms import ModelForm, TextInput, Textarea
from django import forms

class TaskForm(forms.Form):
    code = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Введите описание'}))
    '''your_name = forms.CharField(label='Your name', max_length=100)'''
