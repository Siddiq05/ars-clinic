const imagesContainer = document.getElementById("imageSlider");
const imgButtons = document.querySelectorAll(".imgBtns span");
const titleElement = document.getElementById("title");
const subTitleElement = document.getElementById("subTitle");
const paraElement = document.getElementById("para");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const sliderContent = [
  {
    title: "Innovative Dental™ Solutions Since 2009",
    subTitle: "WE ARE Innovative Dental",
    para: "With two decades of excellence, we are proud to be not just the best but also the largest dental clinic in Bangalore!",
  },
  {
    title: "More than 20000+",
    subTitle: "Achieving Success in Cosmetic and Implant Cases!",
    para: "We offer specialized courses to train doctors in dental implant procedures.",
  },
  {
    title: "Among the Best in the Industry",
    subTitle: "An Award-Winning Dental Care Provider",
    para: "A Leading Hospital in Bangalore with a 5-Star Customer Satisfaction Rating",
  },
];

let num = 0;
let interval;

const updateContent = () => {
  titleElement.textContent = sliderContent[num].title;
  subTitleElement.textContent = sliderContent[num].subTitle;
  paraElement.textContent = sliderContent[num].para;
};

const updateSlider = () => {
  imagesContainer.style.transform = `translateX(-${num * 100}%)`;
  imgButtons.forEach((btn, index) => {
    btn.classList.toggle("active", index === num);
  });
  updateContent();
};

const startSlider = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    num = (num + 1) % sliderContent.length;
    updateSlider();
  }, 2500);
};

// Handle next button click
nextBtn.addEventListener("click", () => {
  num = (num + 1) % sliderContent.length;
  updateSlider();
  startSlider();
});

// Handle previous button click
prevBtn.addEventListener("click", () => {
  num = (num - 1 + sliderContent.length) % sliderContent.length;
  updateSlider();
  startSlider();
});

// Handle button click navigation
imgButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    num = parseInt(e.target.getAttribute("data-index"));
    updateSlider();
    startSlider();
  });
});

updateContent();
updateSlider();
startSlider();
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

const specialistImg = document.querySelector(".specialistImg");
const rightArrow = document.querySelector(".rightArrow");
const specialization = document.querySelector(".specialization");
const specialistBtns = document.querySelectorAll(".specialistBtns p");

// Selecting prev and next buttons
const prevBtn1 = document.querySelector(".prev1");
const nextBtn1 = document.querySelector(".next1");

const specialistContent = [
  { title: "Orthodontics", href: "/Orthodontics.html" },
  { title: "Root Canal", href: "/RootCanalTreatment.html" },
  { title: "Crowns", href: "/Crown.html" },
  { title: "Dental Fluorosis", href: "/DentalFluorosis.html" },
  { title: "Deep Bite", href: "/deepBite.html" },
  { title: "Early Childhood Caries", href: "/EarlyChildhoodCaries.html" },
  { title: "Dental Implants", href: "/DentalImplants.html" },
  { title: "Cosmetic Dentistry", href: "/CosmeticDentistry.html" },
  { title: "Dental Laminates", href: "/DentalLaminates.html" },
];

let sCount = 0;
let imgInterval;

const specialistImgSlider = () => {
  imgInterval = setInterval(() => {
    nextImage();
  }, 2500);
};

const updateSlider1 = () => {
  specialistImg.style.transform = `translateX(-${sCount * 100}%)`;
  specialistImg.style.transition = "transform 1s ease-in-out";
  specialistActiveButton();
  specialistupdateContent();
};

const specialistActiveButton = () => {
  specialistBtns.forEach((item, index) => {
    item.classList.toggle("active", index === sCount);
  });
};

const specialistupdateContent = () => {
  specialization.textContent = specialistContent[sCount].title;
  rightArrow.setAttribute("href", specialistContent[sCount].href);
};

const nextImage = () => {
  sCount = (sCount + 1) % specialistContent.length; // Loop to the first image after the last
  updateSlider1();
};

const prevImage = () => {
  sCount = (sCount - 1 + specialistContent.length) % specialistContent.length; // Loop to the last image when at the first
  updateSlider1();
};

// Click event for prev and next buttons
prevBtn1.addEventListener("click", () => {
  clearInterval(imgInterval);
  prevImage();
  specialistImgSlider();
});

nextBtn1.addEventListener("click", () => {
  clearInterval(imgInterval);
  nextImage();
  specialistImgSlider();
});

// Click event for navigation dots
specialistBtns.forEach((item, index) => {
  item.addEventListener("click", () => {
    clearInterval(imgInterval);
    sCount = index;
    updateSlider();
    specialistImgSlider();
  });
});

specialistImgSlider();

const specialistImg1 = document.querySelectorAll(".specialistImg1");
const specialistBtns1 = document.querySelectorAll(".specialistBtns1 p");
const prevBtn2 = document.querySelector(".prev2");
const nextBtn2 = document.querySelector(".next2");

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

let sCount1 = [0, 0, 0]; // Tracks index for each slider
let imgInterval1;

// Function to update slider content
const updateSliderContent = (groupIndex) => {
  specialistImg1[groupIndex].style.transform = `translateX(-${
    sCount1[groupIndex] * 100
  }%)`;

  const specialization = specialistImg1[groupIndex]
    .closest(".specialistSlider")
    .querySelector(".specialization");
  const rightArrow = specialistImg1[groupIndex]
    .closest(".specialistSlider")
    .querySelector(".rightArrow");

  const content = specialistContent1[groupIndex][sCount1[groupIndex]];
  specialization.textContent = content.title;
  rightArrow.setAttribute("href", content.href);

  updateActiveButton();
};

// Function to start automatic sliding
const startAutoSlide = () => {
  clearInterval(imgInterval1);
  imgInterval1 = setInterval(() => {
    specialistImg1.forEach((_, groupIndex) => {
      sCount1[groupIndex] =
        (sCount1[groupIndex] + 1) % specialistContent1[groupIndex].length;
      updateSliderContent(groupIndex);
    });
  }, 2500);
};

// Function to update active button
const updateActiveButton = () => {
  specialistBtns1.forEach((btn, index) => {
    btn.classList.toggle("active", index === sCount1[0]);
  });
};

// Event listener for manual button clicks
specialistBtns1.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    specialistImg1.forEach((_, groupIndex) => {
      sCount1[groupIndex] = index;
      updateSliderContent(groupIndex);
    });

    clearInterval(imgInterval1);
    setTimeout(startAutoSlide, 2500);
  });
});

// Event listeners for next & prev buttons
nextBtn2.addEventListener("click", () => {
  specialistImg1.forEach((_, groupIndex) => {
    sCount1[groupIndex] =
      (sCount1[groupIndex] + 1) % specialistContent1[groupIndex].length;
    updateSliderContent(groupIndex);
  });
  clearInterval(imgInterval1);
  setTimeout(startAutoSlide, 5000);
});

prevBtn2.addEventListener("click", () => {
  specialistImg1.forEach((_, groupIndex) => {
    sCount1[groupIndex] =
      (sCount1[groupIndex] - 1 + specialistContent1[groupIndex].length) %
      specialistContent1[groupIndex].length;
    updateSliderContent(groupIndex);
  });
  clearInterval(imgInterval1);
  setTimeout(startAutoSlide, 1000);
});

// Start the slider
startAutoSlide();

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
