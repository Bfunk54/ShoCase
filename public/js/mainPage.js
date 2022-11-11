// Access the sidenav and add the javascript for it
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {inDuration: 450, outDuration: 350, draggable: true});
  });

