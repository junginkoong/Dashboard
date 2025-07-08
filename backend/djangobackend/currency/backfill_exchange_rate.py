import redis
import requests
from datetime import datetime, timedelta
from django.http import JsonResponse

YEAR_RANGE = 2 # For monthly backfill, just got it change this value

def connection():
    return redis.Redis(
        host='localhost',
        port=6379,
        db=0,
        decode_responses=True
    )

def format_raw_data(record, base):
    output = []
    for date, rates in record.items():
        for target, rate in rates.items():
            temp = {"base": base}
            temp["date"] = date
            temp["target"] = target
            temp["rate"] = rate
            output.append(temp)
    
    return output


def bulk_insert_exchange_rates(redis_client, records):
    pipe = redis_client.pipeline()
    for record in records:
        key = f"historical_exchange_rate:{record['base']}:{record['target']}:{record['date']}"
        pipe.hset(key, mapping={
            "base": record["base"],
            "target": record["target"],
            "date": record["date"],
            "rate": str(record["rate"]),
        })
    pipe.execute()

def load_data():
    backfill_data = []
    symbols = ["USD", "CAD", "EUR"]
    start_date = datetime.today().date()- timedelta(days=365*YEAR_RANGE)
    for symbol in symbols:
        symbols_param = ','.join([s for s in symbols if s != symbol])
        url = (f"https://api.frankfurter.dev/v1/{start_date}..?base={symbol}&symbols={symbols_param}")

        try:
            response = requests.get(url)
            response.raise_for_status()
            backfill_data += format_raw_data(response.json(), symbol)
        except requests.RequestException as e:
            return JsonResponse({'error': 'Failed to fetch exchange rates', 'details': str(e)}, status=500)
    
    return backfill_data

def main():
    redis_client = connection()
    records = load_data()
    bulk_insert_exchange_rates(redis_client, records)

if __name__ == '__main__':
    main()


