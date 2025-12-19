// EmailJS Integration for Contact Form
(function() {
    // Initialize EmailJS with your public key
    emailjs.init('21JQw33lX39HDqmSE');

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Get the form element
        const form = document.querySelector('form[name="contactUS"]');
        
        if (form) {
            // Remove the netlify attribute since we're using EmailJS
            form.removeAttribute('netlify');
            
            // Add submit event listener
            form.addEventListener('submit', function(e) {
                // Prevent form from reloading the page
                e.preventDefault();
                e.stopPropagation();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Validate form
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return false;
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return false;
                }
                
                // Get submit button
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: 'ankitraj01567@gmail.com',
                    reply_to: email
                };
                
                // Send email using EmailJS
                emailjs.send('service_3izvpyl', 'template_37ubl2i', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        submitBtn.textContent = 'Sent Successfully! ✓';
                        submitBtn.style.backgroundColor = '#10b981';
                        
                        // Reset form
                        form.reset();
                        
                        // Reset button after 3 seconds
                        setTimeout(function() {
                            submitBtn.disabled = false;
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = '';
                        }, 3000);
                        
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        alert('Failed to send message. Please try again or contact directly at ankitraj01567@gmail.com');
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    });
                
                return false;
            });
        }
    });
})();

// Latest Works button scroll functionality
document.querySelector('#latest-works-btn').addEventListener('click', function () {
    document.querySelector('#latest-works').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});