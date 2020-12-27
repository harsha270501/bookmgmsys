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
            displaysbr(data["Result"]["book"]);
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

function displaysbr(bookdata) {
    console.log(bookdata);
    console.log(window.location);
    em=document.getElementById('emid').innerHTML;
    br=bookdata[0];
    console.log(br);
    querystring="?title="+br.title+"&author="+br.author+"&genre="+br.genre+"&price="+br.price+"&isbn="+br.isbn+"&ecopy="+br.ecopy+"&coverpic="+br.coverpic+"&isavail="+br.isavail+"&lended_by="+br.lended_by+"&reserved_by="+br.reserved_by+"&email="+em;
    window.location="../bookstore/singlebook.html"+querystring;  
}

function tableclick(obj) {
    console.log(obj);
    filter=obj.innerHTML;
    filtype=1;
    showdet(filter,filtype);
}

function bookreserve() {
    em=document.getElementById('emid').innerHTML;
    isbn=document.getElementById('isbn').innerHTML;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.write(today);
    val={
        'email':em,
        'isbn':isbn,
        'rdate':today
    };
    $.get('reserve',val,function(data,result) {
        c=result.toString().localeComapre("success");
        if(c==0)
        {
            document.getElementById('reserved-by').innerHTML="Reserved by:"+em;
        }
        else{
            text="Cannot be reserved. Due to technical issues";
            app = new Vue({
                el: "err-status",
                delimiters: ['[[', ']]'],
                data: {
                  value: text,
                },
                template:'<p>[[value]]</p>'
              });
        }
    });
}