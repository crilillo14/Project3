
document.getElementById('scrollButton').addEventListener('click', function(event) {
  event.preventDefault();
  document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
});

