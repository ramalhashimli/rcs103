import { getData } from "./api/api.js";
import { createCard } from "./helpers/functions.js";

const basketContainer = document.querySelector(".basketContainer");
let basketArr = JSON.parse(localStorage.getItem("basket")) || [];
let resultBasketArr = [];

getData().then((data) => {
  JSON.parse(localStorage.getItem("basket")).forEach((item) => {
    resultBasketArr.push({
      ...data.find((elem) => elem.id === item.id),
      count: item.count,
    });
  });

  resultBasketArr.forEach((elem) => {
    basketContainer.innerHTML += `
    <div class="basketItem">
<h3>${elem.title.substring(0, 10)} - ${elem.price}</h3>
<button>+</button>
<span>${elem.count}</span>
<button>-</button>
</div> 
    `;
  });
});
