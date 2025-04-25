var bookMark = document.getElementById("bookmarks");
var sidebar = document.getElementById("sidebar");
document
  .getElementById("closeSideBar")
  .addEventListener("click", function closeSideBar(e) {
    e.preventDefault();
    bookMark.classList.add("collapsed");
    sidebar.classList.add("opened");
  });

document
  .getElementById("openSideBar")
  .addEventListener("click", function openSideBar(e) {
    e.preventDefault();
    bookMark.classList.remove("collapsed");
    sidebar.classList.remove("opened");
  });
