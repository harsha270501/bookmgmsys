function login(button_id) {
    console.log(button_id.toString())
    if(button_id.toString().localeCompare('user-login')==0)
    {
        
        email=document.getElementById('user-email').value;
        password=document.getElementById('user-pwd').value;
        isadmin=false;
    }
    else
    {
        email=document.getElementById('admin-email').value;
        password=document.getElementById('admin-pwd').value;
        isadmin=true;
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
      console.log(isadmin);
      console.log(email);
      console.log(password);
      const csrftoken = getCookie('csrftoken');
    data={
        'email':email,
        'pwd':password,
        'isadmin':isadmin,
        csrfmiddlewaretoken: csrftoken
    };
    $.post('submitlogin',data,function(data,status){
        text="success";
        console.log('submitted login');
        status=data['Result'];
        usersuccess=status["usersuccess"];
        adminsuccess=status["adminsuccess"];
        console.log(adminsuccess);
        console.log(usersuccess);
        if(isadmin==true)
        {
            if(adminsuccess==true)
            window.location="../bookstore/adminindex.html?email="+email;
            else
            text="Login Unsuccessful.Permission unauthorized!!!";

            app = new Vue({
                el: "admin-status",
                delimiters: ['[[', ']]'],
                data: {
                  value: text,
                },
                template:'<p>[[value]]</p>'
              });
        }
        else
        {
            if(usersuccess==true)
            {
                window.location="../bookstore/userindex.html?email="+email;
                console.log("success");
            }
            else
            text="Login Unsuccessful.Permission unauthorized!!!";

            app = new Vue({
                el: "user-status",
                delimiters: ['[[', ']]'],
                data: {
                  value: text,
                },
                template:'<p>[[value]]</p>'
              });
        }
    });
}