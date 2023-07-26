    // JavaScript code to handle navigation item highlighting
    document.addEventListener('DOMContentLoaded', function() {
        var navbarItems = document.querySelectorAll('.navbar a');
        
        // Add click event listener to each navbar item
        navbarItems.forEach(function(item) {
          item.addEventListener('click', function() {
            // Remove active class from all items
            navbarItems.forEach(function(item) {
              item.classList.remove('active');
            });
            
            // Add active class to the clicked item
            item.classList.add('active');
          });
        });
      });
  
      function copyEmail() {
        const emailElement = document.getElementById('email');
        const emailText = emailElement.innerText;
        
        // Create a temporary textarea element to copy the text
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = emailText;
        document.body.appendChild(tempTextarea);
        
        // Select the text in the textarea and copy it to clipboard
        tempTextarea.select();
        document.execCommand('copy');
        
        // Remove the temporary textarea
        document.body.removeChild(tempTextarea);
        
        // Show a tooltip or message indicating the email has been copied (optional)
        alert('Email copied to clipboard: ' + emailText);
      }
  
      function getCurrentDateTime() {
        const currentDate = new Date();
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        };
        return currentDate.toLocaleString('en-US', options);
      }
  
      // Update the last updated time
      function updateLastUpdatedTime() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
          lastUpdatedElement.textContent = 'Last updated: ' + getCurrentDateTime();
        }
      }
  
      // Call the function when the page loads
      document.addEventListener('DOMContentLoaded', updateLastUpdatedTime);