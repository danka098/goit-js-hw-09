import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};
const datePicker = flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function countDown() {
  let timerId = setInterval(() => {
    let userDate = new Date().getTime();
    let timeDifference = convertMs(
      datePicker.selectedDates[0].getTime() - userDate
    );
    dataDays.textContent = addLeadingZero(timeDifference.days);
    dataHours.textContent = addLeadingZero(timeDifference.hours);
    dataMinutes.textContent = addLeadingZero(timeDifference.minutes);
    dataSeconds.textContent = addLeadingZero(timeDifference.seconds);
    console.log('countdown test');
    startBtn.disabled = true;
    if (datePicker.selectedDates[0].getTime() - userDate < 1001) {
      clearInterval(timerId);
    }
  }, 1000);
}

startBtn.addEventListener('click', countDown);
