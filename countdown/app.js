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

let tempDate = new Date();
tempDate.setDate(tempDate.getDate() + 10);
const endDate = tempDate;
tempDate = null;

//format endDate
const endYear = endDate.getFullYear();
const endMonth = months[endDate.getMonth()];
const endDay = weekdays[endDate.getDay()];
const endDateNum = endDate.getDate();
let endHours = endDate.getHours();
let endMins = endDate.getMinutes();
let endSecs = endDate.getSeconds();

//pad leading 0s
endHours = endHours < 10 ? '0' + endHours : endHours;
endMins = endMins < 10 ? '0' + endMins : endMins;

//display endDate
giveaway.textContent = `giveaway ends ${endDay} ${endMonth} ${endDateNum}, ${endYear} @ ${endHours}:${endMins}`

//calculate remaining time
function updateCountdown() {
  //values in ms
  const DAYMS = 1000 * 60 * 60 * 24;
  const HOURMS = 1000 * 60 * 60;
  const MINMS = 1000 * 60;
  const SECMS = 1000

  //get distance in ms to deadline from current time
  let diffms = endDate - Date.now();

  //calculate remaining days/hours/mins/secs from now to endDate
  let remdays = Math.floor(diffms / DAYMS);
  let remhours = Math.floor((diffms % DAYMS) / HOURMS);
  let remmins = Math.floor((diffms % HOURMS) / MINMS);
  let remsecs = Math.floor((diffms % MINMS) / SECMS);

  //display result
  const values = [remdays, remhours, remmins, remsecs];

  function preZero(item) {
    return item = item < 10 ? `0${item}` : item;
  }
  digits.forEach((item, index) => item.textContent = preZero(values[index]));

  if (diffms <= 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`
    digits.forEach(item => item.textContent = '00');
  }
}

let countdown = setInterval(updateCountdown, 1000);
updateCountdown();
