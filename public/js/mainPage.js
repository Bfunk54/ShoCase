document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

const navButton = document.querySelector('.sidenav-trigger');


// navButton.addEventListener('click', function() {
//   if (instance.open()) {
//     instance.close();
//   } else {
//     instance.open();
//   }
//   });

// instance.close();