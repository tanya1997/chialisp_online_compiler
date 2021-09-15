from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^api/run_command/$', views.run_command),
    url(r'^api/brun_command/$', views.brun_command),
]
