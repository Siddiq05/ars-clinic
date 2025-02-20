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
      const form = document.getElementById("dynamicForm");
      let formHTML = "";

      for (const key in data.formFields) {
        const field = data.formFields[key];
        formHTML += `
          <div class="input-group">
            <label for="${key}">${field.label}</label>
            <input type="${
              key === "email" ? "email" : key === "phoneNumber" ? "tel" : "text"
            }" 
                   id="${key}" 
                   placeholder="${field.placeholder}" />
            <span class="${key}-error"></span>
          </div>`;
      }

      formHTML += `
        <button type="submit" id="submitForm">
          Submit <i class="fa-solid fa-paper-plane fa-beat"></i>
        </button>
        <span class="submit-error"></span>`;

      form.innerHTML = formHTML;
      attachValidation(data.formFields);
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
            <i class="${item.icon}"></i>
            <p>${item.text}</p>
          </div>`;
        } else {
          footerHTML += `
          <div>
            <a href="${item.link}">
              <i class="${item.icon}"></i>
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
          <i class="${social.icon}"></i>
        </a>`;
      });
      footerHTML += `</div>`;

      footerHTML += `
        </div>
      </div>

      <div class="locations">
        <div class="locDesc">
          <h2>Now Serving You at Multiple Locations!</h2>
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
      </div>

      <p class="copyRight">${data.copyright}</p>`;

      footer.innerHTML = footerHTML;
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function attachValidation(fields) {
  const errors = {
    fullName: document.querySelector(".fullName-error"),
    phoneNumber: document.querySelector(".phoneNumber-error"),
    email: document.querySelector(".email-error"),
    message: document.querySelector(".message-error"),
    submitError: document.querySelector(".submit-error"),
  };

  const inputs = {
    fullName: document.getElementById("fullName"),
    phoneNumber: document.getElementById("phoneNumber"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  };

  function setError(element, message) {
    element.innerHTML = message;
    element.style.color = "red";
  }

  function setSuccess(element) {
    element.innerHTML =
      '<i class="fa-solid fa-check" style="color: seagreen;"></i>';
  }

  function validateFullName() {
    let name = inputs.fullName.value.trim();
    if (!name.match(/^[A-Za-z]+\s[A-Za-z]+$/)) {
      setError(errors.fullName, fields.fullName.errorMessage);
      return false;
    }
    setSuccess(errors.fullName);
    return true;
  }

  function validatePhone() {
    let phone = inputs.phoneNumber.value.trim();
    if (!phone.match(/^[0-9]{10}$/)) {
      setError(errors.phoneNumber, fields.phoneNumber.errorMessage);
      return false;
    }
    setSuccess(errors.phoneNumber);
    return true;
  }

  function validateEmail() {
    let email = inputs.email.value.trim();
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError(errors.email, fields.email.errorMessage);
      return false;
    }
    setSuccess(errors.email);
    return true;
  }

  function validateMessage() {
    let message = inputs.message.value.trim();
    if (message.length < fields.message.minLength) {
      setError(errors.message, fields.message.errorMessage);
      return false;
    }
    setSuccess(errors.message);
    return true;
  }

  inputs.fullName.addEventListener("keyup", validateFullName);
  inputs.phoneNumber.addEventListener("keyup", validatePhone);
  inputs.email.addEventListener("keyup", validateEmail);
  inputs.message.addEventListener("keyup", validateMessage);

  document.getElementById("submitForm").addEventListener("click", function (e) {
    e.preventDefault();
    if (
      validateFullName() &&
      validatePhone() &&
      validateEmail() &&
      validateMessage()
    ) {
      errors.submitError.style.color = "seagreen";
      errors.submitError.innerHTML = "Submitting...";

      fetch(
        "https://script.google.com/macros/s/AKfycbzQ_mZ33cWaRrJJeGE5YjzDZuxDnzQ72y6BBy4-gco1McJsV0Y-iEXaRvPqlMp8ClFE/exec",
        {
          method: "POST",
          body: JSON.stringify({
            fullName: inputs.fullName.value,
            phoneNumber: inputs.phoneNumber.value,
            email: inputs.email.value,
            message: inputs.message.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
        }
      )
        .then((data) => {
          errors.submitError.innerHTML = "Form submitted successfully!";

          // Clear the form fields
          Object.values(inputs).forEach((input) => {
            input.value = "";
          });

          // Reset the success ticks
          Object.values(errors).forEach((error) => {
            error.innerHTML = ""; // Remove the success checkmarks and error messages
          });

          setTimeout(() => {
            errors.submitError.innerHTML = "";
          }, 2000);
        })
        .catch((error) => {
          errors.submitError.innerHTML = "Error submitting form!";
          console.error(error);
        });
    }
  });
}
