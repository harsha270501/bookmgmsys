from django.urls import path
from . import views

urlpatterns=[
    path('bookstore/userindex.html',views.userindex,name='userindex'),
    path('bookstore/adminindex.html',views.adminindex,name='adminindex'),
    path('bookstore/getbooks',views.getbooks,name='getbooks'),
    path('bookstore/showbook',views.showbook,name='showbook'),
    path('bookstore/singlebook.html',views.sbrdet,name='singlebook'),
    path('bookstore/mgmbooks',views.mgmbook,name='mgmbook'),
    path('bookstore/reserve',views.reserve,name='reserve'),
    path('bookstore/insertbook.html',views.insertform,name='insertform'),
    path('bookstore/insertbook',views.insertbook,name='insertbook'),
    path('bookstore/updatebook.html',views.updateform,name='updateform'),
    path('bookstore/updatedet',views.updatedetails,name='updatedet'),
    path('bookstore/delete',views.delete,name='delete')
]