from django.shortcuts import render
import requests
from datetime import datetime, timedelta
from django.http import JsonResponse
from django.http import HttpResponse

ALLOWED_CURRENCIES = ['CAD', 'USD', 'EUR']
DEFAULT_BASE_CURRENCY = 'USD'
YEAR_RANGE = 2

# API for base and target currency exchange rates
# https://localhost:8000/api/rate/?base=USD&reversed=False
def get_exchange_rate(request):
    # Base & Reverse Flag from URL
    base = request.GET.get('base', DEFAULT_BASE_CURRENCY).upper()
    # reversed_flag = request.GET.get('reversed', 'False')

    # Validate base currency
    if base not in ALLOWED_CURRENCIES:
        return JsonResponse({'error': 'Invalid base currency'}, status=400)

    # 2 Years from Present
    start_date = datetime.today().date()- timedelta(days=365*YEAR_RANGE)

    # Symbols 
    symbols_param = ','.join([c for c in ALLOWED_CURRENCIES if c != base])

    # Build API URL
    url = (
        f"https://api.frankfurter.dev/v1/{start_date}..?base={base}&symbols={symbols_param}"
    )

    try:
        response = requests.get(url)
        response.raise_for_status() #Check for HTTP errors
        data = response.json()
        return JsonResponse(data)
    except requests.RequestException as e:
        return JsonResponse({'error': 'Failed to fetch exchange rates', 'details': str(e)}, status=500)
