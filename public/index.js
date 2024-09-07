window.onload = init;

function init() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  if (burger) {
    burger.addEventListener('click', () => {
      if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
      }
      else {
        menu.classList.add('hidden');
      }
    })
  }
}
