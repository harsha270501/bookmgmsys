const del=[]
const email='';
function adddel(id) {
    if(document.getElementById(id).checked){
    del.push(id);}

}
function insertscreen() {
    window.location="../bookstore/insertbook.html";
}
function deleteitems() {
    em=document.getElementById('emid').innerHTML;
    console.log(del);
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');
      d={'delist':del,'email':em,csrfmiddlewaretoken:csrftoken};
    $.post('delete',d,function(data,result) {
        s=result.toString().localeCompare('success');
        if(s==0)
        {
            window.location.reload();
        }
    });
}

function getrecords() {
    dat={}
    $.get('getbooks',dat,function(data,status){
        bookrec=data["Result"]["books"];
        console.log(bookrec);
        displaybooks(bookrec);
    });
}

function displaybooks(br) {
    app = new Vue({
        el: "#book-table",
        delimiters: ['[[', ']]'],
        data: {
          value: br,
        }
      });
}

function showdet(filter,filtype) {
    console.log(filter,filtype);
     filters={
         'filter':filter,
         'filtype':filtype
     };

     $.get('showbook',filters,function(data,result) {
         len=data["Result"]["length"];
         console.log(len);
         if(len==0)
         {
            app = new Vue({
                el: "result-status",
                delimiters: ['[[', ']]'],
                data: {
                  value: "No results found",
                },
                template:'<p>[[value]]</p>'
              });
         }
         else if(len==1){
             console.log(len)
            updateform(data["Result"]["book"]);
         }
         else{

         }
     });
    
}

function optsel() {
    filtype=0;
    if(document.getElementById('title').checked)
        filtype=1;
    
    else if(document.getElementById('author').checked)
        filtype=2;
    
    else if(document.getElementById('isbn').checked)
        filtype=3;
    filter=document.getElementById('search-box').value;
    showdet(filter,filtype);
}

function updateform(bookdata) {
    em=document.getElementById('emid').innerHTML;
    br=bookdata[0];
    console.log(br);
    querystring="?title="+br.title+"&author="+br.author+"&genre="+br.genre+"&price="+br.price+"&isbn="+br.isbn+"&ecopy="+br.ecopy+"&coverpic="+br.coverpic+"&isavail="+br.isavail+"&lended_by="+br.lended_by+"&ldate="+br.ldate+"&reserved_by="+br.reserved_by+"&rdate="+br.rdate+"&email="+em;
    window.location="../bookstore/updatebook.html"+querystring;  
}

function tableclick(obj) {
    console.log(obj);
    filter=obj.innerHTML;
    filtype=1;
    showdet(filter,filtype);
}

function updatedet() {
    console.log("Going to update");
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');
    ldate=document.getElementById('ldate').value;
    console.log(ldate);
    if(ldate=='')
    ldate=null;
    rdate=document.getElementById('rdate').value;
    console.log(rdate);
    if(rdate=='')
    rdate=null;
    val={
        'title':document.getElementById('title').value,
        'author':document.getElementById('author').value,
        'isbn':document.getElementById('isbn').value,
        'genre':document.getElementById('genre').value,
        'price':document.getElementById('price').value,
        'ecopy':document.getElementById('ecopy').value,
        'coverpic':document.getElementById('coverpic').value,
        'isavail':document.getElementById('isavail').value,
        'lended_by':document.getElementById('lended-by').value,
        'ldate':ldate,
        'reserved_by':document.getElementById('reserved-by').value,
        'rdate':rdate,
        csrfmiddlewaretoken:csrftoken
    };
    $.post('updatedet',val,function(data,result) {
        s=result.toString().localeCompare('success');
        console.log(s);
        if(s==0)
        {
            window.location.reload();
        }
        else
        alert("Updation failed");
    });
}

function insertbook() {
    console.log("Going to update");
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');
      val={
        'title':document.getElementById('title').value,
        'author':document.getElementById('author').value,
        'isbn':document.getElementById('isbn').value,
        'genre':document.getElementById('genre').value,
        'price':document.getElementById('price').value,
        'ecopy':document.getElementById('ecopy').value,
        'coverpic':document.getElementById('coverpic').value,
        csrfmiddlewaretoken:csrftoken
    };

    $.post('insertbook',val,function(data,result) {
        s=result.toString().localeCompare('success');
        console.log(s);
        if(s==0)
        {
            window.location.reload();
        }
        else
        alert("Insertion failed");
    });
}