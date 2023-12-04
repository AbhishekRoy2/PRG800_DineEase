function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginData = {
    email: email,
    password: password,
  };
  console.log(loginData);
  fetch(`${api_path}auth/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      window.location.href = "/client/home.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

async function registerUser() {
  console.log("register User");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const registerData = {
    email,
    password,
    name,
  };
  console.log(registerData);
  fetch(`${api_path}auth/signup`, {
    method: "POST",
    body: JSON.stringify(registerData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log({ data });
      window.location.href = "/client/home.html";
    });
}
