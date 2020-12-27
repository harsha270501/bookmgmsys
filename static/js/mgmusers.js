const del=[]

function adddel(id) {
    if(document.getElementById(id).checked){
    del.push(id);}
}

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
  
function deleteusers() {
    email=document.getElementById('emid').innerHTML;
    const csrftoken = getCookie('csrftoken');
    val={
        'dellist':del,
        'email':email,
        csrfmiddlewaretoken:csrftoken
    };

    $.post('delusers',val,function(data,result) { 
        s=result.toString().localeCompare('success');
        if(s==0)
        {    
            window.location.reload(); 
        }
    });
}

function adminusers() {
    email=document.getElementById('emid').innerHTML;
    const csrftoken = getCookie('csrftoken');
    val={
        'userlist':del,
        'email':email,
        csrfmiddlewaretoken:csrftoken
    };

    $.post('makeadmin',val,function(data,result) {   
        s=result.toString().localeCompare('success');
        if(s==0)
        {
                window.location.reload(); 
        }      
    });
}

function dispusers() {
    email=document.getElementById('emid').innerHTML;
    em=document.getElementById('search-box').value;
            
    query="?email="+email+"&em="+em;
    window.location="../login/dispuser"+query;

}

function admindashboard() {
    email=document.getElementById('emid').innerHTML;
    query="?email="+email;
    window.location="../login/dashboard"+query;
}

function savechanges() {
    em=document.getElementById('email').innerHTML;
    console.log(em);
    n=document.getElementById('name').value;
    p=document.getElementById('password').value;
    query="?email="+em+"&name="+n+"&password="+p;
    window.location="../login/saveuser"+query;
}