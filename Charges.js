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

      const treatmentCharges = data.treatmentCharges;
      const tChargesContainer = document.querySelector(".tCharges");

      tChargesContainer.innerHTML = `
        <h1>${treatmentCharges.title}</h1>
        <div class="cCon">
          <img src="${treatmentCharges.imageSrc}" alt="Treatment Charges" />
          <div class="Services">
            <h1>${treatmentCharges.servicesTitle}</h1>
            <ul>
              ${treatmentCharges.services
                .map(
                  (service) =>
                    `<li><a href="${service.link}" rel="noopener noreferrer">${service.name}</a></li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      `;
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
