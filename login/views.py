from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
import json
from .models import User
# Create your views here.

def index(request):
    return render(request,'index.html',{'name':'harsha'})
def login(request):
    return render(request,'html/login.html')
def usersignup(request):
    return render(request,'html/usersignup.html')
def adminsignup(request):
    return render(request,'html/adminsignup.html')

def usersubmit(request):
    em=request.POST.get('email')
    n=request.POST.get('name')
    pd=request.POST.get('pwd')
    u =User(email = em, name=n, password=pd,isadmin=False)
    u.save()
    return render(request,'html/usersignup.html')

def adminsubmit(request):
    em=request.POST.get('email')
    n=request.POST.get('name')
    pd=request.POST.get('pwd')
    offid=request.POST.get('offid')
    u=User(email=em,name=n,password=pd,isadmin=True,offid=offid)
    u.save()
    return render(request,'html/adminsignup.html')
def userindex(request):
    return render(request,'html/userindex.html',{'success':'True'})

def submitlogin(request):
    adminsuccess=False
    usersuccess=False
    email=request.POST.get('email')
    pwd=request.POST.get('pwd')
    isadmin=request.POST.get('isadmin')
    if(isadmin=='false'):
        isadmin=False
    else:
        isadmin=True
    o1=User.objects.filter(email__iexact=email,password__iexact=pwd)[:1]
    if(len(o1)==0):
        res={}
        res['adminsuccess']=adminsuccess
        res['usersuccess']=usersuccess
        return JsonResponse({'Result':res})
    o=o1[0]
    print(email,pwd,isadmin)
    print(o.email,o.password,o.isadmin)
    if(isadmin):
        if((email==o.email)and(pwd==o.password)and(o.isadmin==True)):
            adminsuccess=True
    else:
        if((email==o.email)and(pwd==o.password)and(o.isadmin==False)):
            usersuccess=True
    res={}
    res['adminsuccess']=adminsuccess
    res['usersuccess']=usersuccess
    return JsonResponse({'Result':res})

def getusers(request):
    em=request.GET.get('email')
    q=User.objects.exclude(email=em)
    ul=[]
    for i in q:
        d={}
        d['email']=i.email
        d['name']=i.name
        d['isadmin']=bool(i.isadmin)
        ul.append(d)
    data={}
    data['users']=ul
    data['email']=em
    return render(request,'html/mgmusers.html',data)

def delusers(request):
    d=request.POST.getlist('dellist[]')
    d=list(map(str,d))
    print(d)
    for i in d:
        print(i)
        User.objects.get(email=i).delete()
    return render(request,'html/mgmusers.html',{'Result':True})

def makeadmin(request):
    d=request.POST.getlist('userlist[]')
    d=list(map(str,d))
    for i in d:
        ul=User.objects.filter(email=i)
        u=ul[0]
        u.isadmin=True
        u.save()
    return render(request,'html/mgmusers.html',{'Result':True})

def search(request):
    email=request.GET.get('email')
    em=request.GET.get('em')
    q=User.objects.filter(email=em)
    ul=[]
    for i in q:
        d={}
        d['email']=i.email
        d['name']=i.name
        d['isadmin']=bool(i.isadmin)
        ul.append(d)
    data={}
    data['users']=ul
    data['email']=em
    return render(request,'html/mgmusers.html',data)

def dashboard(request):
    email=request.GET.get('email')
    q=User.objects.get(email=email)
   
    d={}
    d['email']=q.email
    d['name']=q.name
    d['password']=q.password
    d['isadmin']=bool(q.isadmin)
    d['offid']=q.offid
    data={'user':d}
    return render(request,'html/dashboard.html',data)

def saveuser(request):
    email=request.GET.get('email')
    name=request.GET.get('name')
    pwd=request.GET.get('password')
    print(email)
    q=User.objects.get(email=email)
    q.name=name
    q.password=pwd
    q.save()

    d={}
    d['email']=q.email
    d['name']=q.name
    d['password']=q.password
    d['isadmin']=bool(q.isadmin)
    d['offid']=q.offid
    data={'user':d}
    return render(request,'html/dashboard.html',data)