let navList = document.querySelector(".navList");
let openMenu = document.getElementById("openMenu");
let closeMenu = document.getElementById("closeMenu");

const toogleMenu = (isOpen) => {
  navList.classList.toggle("open", isOpen);
  openMenu.style.display = isOpen ? "none" : "block";
  closeMenu.style.display = isOpen ? "block" : "none";
};

openMenu.addEventListener("click", () => toogleMenu(true));
closeMenu.addEventListener("click", () => toogleMenu(false));

const images = document.querySelector(".images");
const spans = document.querySelectorAll(".imgBtns span");
const titleElement = document.querySelector(".imgContent h2");
const subTitleElement = document.querySelector(".imgContent h1");
const paraElement = document.querySelector(".imgContent p");

const content = [
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

const updateContent = () => {
  // Update the content in the .imgContent section
  titleElement.textContent = content[num].title;
  subTitleElement.textContent = content[num].subTitle;
  paraElement.textContent = content[num].para;
};

let num = 0;
const startSlider = () => {
  setInterval(() => {
    num++;
    if (num > 2) {
      num = 0;
      images.style.transition = " transform 0s ease-in-out";
    } else {
      images.style.transition = " transform 1s ease-in-out";
    }
    images.style.transform = `translateX(-${num * 100}%)`;
    updateActiveButton();
  }, 2500);
};

spans.forEach((span, index) => {
  span.addEventListener("click", () => {
    num = index; // Set the current image to the clicked button's index
    images.style.transition = "transform 1s ease-in-out";
    images.style.transform = `translateX(-${num * 100}%)`;
    updateActiveButton();
  });
});

const updateActiveButton = () => {
  spans.forEach((span, index) => {
    if (index === num) {
      span.classList.add("active");
    } else {
      span.classList.remove("active");
    }
    updateContent();
  });
};
startSlider();

const specialistImg = document.querySelector(".specialistImg");

const rightArrow = document.querySelector(".rightArrow");

const specialization = document.querySelector(".specialization");

const specialistBtns = document.querySelectorAll(".specialistBtns p");

const specialistContent = [
  { title: "Orthodontics", href: "#" },
  { title: "Root Canal", href: "#" },
  { title: "Crowns", href: "#" },
  { title: "Dental Fluorosis", href: "#" },
  { title: "Deep Bite", href: "#" },
  { title: "Early Childwood Caries", href: "#" },
  { title: "Dental Implants", href: "#" },
  { title: "Cosmetic Dentistry", href: "#" },
  { title: "Dental Laminates", href: "#" },
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
    { title: "Orthodontics", href: "#" },
    { title: "Dental Fluorosis", href: "#" },
    { title: "Dental Implants", href: "#" },
  ],
  [
    { title: "Root Canal", href: "#" },
    { title: "Deep Bite", href: "#" },
    { title: "Cosmetic Dentistry", href: "#" },
  ],
  [
    { title: "Crowns", href: "#" },
    { title: "Early Childhood Caries", href: "#" },
    { title: "Dental Laminates", href: "#" },
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

const fnameError = document.querySelector(".fname-error");
const phNoError = document.querySelector(".phNo-error");
const emailError = document.querySelector(".email-error");
const msgError = document.querySelector(".msg-error");
const submitError = document.querySelector(".submit-error");

const fname = document.getElementById("fname");
const phNo = document.getElementById("phNo");
const email = document.getElementById("email");
const msg = document.getElementById("msg");

const Button = document.querySelector(".container form button");

const setError = (element, message) => {
  element.innerHTML = message;
  element.style.bottom = "-23px";
};

const setSucess = (element, message) => {
  element.innerHTML =
    '<i class="fa-solid fa-check" style="color: seagreen; "></i>';
  element.style.bottom = "0px";
  if (message) {
    element.innerHTML = message;
    element.style.bottom = "0px";
  }
};

validateFullName = () => {
  let name = fname.value.trim();

  if (name == "") {
    setError(fnameError, "Name is requried");
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    setError(fnameError, "Write Full Name");
    return false;
  }
  setSucess(fnameError);
  return true;
};

validatephNo = () => {
  let phone = phNo.value.trim();
  if (phone == "") {
    setError(phNoError, "Phone No is requried");
    return false;
  }
  if (phone.length !== 10) {
    setError(phNoError, "Phone No should be 10 digits");
    return false;
  }
  if (!phone.match(/^[0-9]{10}$/)) {
    setError(phNoError, "Only Digits please");
    return false;
  }
  setSucess(phNoError);
  return true;
};

validateEmail = () => {
  let Email = email.value.trim();
  if (Email == "") {
    setError(emailError, "Email is requried");
    return false;
  }
  if (!Email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    setError(emailError, "Email Invaild");
    return false;
  }
  setSucess(emailError);
  return true;
};

validateMsg = () => {
  let message = msg.value.trim();
  let req = 30;
  let left = req - message.length;
  if (message == "") {
    setSucess(msgError, "Message is requried");
    return false;
  }
  if (left > 0) {
    setSucess(msgError, `${left} more characters required`);
    return false;
  }
  setSucess(msgError);

  return true;
};

fname.addEventListener("keyup", validateFullName);

phNo.addEventListener("keyup", validatephNo);

email.addEventListener("keyup", validateEmail);

msg.addEventListener("keyup", validateMsg);

Button.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !validateFullName() ||
    !validatephNo() ||
    !validateEmail() ||
    !validateMsg()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix the above error to submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  } else {
    submitError.style.cssText = "display: block; color: seagreen;";
    submitError.innerHTML = "Form submitted successfully";
    fname.value = "";
    phNo.value = "";
    email.value = "";
    msg.value = "";

    setTimeout(() => {
      submitError.style.display = "none";
    }, 2000);
    return true;
  }
});
