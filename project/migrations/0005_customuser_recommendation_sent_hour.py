# Generated by Django 5.0.7 on 2024-07-27 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0004_rename_spam_subcribe_customuser_spam_subscribe_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='recommendation_sent_hour',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
