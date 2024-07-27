# Hakaton Project

## Описание проекта
Hakaton Project - это проект, который использует Django и Celery для отправки уведомлений пользователям. Проект позволяет отправлять уведомления по электронной почте с новыми рекомендациями каждый день в соответствии с часовыми поясами пользователей.

## Требования
Для запуска проекта вам понадобятся:
- Python 3.x
- Django
- Celery
- Redis (Скчать на windows: https://github.com/tporadowski/redis/releases)

## Установка
1. Клонируйте репозиторий:
    ```sh
    git clone https://github.com/yourusername/hakaton.git
    cd hakaton
    ```

2. Создайте виртуальное окружение и активируйте его:
    ```sh
    python -m venv venv
    source venv/bin/activate  # На Windows используйте `venv\Scripts\activate`
    ```

3. Установите зависимости:
    ```sh
    pip install -r requirements.txt
    ```

4. Примените миграции:
    ```sh
    python manage.py migrate
    ```

5. Создайте суперпользователя для доступа к админ-панели:
    ```sh
    python manage.py createsuperuser
    ```

6. Запустите сервер разработки:
    ```sh
    python manage.py runserver
    ```

## Настройка Celery
1. Убедитесь, что Redis запущен на вашем компьютере. Вы можете использовать Docker для быстрого запуска Redis:
    ```sh
    docker run -d -p 6379:6379 redis
    ```

2. Запустите Celery Worker:
    ```sh
    celery -A hakaton worker -l info
    ```

3. Запустите Celery Beat:
    ```sh
    celery -A hakaton beat --loglevel=info
    ```

4. (Опционально) Запустите Celery Flower для мониторинга задач:
    ```sh
    celery -A hakaton flower
    ```

## Конфигурация
Все конфигурации Celery находятся в файле `settings.py`. Убедитесь, что вы указали правильные настройки для брокера и бэкенда:

```python
# settings.py

CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

CELERY_BEAT_SCHEDULE = {
    'send-daily-recommendations-every-hour': {
        'task': 'project.tasks.send_daily_recommendations_celery',
        'schedule': crontab(minute=0, hour='*/1'),
    },
}
