import datetime


def get_timezone(data: dict) -> str:
    timezone = data.get("offset")
    delta = datetime.timedelta(hours=timezone)
    return str(datetime.timezone(delta))
