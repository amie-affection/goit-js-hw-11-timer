const targetDate = new Date(2020, 6, 17);
console.log(targetDate);

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

let timer = setInterval(function () {
  let now = new Date().getTime();
  let time = targetDate - now;
  // console.log(now);
  // console.log(time);

  // Для подсчета значений используй следующие готовые формулы,
  // где time - разница между targetDate и текущей датой.

  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  // console.log(days);

  /*
   * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // console.log(hours);

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  // console.log(mins);

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */
  const secs = Math.floor((time % (1000 * 60)) / 1000);
  // console.log(secs);

  days <= 9 ? (refs.days.innerText = "0" + days) : (refs.days.innerText = days);

  refs.hours.innerText = ("0" + hours).slice(-2);
  refs.mins.innerText = ("0" + mins).slice(-2);
  refs.secs.innerText = ("0" + secs).slice(-2);

  console.log(refs.days.innerText.length);
}, 1000);
