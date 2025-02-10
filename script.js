document.addEventListener("DOMContentLoaded", function () {
  fetch("ArsData.json")
    .then((response) => response.json())
    .then((data) => {
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
          li.innerHTML = `
            <a href="${item.link}" rel="noopener noreferrer">
              ${item.name}
            </a>
          `;
        } else {
          li.innerHTML = `<a href="${item.link}" rel="noopener noreferrer">${item.name}</a>`;
        }
        navList.appendChild(li);
      });

      // Menu Toggle Logic
      // let navList = document.querySelector(".navList");
      const openMenu = document.getElementById("openMenu");
      const closeMenu = document.getElementById("closeMenu");

      if (openMenu && closeMenu) {
        const toogleMenu = (isOpen) => {
          navList.classList.toggle("open", isOpen);
          openMenu.style.display = isOpen ? "none" : "block";
          closeMenu.style.display = isOpen ? "block" : "none";
        };

        openMenu.addEventListener("click", () => toogleMenu(true));
        closeMenu.addEventListener("click", () => toogleMenu(false));
      } else {
        console.error("Menu buttons not found!");
      }

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

      const imagesContainer = document.getElementById("imageSlider");
      const imgButtons = document.getElementById("imgButtons");
      const titleElement = document.querySelector(".imgContent h2");
      const subTitleElement = document.querySelector(".imgContent h1");
      const paraElement = document.querySelector(".imgContent p");

      let num = 0;
      let interval;

      // Add images dynamically
      imagesContainer.innerHTML = data.slider.images
        .map((image) => `<img src="${image.src}" alt="${image.alt}">`)
        .join("");

      // Add navigation buttons dynamically
      imgButtons.innerHTML = data.slider.buttons
        .map(
          (_, index) => `<span id="btn${index}" data-index="${index}"></span>`
        )
        .join("");

      const buttons = document.querySelectorAll(".imgBtns span");

      const updateContent = () => {
        titleElement.textContent = data.slider.content[num].title;
        subTitleElement.textContent = data.slider.content[num].subTitle;
        paraElement.textContent = data.slider.content[num].para;
      };

      const updateSlider = () => {
        imagesContainer.style.transform = `translateX(-${num * 100}%)`;
        imagesContainer.style.transition = "transform 1s ease-in-out";

        buttons.forEach((btn, index) => {
          btn.classList.toggle("active", index === num);
        });

        updateContent();
      };

      const startSlider = () => {
        clearInterval(interval);
        interval = setInterval(() => {
          num = (num + 1) % data.slider.images.length;
          updateSlider();
        }, 2500);
      };

      buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          num = parseInt(e.target.getAttribute("data-index"));
          updateSlider();
          startSlider();
        });
      });

      updateContent();
      updateSlider();
      startSlider();

      const experienceContainer = document.getElementById(
        "experienceContainer"
      );
      experienceContainer.innerHTML = data.experience
        .map(
          (exp) => `
            <div>
              <h1>${exp.count}</h1>
              <h3>${exp.title.replace("  ", "<br />")}</h3>
            </div>
          `
        )
        .join("");
      const contentContainer = document.getElementById("contentContainer");
      const content = data.content;

      contentContainer.innerHTML = `
          <div class="mainCon">
            <h1>"${content.title}"</h1>
            ${content.paragraphs.map((para) => `<p>${para}</p>`).join("")}
            <a href="${content.buttonLink}" rel="noopener noreferrer">
              <button class="readBtn">${content.buttonText}</button>
            </a>
          </div>
          <img src="${content.imageSrc}" alt="${content.imageAlt}" />
        `;

      const whyUsData = data.whyUs;
      const whyUsContainer = document.getElementById("whyUsContainer");

      whyUsContainer.innerHTML = `
        <div class="Whydescription">
          <h1>${whyUsData.title}</h1>
          ${whyUsData.description.map((desc) => `<p>${desc}</p>`).join("")}
        </div>
        <div class="WhyCon">
          <div class="WhyCon1">
            ${whyUsData.whyDetails
              .slice(0, 2)
              .map(
                (detail) => `
              <div class="whyDetails">
                <img src="${detail.icon}" alt="${detail.title}" />
                <h2>${detail.title}</h2>
                <p>${detail.description}</p>
              </div>
            `
              )
              .join("")}
          </div>

          <img src="${whyUsData.image}" alt="Why Us Image" class="WhyImg" />

          <div class="WhyCon1">
            ${whyUsData.whyDetails
              .slice(2)
              .map(
                (detail) => `
              <div class="whyDetails">
                <img src="${detail.icon}" alt="${detail.title}" />
                <h2>${detail.title}</h2>
                <p>${detail.description}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
      const leadershipData = data.leadership;
      const leadershipContainer = document.getElementById(
        "leadershipContainer"
      );

      leadershipContainer.innerHTML = `
        <div class="ConNav">
          <h1>${leadershipData.title}</h1>
          <p>${leadershipData.description}</p>
        </div>
        <div class="docProfile">
          ${leadershipData.leaders
            .map(
              (leader) => `
            <div class="doc">
              <img src="${leader.image}" alt="${leader.name}" />
              <div class="docData">
                <h2>${leader.name}</h2>
                <b>${leader.qualifications}</b>
                <p>${leader.bio}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;

      const feesContainer = document.getElementById("feesContainer");
      const feesData = data.fees;

      feesContainer.innerHTML = `
        <img src="${feesData.imageSrc}" alt="Fees Image" />
        <div class="feeCon">
          <h2>${feesData.title}</h2>
          <a href="${feesData.buttonLink}">
            <button class="feeBtn">${feesData.buttonText}</button>
          </a>
        </div>
      `;

      const serviceContainer = document.getElementById("serviceContainer");

      data.services.forEach((service) => {
        const serviceHTML = `
          <a href="${service.link}">
            <div class="faqs">
              <i class="fa-solid ${service.icon}"></i>
              <h2>${service.title}</h2>
              <p>${service.description}</p>
            </div>
          </a>
        `;
        serviceContainer.innerHTML += serviceHTML;
      });
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
            <a href="${data.footerImage.link}" class="appointBtn1" rel="noopener noreferrer">
        ${data.footerImage.buttonText}
      </a>
          </div>
          <div class="Fcontact">`;

      // Loop through contact info and generate links
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

      footerHTML += `
          </div>
        </div>
        <div class="location">
          <iframe src="${data.map.src}" width="${data.map.width}" height="${data.map.height}" 
                  style="border: 0" allowfullscreen loading="lazy"></iframe>
        </div>
        <p class="copyRight">${data.copyright}</p>`;

      footer.innerHTML = footerHTML;
    })
    .catch((error) => console.error("Error fetching data:", error));
});

const specialistImg = document.querySelector(".specialistImg");

const rightArrow = document.querySelector(".rightArrow");

const specialization = document.querySelector(".specialization");

const specialistBtns = document.querySelectorAll(".specialistBtns p");

const specialistContent = [
  { title: "Orthodontics", href: "/Orthodontics.html" },
  { title: "Root Canal", href: "/RootCanalTreatment.html" },
  { title: "Crowns", href: "/Crown.html" },
  { title: "Dental Fluorosis", href: "/DentalFluorosis.html" },
  { title: "Deep Bite", href: "/deepBite.html" },
  { title: "Early Childwood Caries", href: "/EarlyChildhoodCaries.html" },
  { title: "Dental Implants", href: "/DentalImplants.html" },
  { title: "Cosmetic Dentistry", href: "/CosmeticDentistry.html" },
  { title: "Dental Laminates", href: "/DentalLaminates.html" },
];

let sCount = 0;
let imgInterval;
const specialistImgSlider = () => {
  imgInterval = setInterval(() => {
    sCount++;
    if (sCount < 9) {
      specialistImg.style.transition = "transform 1s ease-in-out";
    } else {
      sCount = 0;
      specialistImg.style.transition = " transform 0s ease-in-out";
    }
    specialistImg.style.transform = `translateX(-${sCount * 100}%)`;
    specialistActiveButton();
    specialistupdateContent();
  }, 2500);
};

const specialistActiveButton = () => {
  specialistBtns.forEach((item, index) => {
    if (index === sCount) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};
const specialistupdateContent = () => {
  // Update the content in the .imgContent section
  specialization.textContent = specialistContent[sCount].title;
  rightArrow.setAttribute("href", specialistContent[sCount].href);
};

specialistBtns.forEach((item, index) => {
  item.addEventListener("click", () => {
    sCount = index; // Set the current image to the clicked button's index
    specialistImg.style.transition = "transform 1s ease-in-out";
    specialistImg.style.transform = `translateX(-${sCount * 100}%)`;
    specialistActiveButton();
    specialistupdateContent();
  });
});

specialistImgSlider();

const specialistImg1 = document.querySelectorAll(".specialistImg1");
const specialistBtns1 = document.querySelectorAll(".specialistBtns1 p");

const specialistContent1 = [
  [
    { title: "Orthodontics", href: "/Orthodontics.html" },
    { title: "Dental Fluorosis", href: "/DentalFluorosis.html" },
    { title: "Dental Implants", href: "/DentalImplants.html" },
  ],
  [
    { title: "Root Canal", href: "/RootCanalTreatment.html" },
    { title: "Deep Bite", href: "/deepBite.html" },
    { title: "Cosmetic Dentistry", href: "/CosmeticDentistry.html" },
  ],
  [
    { title: "Crowns", href: "/Crown.html" },
    { title: "Early Childhood Caries", href: "/EarlyChildhoodCaries.html" },
    { title: "Dental Laminates", href: "/DentalLaminates.html" },
  ],
];

// Function to update the content and apply transformations to the slider
const updateSliderContent = (item, Index, sCount1) => {
  item.style.transform = `translateX(-${sCount1 * 100}%)`; // Slide the images

  const specialization = item
    .closest(".specialistSlider")
    .querySelector(".specialization");
  const rightArrow = item
    .closest(".specialistSlider")
    .querySelector(".rightArrow");

  // Access content for the current index
  const currentGroup = specialistContent1[Index];
  const content = currentGroup[sCount1 % currentGroup.length];
  specialization.textContent = content.title;
  rightArrow.setAttribute("href", content.href);
};

// Function for initializing the slider
const specialistImgSlider1 = () => {
  specialistImg1.forEach((item, Index) => {
    const totalImages = item.children.length;
    let sCount1 = 0; // Counter for images in the current slider

    // Automatic sliding every 2.5 seconds
    setInterval(() => {
      sCount1 = (sCount1 + 1) % totalImages; // Increment and reset the counter
      updateSliderContent(item, Index, sCount1); // Update slider content
      specialistActiveButton1(sCount1);
    }, 2500); // Slide every 2.5 seconds
    // Initialize the first content
    updateSliderContent(item, Index, sCount1);
  });
};

// Function to handle active button state
const specialistActiveButton1 = (sCount1) => {
  specialistBtns1.forEach((item, index) => {
    if (index === sCount1) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Event listener for button clicks
specialistBtns1.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Adjust sCount1 to the index of the clicked button
    let sCount1 = index;

    // Slide to the correct image and update content
    specialistImg1.forEach((slider, groupIndex) => {
      slider.style.transition = "transform 1s ease-in-out";
      slider.style.transform = `translateX(-${sCount1 * 100}%)`;

      // Update the content based on clicked button
      updateSliderContent(slider, groupIndex, sCount1);
    });

    // Update active button
    specialistActiveButton1(sCount1);
  });
});

// Initialize the sliders
specialistImgSlider1();

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
