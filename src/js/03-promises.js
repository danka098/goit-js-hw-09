import Notiflix from 'notiflix'

const form = document.querySelector('form');
const firstDelayField = document.querySelector('input[name="delay"]');
const delayStepField = document.querySelector('input[name="step"]');
const amountField = document.querySelector('input[name="amount"]');
const btnSubmit = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelayValue = Number(firstDelayField.value);
  const delayStepValue = Number(delayStepField.value);
  const amountValue = Number(amountField.value);
  for (let i = 0; i < amountValue; i++) {
    const position = i + 1;
    const delay = firstDelayValue + delayStepValue * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
