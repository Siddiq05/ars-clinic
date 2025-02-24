document.addEventListener("DOMContentLoaded", function () {
  fetch("ArsData.json")
    .then((response) => response.json())
    .then((data) => {
      // Handle data and elements
      document.getElementById("logo").src = data.header.logo;
      const navList = document.getElementById("navList");

      data.header.navList.forEach((item) => {
        const li = document.createElement("li");
        if (item.subMenu) {
          li.innerHTML = `<a href="#" class="ServiceDropDown">${item.name} <i class="fa-solid fa-caret-down"></i></a>`;
          const subMenu = document.createElement("ul");
          subMenu.classList.add("ServicesList");
          item.subMenu.forEach((subItem) => {
            const subLi = document.createElement("li");
            subLi.innerHTML = `<a href="${subItem.link}">${subItem.name}</a>`; // Use the link from JSON
            subMenu.appendChild(subLi);
          });
          li.appendChild(subMenu);
        } else if (item.button) {
          li.innerHTML = `<button class="appointBtn">${item.name}</button>`;
        } else {
          li.innerHTML = `<a href="${item.link}" rel="noopener noreferrer">${item.name}</a>`;
        }
        navList.appendChild(li);
      });

      // Menu Toggle Logic
      // let navList = document.querySelector(".navList");
      let openMenu = document.getElementById("openMenu");
      let closeMenu = document.getElementById("closeMenu");

      const toogleMenu = (isOpen) => {
        navList.classList.toggle("open", isOpen);
        openMenu.style.display = isOpen ? "none" : "block";
        closeMenu.style.display = isOpen ? "block" : "none";
      };

      openMenu.addEventListener("click", () => toogleMenu(true));
      closeMenu.addEventListener("click", () => toogleMenu(false));

      // Ensure ServiceDropDown exists after it's rendered
      const ServiceDropDown = document.querySelector(".ServiceDropDown");
      if (ServiceDropDown) {
        const ServicesList = document.querySelector(".ServicesList");
        const caretDown = document.querySelector(".fa-caret-down");

        // Toggle dropdown when the ServiceDropDown is clicked
        ServiceDropDown.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent the click event from bubbling up to the window
          if (ServicesList) {
            ServicesList.classList.toggle("toogleService");
          }
          if (caretDown) {
            caretDown.classList.toggle("rotate");
          }
          console.log("Dropdown clicked!");
        });

        // Close dropdown if you click anywhere outside the ServiceDropDown
        window.addEventListener("click", () => {
          if (
            ServicesList &&
            ServicesList.classList.contains("toogleService")
          ) {
            ServicesList.classList.remove("toogleService");
          }
          if (caretDown && caretDown.classList.contains("rotate")) {
            caretDown.classList.remove("rotate");
          }
        });
      } else {
        console.error("ServiceDropDown element not found!");
      }

      // Generate Form Fields
      const formContainer = document.getElementById("formContainer");

      let formHTML = `<h2>Contact Us</h2><form id="contactForm">`;
      for (const key in data.formFields) {
        const field = data.formFields[key];
        formHTML += `
        <div class="form-group">
          <label for="${key}">${field.label}</label>
          ${
            field.type === "textarea"
              ? `<textarea id="${key}" placeholder="${field.placeholder}"></textarea>`
              : `<input type="${field.type}" id="${key}" placeholder="${field.placeholder}" />`
          }
          <span class="error" id="${key}Error"></span>
        </div>`;
      }
      formHTML += `
      <button type="submit" class="formButton">Submit</button>
      <p class="success-message" id="successMessage">Form submitted successfully! ✅</p>
    </form>`;
      formContainer.innerHTML = formHTML;

      // Form Validation & Submission
      document
        .getElementById("contactForm")
        .addEventListener("submit", async function (event) {
          event.preventDefault();
          let isValid = true;
          const successMessage = document.getElementById("successMessage");

          for (const key in data.formFields) {
            const field = data.formFields[key];
            const inputElement = document.getElementById(key);
            const errorElement = document.getElementById(`${key}Error`);
            const value = inputElement.value.trim();

            if (
              (key === "name" && value.length < 3) ||
              (key === "phone" && !/^[0-9]{10}$/.test(value)) ||
              (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
              (key === "message" && value === "")
            ) {
              errorElement.textContent = field.errorMessage;
              isValid = false;
            } else {
              errorElement.textContent = "";
            }
          }

          if (isValid) {
            const formData = {
              name: document.getElementById("name").value.trim(),
              phone: document.getElementById("phone").value.trim(),
              email: document.getElementById("email").value.trim(),
              message: document.getElementById("message").value.trim(),
            };

            try {
              await fetch(
                "https://script.google.com/macros/s/AKfycbzDTwn7FKmAykRwxnaq9bfZMPTylTIssiINNAFgeNdERvEgRVYuW_4ysi0nNLgFrM-5/exec",
                {
                  method: "POST",
                  mode: "no-cors",
                  body: JSON.stringify(formData),
                  headers: { "Content-Type": "application/json" },
                }
              );

              successMessage.style.display = "block";
              successMessage.textContent = "Submitted Successfully!";
              setTimeout(() => (successMessage.style.display = "none"), 2000);
              document.getElementById("contactForm").reset();
            } catch (error) {
              console.error("Form submission error:", error);
            }
          }
        });
      const footer = document.getElementById("footer");

      let footerHTML = `
      <div class="footerDesc">
        <h1>${data.footerDesc.title}</h1>
        <p>${data.footerDesc.subtitle}</p>
      </div>
      <div class="footerCon">
        <div class="Fimg">
          <img src="${data.footerImage.src}" alt="${data.footerImage.alt}" />
          <a href="${data.footerImage.link}" class="appointBtn1">
            ${data.footerImage.buttonText}
          </a>
        </div>
        <div class="Fcontact">`;

      // Loop through contact info
      data.contactInfo.forEach((item) => {
        if (item.type === "timing") {
          footerHTML += `
          <div>
            <i class="${item.icon}" style="${item.color}"></i>
            <p>${item.text}</p>
          </div>`;
        } else {
          footerHTML += `
          <div>
            <a href="${item.link}">
              <i class="${item.icon}" style="${item.color}"></i>
              <p>${item.text}</p>
            </a>
          </div>`;
        }
      });

      // Add social media links
      footerHTML += `<div class="social-icons">`;
      data.socialMedia.forEach((social) => {
        footerHTML += `
        <a href="${social.link}">
          <i class="${social.icon}" style="${social.color}"></i>
        </a>`;
      });
      footerHTML += `</div>`;

      footerHTML += `
        </div>
      </div>

      <div class="locations">
        <div class="locDesc">
          <h1>Now Serving You at Multiple Locations!</h1>
        </div>
        <div class="locs">`;

      // Loop through locations
      data.locations.forEach((location) => {
        footerHTML += `
        <div>
          <a href="${location.link}" target="_blank">
            <i class="fa-solid fa-location-dot"></i>
            <p>${location.text}</p>
          </a>
        </div>`;
      });

      footerHTML += `
      </div>
    </div>`;

      // **NEW Experts Section Above Copyright**
      footerHTML += `
    <div class="Experts">
      <h1>${data.expertsSection.title}</h1>
      <a href="${data.footerImage.link}" class="appointBtn2">
            ${data.footerImage.buttonText}
      </a>
      <a href="${data.expertsSection.link}">
        <i class="fa-solid fa-location-dot" style="color: ${data.expertsSection.color};"></i>
        <p>${data.expertsSection.location}</p>
      </a>
      
    </div>`;

      // Copyright
      footerHTML += `<p class="copyRight">${data.copyright}</p>`;

      footer.innerHTML = footerHTML;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
