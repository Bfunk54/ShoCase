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

var mainCards = document.querySelectorAll(".mainPageCards");

window.onresize = function () {
  if (window.innerWidth <= 645) {
    mainCards.classList.add("row");
    mainCards.classList.remove("col");
  } else {
  }
};

// const button = document.querySelector('.btn1')

// button.addEventListener('click', () => {
//     button.classList.toggle('liked')
// })

// document.addEventListener('click',(e) => {

//     if(e.target.classList.contains('btn1')){

//      e.target.classList.toggle('liked');
//     }
//   })
