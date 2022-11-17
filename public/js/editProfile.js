const avatarContainer = document.getElementById("avatar-container");
const avatarRow1 = document.querySelector(".avatar-row-1");
const avatarRow2 = document.querySelector(".avatar-row-2");




let avatar1 = document.createElement("img");
avatar1.setAttribute("src", "./images/avatar1.png");
avatar1.setAttribute("data", "1");
avatar1.classList.add("profile-avatar");
let avatar2 = document.createElement("img");
avatar2.setAttribute("src", "./images/avatar2.png");
avatar2.setAttribute("data", "2");
avatar2.classList.add("profile-avatar");
let avatar3 = document.createElement("img");
avatar3.setAttribute("src", "./images/avatar3.png");
avatar3.setAttribute("data", "3");
avatar3.classList.add("profile-avatar");
let avatar4 = document.createElement("img");
avatar4.setAttribute("src", "./images/avatar4.png");
avatar4.setAttribute("data", "4");
avatar4.classList.add("profile-avatar");
let avatar5 = document.createElement("img");
avatar5.setAttribute("src", "./images/avatar5.png");
avatar5.setAttribute("data", "5");
avatar5.classList.add("profile-avatar");
let avatar6 = document.createElement("img");
avatar6.setAttribute("src", "./images/avatar6.png");
avatar6.setAttribute("data", "6");
avatar6.classList.add("profile-avatar");
let avatar7 = document.createElement("img");
avatar7.setAttribute("src", "./images/avatar7.png");
avatar7.setAttribute("data", "7");
avatar7.classList.add("profile-avatar");
let avatar8 = document.createElement("img");
avatar8.setAttribute("src", "./images/avatar8.png");
avatar8.setAttribute("data", "8");
avatar8.classList.add("profile-avatar");

const avatarArray1 = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
];


const avatarArray2 = [
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];



const handleAvatarSelection = () => {
  avatarArray1.forEach((avatar) => {
    avatarRow1.appendChild(avatar);
  });
  avatarArray2.forEach((avatar) => {
    avatarRow2.appendChild(avatar);
  });
};

avatarButton = document.getElementById("choose-avatar");
avatarButton.addEventListener("click", handleAvatarSelection);
