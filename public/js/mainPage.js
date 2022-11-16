// Access the sidenav and add the javascript for it
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {
    inDuration: 450,
    outDuration: 350,
    draggable: true,
  });
});

var elem = document.querySelector(".tabs");
var instance = M.Tabs.init(elem, {});

async function getAnimeName() {
  const response = await fetch(jikanUrl);
  const data = await response.json();
  const newAnime = data;
  const firstAnimeName = data;
}

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});



function cardsOnResize() {
   
        if (window.innerWidth <= 645) {
          var mainCards = document.querySelectorAll(".mainPageCards");
          mainCards.forEach((btn) => {
          console.log(window.innerWidth);
          btn.classList.add("row");
          btn.classList.remove("col");
          });
        } else { 
          var mainCards = document.querySelectorAll(".mainPageCards");
          mainCards.forEach((btn) => {
          btn.classList.remove("row");
        btn.classList.add("col");
        });
      }
    };
  

  window.addEventListener('resize', function() {
    console.log('addEventListener - resize');
    cardsOnResize();
}, true);


  

// const button = document.querySelector('.btn1')

// button.addEventListener('click', () => {
//     button.classList.toggle('liked')
// })

// document.addEventListener('click',(e) => {

//     if(e.target.classList.contains('btn1')){

//      e.target.classList.toggle('liked');
//     }
//   })
