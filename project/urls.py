from django.urls import path, re_path

from project.views import *

urlpatterns = [
    path("", home, name="index"),
    path("login/", login_view, name="login"), #POST
    path("logout/", logout_user, name="logout"), #POST
    path("register/", register, name="register"), #POST
    path('change-password/', change_password, name='enable-even-spam'), #POST

    path('user/', user_detail_view, name='user-detail'), #GET
    path('user/disable-even-spam/', disable_event_spam, name='disable-even-spam'), #POST
    path('user/enable-even-spam/', enable_event_spam, name='enable-even-spam'), #POST

    path("event/all/", get_all_events, name="all-events"), #GET
    path("event/user/", get_events_for_user, name="events-for-user"), #GET
    path("event/<str:id>/", get_events_by_id, name="event-by-id"), #GET
]
