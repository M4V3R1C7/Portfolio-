const menu = document.querySelector('.menu-btn');
const links = document.querySelector('.links');

menu.addEventListener('click', () => links.classList.toggle('open'));

document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', () => links.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();
