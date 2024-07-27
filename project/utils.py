import datetime


def get_timezone(data: dict) -> str:
    timezone = data.get("offset", 0)
    delta = datetime.timedelta(hours=timezone)
    return str(datetime.timezone(delta))

def get_recommendation_sent_hour(data: dict) -> int:
    timezone = data.get("offset", 0)
    current_time = datetime.datetime.now()
    adjusted_time = current_time - datetime.timedelta(hours=timezone)
    return adjusted_time.hour