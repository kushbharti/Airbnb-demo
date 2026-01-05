from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from .models import Property,Reservation
from .serializers import PropertyListSerializer,PropertiesDetailSerializer,ReservationListSerializer
from .forms import PropertyForm
from rest_framework.permissions import IsAuthenticated,AllowAny
from useraccount.models import User



@api_view(['GET'])
@permission_classes([AllowAny])
def properties_list(request):
    
    properties = Property.objects.all()
    
    country = request.GET.get('country','')
    category = request.GET.get('category','')
    checkin_date = request.GET.get('checkIn','')
    checkout_date = request.GET.get('checkOut','')
    bedrooms = request.GET.get('numBedrooms','')
    guests = request.GET.get('numGuests','')
    bathrooms = request.GET.get('numBathrooms','')
    
    if checkin_date and checkout_date:
        exact_matches = Reservation.objects.filter(start_date=checkin_date | Reservation.objects.filter(end_date=checkout_date))
        
        
        overlap_matches = Reservation.objects.filter(start_date__lte=checkout_date,end_date__gte=checkin_date)
        
        all_matches =[]
        
        for reservation in exact_matches|overlap_matches:
            all_matches.append(reservation.property.id)
            
        properties=properties.exclude(id__in=all_matches)
        
        
    
    if guests:
        properties =properties.filter(guests__gte=guests)
        
    if bedrooms:
        properties =properties.filter(bedrooms__gte=bedrooms)
        
    if bathrooms:
        properties =properties.filter(bathrooms__gte=bathrooms)
        
    if country:
        properties =properties.filter(country=country)
        
    if category and category != 'undefined':
        properties =properties.filter(category=category)
    
    
    
    
    is_favorites = request.GET.get('is_favorites')
    if is_favorites == "true":
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        properties = properties.filter(favorited=request.user) 
    landlord_id = request.GET.get('landlord_id','')
    if landlord_id:
        properties = properties.filter(landlord_id=landlord_id)
    serializer = PropertyListSerializer(properties, many=True,context={'request': request})
     
    return Response({
        'data': serializer.data,
    })
    

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request,pk):
    property = Property.objects.filter(pk=pk).first()
    if not property:
        return Response({'detail': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PropertiesDetailSerializer(property,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservation(request,pk):
        property = Property.objects.filter(pk=pk).first()
        if not property:
            return Response({'detail': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
        reservations = property.reservations.all()
        serializer = ReservationListSerializer(reservations,many=True)
        return Response(serializer.data)
   



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_property(request):
    print("USER:", request.user)  
    form = PropertyForm(request.POST,request.FILES)
    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()
        
        return Response({'success':True})
    else:
        print('error',form.errors,form.non_field_errors)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_property(request,pk):
    print("AUTH USER:", request.user) 
    if not request.user.is_authenticated:
        return Response(
        {"detail": "User not authenticated"},
        status=status.HTTP_401_UNAUTHORIZED
    )
    start_date = request.POST.get('start_date','')
    end_date = request.POST.get('end_date','')
    number_of_nights = request.POST.get('number_of_nights',1)
    total_price = request.POST.get('total_price',0)
    guests = request.POST.get('guests',1)

    
    property = Property.objects.filter(pk=pk).first()
    Reservation.objects.create(
        property=property,
        start_date=start_date,
        end_date=end_date,
        number_of_nights=number_of_nights,
        total_price=total_price,
        guests=guests,
        created_by = request.user
    )
    return Response({'success':True})
  
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request,pk):
    property = Property.objects.filter(pk=pk).first()
    
    if request.user in property.favorited.all():
        property.favorited.remove(request.user)
        return Response({'is_favorite':False})
    else:
        property.favorited.add(request.user)
        return Response({'is_favorite':True})