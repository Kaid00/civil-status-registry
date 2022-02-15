// elements 
const print = document.getElementById('print');
const birthPage = document.getElementById('birth');

// delegation
if (birthPage) {
    print.addEventListener('click', () => {
        window.open(
            'http://localhost:3000/birth-pdf',
            '_blank' // <- This is what makes it open in a new window.
          );
    })
} else {
    print.addEventListener('click', () => {
        window.open(
            'http://localhost:3000/marriage-pdf',
            '_blank' // <- This is what makes it open in a new window.
          );
    })
}