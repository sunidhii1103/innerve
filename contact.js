document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Show the success message
    var successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden'); // Remove 'hidden' to display the success message

    // Optionally, reset the form fields
    document.getElementById('contactForm').reset();
});
