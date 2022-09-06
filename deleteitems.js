let element = document.getElementById("clearCart");
element.addEventListener("click", myFunction);

function myFunction() {
  localStorage.clear();
  location.reload();
}
