from django.urls import path
from .views import get_exchange_rate, get_reverse_exchange_rate

urlpatterns = [
    path("rate/", get_exchange_rate),
    path("reverserate/", get_reverse_exchange_rate),
]