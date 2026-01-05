from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView,LogoutView,UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView
from . import views


urlpatterns = [
     path('register/',views.CustomRegisterView.as_view(),name='rest_register'),
     path('login', LoginView.as_view(),name='rest_login'),
     path('logout',LogoutView.as_view(),name='rest_logout'),
      path('', views.current_user, name='current-user'),
     path('<uuid:pk>/',views.landlord_detail,name='landlord_detail'),
     path('myreservations-list/',views.reservations_list,name='reservations_list'),
]