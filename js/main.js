console.log('Starting up');

function sendEmail() {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=Maryam1649@gmail.com&su=${$('#subject').val()}&body=${$('#message').val()}`);
}