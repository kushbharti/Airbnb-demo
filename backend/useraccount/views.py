from dj_rest_auth.registration.views import RegisterView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework import status
from .serializers import CustomRegisterSerializer,UserDetailSerializer
from .models import User
from rest_framework.response import Response
from property.serializers import ReservationListSerializer
from rest_framework.permissions import IsAuthenticated


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
    

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request,pk):
    user = User.objects.filter(pk=pk).first()
    if not user:
        return Response({'detail': 'Landlord not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserDetailSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
def reservations_list(request):
    reservations = request.user.reservations.all()
    serializer = ReservationListSerializer(reservations,many=True)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):

    serializer = UserDetailSerializer(request.user)
    return Response(serializer.data)