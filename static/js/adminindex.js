function gotobooks() {
    em=document.getElementById('emid').innerHTML;
    window.location="../bookstore/mgmbooks?email="+em;
}

function gotousers() {
    em=document.getElementById('emid').innerHTML;
    console.log(em);
    window.location="../login/mgmusers?email="+em;
}