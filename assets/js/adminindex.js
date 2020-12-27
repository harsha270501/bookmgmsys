function gotobooks() {
    em=document.getElementById('emid').innerHTML;
    window.location="../bookstore/mgmbooks?email="+em;
}

function gotouserss() {
    em=document.getElementById('emid').innerHTML;
    window.location="../bookstore/mgmusers?email="+em;
}