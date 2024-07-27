from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Event

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'spam_subscribe', 'is_staff', 'is_active', "timezone", "recommendation_sent_hour")
    list_filter = ('is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username', 'telegram', "recommendation_sent_hour")}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Event)
