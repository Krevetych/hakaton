from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from loguru import logger


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)

    def update_user(self, user_id, **extra_fields):
        try:
            user = self.get(pk=user_id)
            for field, value in extra_fields.items():
                setattr(user, field, value)
            user.save(using=self._db)
            return user
        except CustomUser.DoesNotExist:
            return None

    def change_password(self, email: str, password: str):
        # user = self.model(email=email)
        user = CustomUser.objects.filter(email=email).first()
        if user is None:
            raise ValueError("Invalid email address")

        user.set_password(password)
        user.save(using=self._db)
        return user


    def delete_user(self, user_id):
        try:
            user = self.get(pk=user_id)
            user.delete()
            return True
        except CustomUser.DoesNotExist:
            return False

    def get_user(self, user_id):
        try:
            return self.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return None


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    telegram = models.CharField(max_length=30, blank=True, null=True)

    timezone = models.CharField(max_length=50, default="UTC")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    recommendation_sent_hour = models.IntegerField(default=0, blank=True, null=True, unique=False)
    last_recommendation_sent = models.DateTimeField(auto_now_add=True)

    spam_subscribe = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"{self.username} {self.spam_subscribe}"


class Event(models.Model):
    '''Model definition for ModelName.'''

    title = models.CharField(max_length=200)
    description = models.TextField()
    description_over = models.TextField(blank=True)

    date_open = models.DateField()

    objects = models.Manager()

    class Meta:
        '''Meta definition for ModelName.'''

        verbose_name = 'События'
        verbose_name_plural = 'Событие'

    def __str__(self):
        return self.title