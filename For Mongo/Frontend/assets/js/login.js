const loginForm = document.querySelector(".login");
const nameInp = document.querySelector(".nameInp");
const passInp = document.querySelector(".passInp");
const btn = document.querySelector(".btn");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(nameInp.value);
  console.log(passInp.value);
  let obj = {
    name: nameInp.value,
    password: passInp.value,
  };
  axios.post("http://localhost:3000/auth/login", obj).then((res) => {
    console.log(res);

    if (res.status == 200) {
      localStorage.setItem("isLogin", JSON.stringify(true));
      window.location.href = "index.html";
    } else {
      alert("login melumatlari yalnisdir");
    }
  });
});

btn.addEventListener("click", function () {
  window.location.href = "register.html";
});
