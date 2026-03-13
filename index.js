// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})
// --- Contact Form Submission Logic ---
const form = document.getElementById("my-form");
const status = document.getElementById("form-status");
const btn = document.getElementById("submit-btn");

if (form) { // Check if form exists on the current page
  async function handleSubmit(event) {
    event.preventDefault();
    
    btn.innerText = "Sending...";
    btn.disabled = true;

    const data = new FormData(event.target);

    fetch("https://formspree.io/f/xnjgzaoa", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Success state
        status.innerHTML = "Message Recorded! I'll get back to you soon.";
        status.style.color = "#28a745"; 
        status.style.display = "block";
        form.reset(); 
      } else {
        // Error state from server
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form.";
          }
          status.style.color = "#ff0000"; 
          status.style.display = "block";
        });
      }
    }).catch(error => {
      // Network error
      status.innerHTML = "Oops! Check your internet connection and try again.";
      status.style.color = "#ff0000";
      status.style.display = "block";
    }).finally(() => {
      // Restore button text
      btn.innerText = "Submit";
      btn.disabled = false;
    });
  }

  form.addEventListener("submit", handleSubmit);
}
