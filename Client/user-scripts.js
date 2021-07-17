function userSignUp() {
  //   console.log("userSignUp function called.");
  let userEmail = document.querySelector("#emailSignup").value;
  let userPass = document.querySelector("#pwdSignup").value;
  let newUser = {
    user: {
      email: userEmail,
      password: userPass
    }
  };
  console.log(`newUserData---> ${newUser.user.email} ${newUser.user.password}`);
  fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data");
      let token = data.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker;
    })
    .catch((err) => {
      console.error(err);
    });
};


function userLogin() {
  console.log("userLogin function called.");
}
function userLogout() {
  console.log("userLogout function called.");
}
function tokenChecker() {
  console.log("tokenChecker function called.");
}
tokenChecker();
