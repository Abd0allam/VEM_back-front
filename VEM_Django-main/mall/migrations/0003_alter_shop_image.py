# Generated by Django 4.2.2 on 2023-06-25 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mall', '0002_shop_image_shop_total_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='image',
            field=models.ImageField(default='build/static/shop_images/image1.png', upload_to='build/static/shop_images/'),
        ),
    ]