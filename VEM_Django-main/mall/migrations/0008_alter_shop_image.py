# Generated by Django 4.2.2 on 2023-06-26 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mall', '0007_alter_shop_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='image',
            field=models.ImageField(default='build/static/shop_images/image1.png', upload_to='build/static/shop_images/'),
        ),
    ]
