"Use strict";

const dayText = document.getElementById("day");
const monthText = document.getElementById("month");
const yearText = document.getElementById("year");

//Define Values

let day = 0,
  month = 0,
  year = 0;

//Adding Event Listeners
yearText.addEventListener("input", (e) => {
  handleYear(e);
});

monthText.addEventListener("input", (e) => {
  handleMonth(e);
});

dayText.addEventListener("input", (e) => {
  handleDay(e);
});

function handleYear(e) {
  year = e.target.value;
}
function handleMonth(e) {
  month = e.target.value;
}
function handleDay(e) {
  day = e.target.value;
}

//HANDLE SUBMIT
function handleSubmit() {
  //const stringDate = new Date("2022-05-13");

  if (!day.length > 0 || !month.length > 0 || !year.length > 0) {
    alert("Check data entered! ❌");
    return;
  }

  //Calculate Day of Week
  const options = { weekday: "long" };
  const dayOfWeek = new Date(`${year}-${month}-${day}`).toLocaleString(
    "en-US",
    options
  );

  const calcDate = new Date(`${year}-${month}-${day}`);

  const diff = new Date() - calcDate;
  // Convert milliseconds to seconds, minutes, hours, days, and years
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  //Accounting for leap years
  let years, months;

  if (+year % 4 === 0) {
     years = Math.floor(days / 366);
  } else {
     years = Math.floor(days / 365);
  };


  //Accounting for 30 Days, 31 Days and February 28

  if (+month === 9 || +month === 4 || +month === 6 || +month === 11){

    if (+year % 4 === 0) {
       months = Math.floor((days % 366) / 30);
    } else {
       months = Math.floor((days % 365) / 30);
    };
  } else if (+month === 2){
    if (+year % 4 === 0) {
       months = Math.floor((days % 366) / 29);
    } else {
       months = Math.floor((days % 365) / 28);
    };
  } else {
       months = Math.floor((days % 365) / 31);

  }


  // Calculate remaining months and days
  const remainingDays = Math.floor((days % 365) % 30);

  //Populate Data
  document.getElementById("dateyears").textContent = `${years} yrs`;
  document.getElementById("datemonths").textContent = `${months} months`;
  document.getElementById("datedays").textContent = `${remainingDays} days`;
  document.getElementById("daytype").textContent = `${dayOfWeek}`;

  //Open the Modal with Computed Data
  const Modal = document.querySelector(".review-overlay");

  Modal.classList.remove("hidden");
  Modal.classList.remove("animate");
  Modal.classList.add("animate1");

  //Clear Input Fields
  yearText.value = "";
  monthText.value = "";
  dayText.value = "";
}

const closeModal = () => {
  const Modal = document.querySelector(".review-overlay");

  Modal.classList.remove("animate1");
  Modal.classList.add("animate");
  setTimeout(() => {
    Modal.classList.toggle("hidden");
  }, 1000);
};
