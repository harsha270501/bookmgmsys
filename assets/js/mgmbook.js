const del=[]
const email='';
function adddel(id) {
    if(document.getElementById(id).checked){
    del.push(id);}

}
function insertscreen() {
    
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