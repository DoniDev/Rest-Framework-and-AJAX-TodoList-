from django.urls import path
from . import views

urlpatterns = [
    path('', views.taskList, name='task-list'),
    path('task/<int:pk>/', views.taskDetail, name='task-detail'),
    path('task/<int:pk>/update/', views.taskUpdate, name='task-update'),
    path('task/create/', views.taskCreate, name='task-create'),
    path('task/<int:pk>/delete/', views.taskDelete, name='task-delete'),




]