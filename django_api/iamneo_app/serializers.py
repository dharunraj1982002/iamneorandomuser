from rest_framework import serializers
from iamneo_app.models import Details

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = '__all__'