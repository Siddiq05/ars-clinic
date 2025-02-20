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

function toggleAnswer(faqId) {
  const faq = document.getElementById(faqId);
  const icon = faq.querySelector(".fa-caret-down");
  const answer = faq.querySelector(".answer-container");

  // Toggle display of the answer
  faq.classList.toggle("active");

  // Toggle the icon rotation
  icon.classList.toggle("rotate");
}
