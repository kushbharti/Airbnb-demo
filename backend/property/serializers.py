from rest_framework import serializers
from .models import Property,Reservation
from useraccount.serializers import UserDetailSerializer

class PropertyListSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()
    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'price_per_night',
            'image_url',
            'is_favorite',
            )
    def get_is_favorite(self, obj):
        request = self.context.get('request')

        if request and request.user.is_authenticated:
            return obj.favorited.filter(id=request.user.id).exists()

        return False

class PropertiesDetailSerializer(serializers.ModelSerializer):
    landlord = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'description',
            'price_per_night',
            'bedrooms',
            'bathrooms',
            'guests',
            'image_url',
            'landlord',
            ]


class ReservationListSerializer(serializers.ModelSerializer):
    property = PropertyListSerializer(read_only = True,many=False)
    class Meta:
        model = Reservation
        fields = ('id',
                  'start_date',
                  'end_date',
                  'guests',
                  'number_of_nights',
                  'total_price',
                  'property' 
                  )