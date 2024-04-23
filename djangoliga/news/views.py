from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from rest_framework import generics
from .models import Info,Info_basket, Info_hokey, Subs_info
from .serializer import UsersSerializers, InfoBasketSerializers , InfoHokeySerializers,SubsSerializers
from django.contrib.auth.hashers import make_password




class Subs_post(generics.ListCreateAPIView):
    queryset = Subs_info.objects.all()
    serializer_class = SubsSerializers

class Subs_get_post_delete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subs_info.objects.all()
    serializer_class = SubsSerializers

class Infopost(generics.ListCreateAPIView):
    queryset = Info.objects.all()
    serializer_class = UsersSerializers

class Info_get_post_path(generics.RetrieveUpdateDestroyAPIView):
    queryset = Info.objects.all()
    serializer_class = UsersSerializers

class Infopost_Basket(generics.ListCreateAPIView):
    queryset = Info_basket.objects.all()
    serializer_class = InfoBasketSerializers

class Info_get_post_path_Basket(generics.RetrieveUpdateDestroyAPIView):
    queryset = Info_basket.objects.all()
    serializer_class = InfoBasketSerializers

class Infopost_Hokey(generics.ListCreateAPIView):
    queryset = Info_hokey.objects.all()
    serializer_class = InfoHokeySerializers

class Info_get_post_path_Hokey(generics.RetrieveUpdateDestroyAPIView):
    queryset = Info_hokey.objects.all()
    serializer_class = InfoHokeySerializers


@api_view(['POST'])
def change_password(request):
    # Получаем токен авторизации из заголовка запроса
    auth_header = request.META.get('HTTP_AUTHORIZATION')

    # Проверяем наличие токена авторизации
    if auth_header:
        try:
            # Извлекаем токен из заголовка
            token = auth_header.split(' ')[1]
            # Получаем объект токена из базы данных
            token_obj = Token.objects.get(key=token)
            # Получаем пользователя, связанного с этим токеном
            user = token_obj.user

            # Получаем текущий пароль, новый пароль и подтверждение нового пароля из запроса
            current_password = request.data.get('current_password')
            new_password = request.data.get('new_password')
            confirm_new_password = request.data.get('confirm_new_password')

            # Проверяем, совпадает ли текущий пароль пользователя с введенным паролем
            if not user.check_password(current_password):
                return Response({"error": "Текущий пароль неверен."}, status=status.HTTP_400_BAD_REQUEST)

            # Проверяем, совпадают ли новый пароль и подтверждение нового пароля
            if new_password != confirm_new_password:
                return Response({"error": "Новый пароль и подтверждение не совпадают."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Устанавливаем новый пароль для пользователя
            user.set_password(new_password)
            user.save()

            return Response({"status": "Password changed successfully"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            # Если токен не найден, возвращаем ошибку
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        # Если токен авторизации не был предоставлен, возвращаем ошибку
        return Response({"error": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')
    username = request.data.get('username')  # Получаем имя пользователя из запроса

    if not User.objects.filter(email=email).exists():
        user = User.objects.create_user(username=username, email=email, password=password)  # Используем полученное имя пользователя
        token = Token.objects.create(user=user)
        return Response({"status": "User created", "token": token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response({"status": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=email, password=password)

    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"status": "Logged in", "token": token.key}, status=status.HTTP_200_OK)
    else:
        return Response({"status": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"status": "Logged out"}, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_user(request):
    if 'HTTP_AUTHORIZATION' in request.META:
        auth_header = request.META['HTTP_AUTHORIZATION']
        token = auth_header.split(' ')[1]  # Получаем токен из заголовка авторизации

        try:
            user = Token.objects.get(key=token).user
            return Response({"username": user.username, "email": user.email}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
