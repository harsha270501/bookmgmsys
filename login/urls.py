from django.urls import path
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('login/login.html',views.login,name='login'),
    path('login/usersignup.html',views.usersignup,name='usersignup'),
    path('login/adminsignup.html',views.adminsignup,name='adminsignup'),
    path('login/submit',views.usersubmit,name='usersubmit'),
    path('login/adminsubmit',views.adminsubmit,name='adminsubmit'),
    path('login/submitlogin',views.submitlogin,name='submitlogin'),
    path('login/mgmusers',views.getusers,name='mgmusers'),
    path('login/delusers',views.delusers,name='mgmusers'),
    path('login/dispuser',views.search,name='search'),
    path('login/makeadmin',views.makeadmin,name='makeadmin'),
    path('login/dashboard',views.dashboard,name='makeadmin'),
    path('login/saveuser',views.saveuser,name='makeadmin')
]