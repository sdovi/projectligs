from rest_framework import serializers
from .models import Info, Info_basket, Info_hokey,Subs_info

class SubsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Subs_info
        fields = '__all__'

class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = '__all__'

class InfoBasketSerializers(serializers.ModelSerializer):
    class Meta:
        model = Info_basket
        fields = '__all__'

class InfoHokeySerializers(serializers.ModelSerializer):
    class Meta:
        model = Info_hokey
        fields = '__all__'