from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

# Create Third-Party API View that returns JsonResponse with exchange rate data
# API for base and target currency exchange rates
def get_exchange_rate(request):
    # 
    return HttpResponse("Hello world!")


# API for base and target reverse currency exchange rates
def get_reverse_exchange_rate(request):
    # 
    return HttpResponse("Hello world!")