document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    let isScrolling;
    let scrollTimeout;

    // Add click event listener to each navbar item
    navLinks.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Temporarily disable scroll event listener
            clearTimeout(scrollTimeout);
            isScrolling = true;

            // Remove active class from all items
            navLinks.forEach(function (link) {
                link.classList.remove('active');
            });

            // Add active class to the clicked item
            item.classList.add('active');

            // Smooth scroll to the target section
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const offsetPosition = targetElement.offsetTop - document.querySelector('.navbar').offsetHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Set a timeout to re-enable the scroll event listener
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1000); // Short delay to ensure scrolling has completed
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', () => {
        if (isScrolling) return; // Ignore scroll events while scrolling

        let current = '';
        let minDistance = Number.MAX_VALUE;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const distance = Math.abs(window.scrollY + window.innerHeight / 3 - (sectionTop + sectionHeight / 3));
            if (distance < minDistance) {
                minDistance = distance;
                current = section.getAttribute('id');
            }
        }

        navLinks.forEach(link => {
            const wasActive = link.classList.contains('active');
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                if (!wasActive) {
                    // console.log(`Highlighting: ${link.textContent}`);
                }
            }
        });
    });

    // Initial check to set the active link on page load
    const initialScroll = new Event('scroll');
    window.dispatchEvent(initialScroll);
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