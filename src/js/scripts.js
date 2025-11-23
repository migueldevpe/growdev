const home = document.querySelector(".home");
const transactions = document.querySelector(".transactions");
// const navLink = document.querySelector(".nav-link");

// window.location.pathname === "/home.html" ? home.classList.add("active") : home.classList.remove("active")

// window.location.pathname === "/transactions.html" ? transactions.classList.add("active") : transactions.classList.remove("active")

if (window.location.pathname === "/transactions.html") {
  transactions.classList.add("active");
  console.log("foi")
} else if (window.location.pathname === "/home.html") {
  home.classList.add("active")
}

document.getElementById("logOut").addEventListener("click", function(e) {
  e.preventDefault();

  localStorage.removeItem("session");
  sessionStorage.removeItem("logged");

  window.location.href = "index.html"
})