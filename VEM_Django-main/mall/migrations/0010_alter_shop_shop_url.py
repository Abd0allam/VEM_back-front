# Generated by Django 4.2.2 on 2023-06-29 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mall', '0009_shop_shop_url_alter_shop_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='shop_url',
            field=models.CharField(default='url', max_length=255, unique=True),
        ),
    ]
