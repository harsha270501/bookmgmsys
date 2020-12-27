from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.db.models import Max
from .models import Book
import json

# Create your views here.
def userindex(request):
    em=request.GET.get('email')
    return render(request,'html/userindex.html',{'email':em})

def adminindex(request):
    em=request.GET.get('email')
    return render(request,'html/adminindex.html',{'email':em})

def getbooks(request):
    queryset=Book.objects.all()
    print(queryset)
    booklist=[]
    for q in queryset:
        book={'title':q.title,
              'author':q.author,
              'isbn':q.isbn,
              'genre':q.genre}
        booklist.append(book)
    data={}
    data['books']=booklist
    print(data)
    return JsonResponse({'Result':data})

def showbook(request):
    print(request)
    filt=request.GET.get('filter')
    filtertype=int(request.GET.get('filtype'))
    errstatus=1
    res=None
    if(filtertype==1):
        res=Book.objects.filter(title__iexact=filt)
    elif(filtertype==2):
        res=Book.objects.filter(author__iexact=filt)
    elif(filtertype==3):
        res=Book.objects.filter(isbn=filt)
    bl=[]
    for i in res:
        b={
            'title':i.title,
            'author':i.author,
            'genre':i.genre,
            'isbn':i.isbn,
            'price':i.price,
            'ecopy':i.ecopy,
            'coverpic':i.coverpic,
            'isavail':i.isavail,
            'lended_by':i.lended_by,
            'ldate':i.ldate,
            'reserved_by':i.reserved_by,
            'rdate':i.rdate
        }
        print("Availability",i.isavail)
        bl.append(b)
    l=len(bl)
    if(l==0):
        errstatus=0
    
    data={
        'book':bl,
        'errstatus':errstatus,
        'length':l
    }
    return JsonResponse({'Result':data})

def sbrdet(request):
    data={'title':request.GET.get('title'),
          'author':request.GET.get('author'),
          'price':request.GET.get('price'),
          'genre':request.GET.get('genre'),
          'isbn':request.GET.get('isbn'),
          'ecopy':request.GET.get('ecopy'),
          'coverpic':request.GET.get('coverpic'),
          'isavail':request.GET.get('isavail'),
          'lended_by':request.GET.get('lended_by'),
          'reserved_by':request.GET.get('reserved_by')}
    print(request.GET.get('ecopy'))
    return render(request,'html/singlebook.html',data)

def mgmbook(request):
    queryset=Book.objects.all()
    print(queryset)
    booklist=[]
    for i in queryset:
        b={
            'id':i.id,
            'title':i.title,
            'author':i.author,
            'genre':i.genre,
            'isbn':i.isbn,
            'price':i.price,
            'ecopy':i.ecopy,
            'coverpic':i.coverpic,
            'isavail':i.isavail,
            'lended_by':i.lended_by,
            'reserved_by':i.reserved_by
        }
        booklist.append(b)
    data={}
    data['books']=booklist
    data['email']=request.GET.get('email')
    return render(request,'html/mgmbook.html',data)

def reserve(request):
    em=request.GET.get('email')
    isbn=request.GET.get('isbn')
    rdate=request.GET.get('rdate')
    o=Book.objects.get(isbn=isbn)
    o.reserved_by=em
    o.rdate=rdate
    o.save()
    return JsonResponse({'success':True})

def insertform(request):
    return render(request,'html/insertbook.html')

def insertbook(request):
    
    t=request.POST.get('title')
    a=request.POST.get('author')
    p=float(request.POST.get('price'))
    g=request.POST.get('genre')
    i=int(request.POST.get('isbn'))
    e=request.POST.get('ecopy')
    c=request.POST.get('coverpic')
    b=Book(title=t,author=a,price=p,genre=g,isbn=i,ecopy=e,coverpic=c)
    b.save()
    return render(request,'html/insertbook.html')

def updateform(request):
    data={'title':request.GET.get('title'),
          'author':request.GET.get('author'),
          'price':request.GET.get('price'),
          'genre':request.GET.get('genre'),
          'isbn':request.GET.get('isbn'),
          'ecopy':request.GET.get('ecopy'),
          'coverpic':request.GET.get('coverpic'),
          'isavail':request.GET.get('isavail'),
          'lended_by':request.GET.get('lended_by'),
          'ldate':request.GET.get('ldate'),
          'reserved_by':request.GET.get('reserved_by'),
          'rdate':request.GET.get('rdate')}
    return render(request,'html/updatebook.html',data)

def updatedetails(request):
    isbn=int(request.POST.get('isbn'))
    ol=Book.objects.filter(isbn=isbn)
    o=ol[0]
    
    t=request.POST.get('title')
    if(t!=None):
        o.title=t
    a=request.POST.get('author')
    if(a!=None):
        o.author=a
    p=request.POST.get('price')
    if((p!=None)and(p!='')):
        o.price=float(p)
    g=request.POST.get('genre')
    if(g!=None):
        o.genre=g
    i=request.POST.get('isbn')
    if((i!=None)and(i!='')):
        o.isbn=int(i)
    e=request.POST.get('ecopy')
    if(e!=None):
        o.ecopy=e
    c=request.POST.get('coverpic')
    if(c!=None):
        o.coverpic=c
    a=request.POST.get('isavail')
    if((a!=None)and(a!='')):
        if(a=='true'):
            o.isavail=True
        else:
            o.isavail=False
    l=request.POST.get('lended_by')
    if(l!=None):
        o.lended_by=l
    ld=request.POST.get('ldate')
    if((ld!=None) and (ld!='')):
        o.ldate=ld
    r=request.POST.get('reserved_by')
    if(r!=None):
        o.reserved_by=r
    rd=request.POST.get('rdate')
    if((rd!=None) and (rd!='')):
        o.rdate=rd
    o.save()
    print("request",request)
    return render(request,'html/updatebook.html',{'Result':True})

def delete(request):
    d=request.POST.getlist('delist[]')
    print("POST",d)
    d=list(map(int,d))
    print("Delete items",d)
    for i in d:
        Book.objects.filter(isbn=i).delete()
    queryset=Book.objects.all()
    print(queryset)
    booklist=[]
    for q in queryset:
        book={'id':q.id,'title':q.title,'author':q.author,'isbn':q.isbn,'genre':q.genre,'price':q.price,'ecopy':q.ecopy}
        booklist.append(book)
    data={}
    data['books']=booklist
    data['email']=request.POST.get('email')
    return render(request,'html/mgmbook.html',data)