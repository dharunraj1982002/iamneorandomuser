from django.db import models

# Create your models here.
class Details(models.Model):
    RandomID = models.AutoField(primary_key = True)
    UserID = models.CharField(max_length = 15)
    Name = models.CharField(max_length = 50)
    EmailID = models.CharField(max_length = 50)
    DOB = models.DateField(null = True)
    PhoneNO = models.CharField(max_length = 10)
    Location = models.CharField(max_length = 40)
    Address = models.CharField(max_length = 300)
    UserStatus = models.CharField(max_length = 50)
    ImageName = models.CharField(max_length = 50)