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
    para: "With two decades of excellence, we are proud to be not just the best but also the largest dental clinic in Bangalore and Navi Mumbai!",
  },
  {
    title: "More than 20000+",
    subTitle: "Achieving Success in Cosmetic and Implant Cases!",
    para: "We offer specialized courses to train doctors in dental implant procedures.",
  },
  {
    title: "Among the Best in the Industry",
    subTitle: "An Award-Winning Dental Care Provider",
    para: "A Leading Hospital in Bangalore and Navi Mumbai with a 5-Star Customer Satisfaction Rating",
  },
];

let num = 0;
let interval;

const startSlider = () => {
  interval = setInterval(() => {
    nextSlide();
  }, 2500);
};
// Function to update the slider position
const updateSlider = () => {
  imagesContainer.style.transform = `translateX(-${num * 100}%)`;
  imagesContainer.style.transition = "transform 1s ease-in-out";
  updateActiveButton1();
  updateContent();
};
// Function to update slider content
const updateContent = () => {
  titleElement.textContent = sliderContent[num].title;
  subTitleElement.textContent = sliderContent[num].subTitle;
  paraElement.textContent = sliderContent[num].para;
};

// Function to update active button
const updateActiveButton1 = () => {
  imgButtons.forEach((btn, index) => {
    btn.classList.toggle("active", index === num);
  });
};

// Function to move to next slide
const nextSlide = () => {
  num = (num + 1) % sliderContent.length;
  updateSlider();
};

// Function to move to previous slide
const prevSlide = () => {
  num = (num - 1 + sliderContent.length) % sliderContent.length;
  updateSlider();
};

// Event listener for next button
nextBtn.addEventListener("click", () => {
  clearInterval(interval);
  nextSlide();
  startSlider();
});

// Event listener for previous button
prevBtn.addEventListener("click", () => {
  clearInterval(interval);
  prevSlide();
  startSlider();
});

// Event listener for navigation dots
imgButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    clearInterval(interval);
    num = index;
    updateSlider();
    startSlider();
  });
});

// Initialize slider
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
                "https://script.google.com/macros/s/AKfycbzA4dfWreS-R3QAQv6AZBRDAApsNs1i71iq1sjqLNRnPlGIdryvUz-vciDyyOUN4-VZ/exec",
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
            <i class="${item.icon}"  style="${item.color}"></i>
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
