from rest_framework import serializers
from .models import Match
from .models import ManualMatch


class ManualSerializers(serializers.ModelSerializer):
    class Meta:
        model = ManualMatch
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

