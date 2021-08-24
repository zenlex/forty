const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const digits = document.querySelectorAll('.deadline-format h4');

let endDate = new Date(2021, 11, 23, 11, 17);

//format deadline
const year = endDate.getFullYear();
const month = months[endDate.getMonth()];
const day = weekdays[endDate.getDay()];
const date = endDate.getDate();
const hours = endDate.getHours();
const mins = endDate.getMinutes();
const secs = endDate.getSeconds();

giveaway.textContent = `${day} ${month} ${date}, ${year}`

//calculate remaining time
function updateCountdown() {
  let now = new Date();
  //calculate remaining days/hours/mins/secs from now to endDate
  let remdays = 1;
  let remhours = 2;
  let remmins = 3;
  let remsecs = 4;
  digits[0].textContent = remdays
  digits[1].textContent = remhours
  digits[2].textContent = remmins
  digits[3].textContent = remsecs
}

setInterval(updateCountdown, 1000);