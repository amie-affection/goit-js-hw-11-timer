//! Таймер обратного отсчета

// Создай плагин настраиваемого таймера, который ведет обратный отсчет
// до предварительно определенной даты.Такой плагин может использоваться в блогах
// и интернет-магазинах, страницах регистрации событий,
// во время технического обслуживания и т.д.

// Плагин ожидает следующую HTML-разметку и показывает четыре цифры:
// дни, часы, минуты и секунды в формате XX: XX: XX: XX.
// Количество дней может состоять из более чем двух цифр.

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

// const targetDate = new Date(2020, 6, 17);
// console.log(targetDate);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);

    this.days = this.selector.querySelector('[data-value="days"]');
    this.hours = this.selector.querySelector('[data-value="hours"]');
    this.mins = this.selector.querySelector('[data-value="mins"]');
    this.secs = this.selector.querySelector('[data-value="secs"]');

    this.targetDate = targetDate.getTime();
    this.timeCount();
    this.updateTime();
  }

  timeCount() {
    let now = Date.now();
    // console.log(now);
    let time = this.targetDate - now;
    if (now >= this.targetDate) {
      this.currentTime(0);
      return;
    }
    this.currentTime(time);
  }

  updateTime() {
    let timer = setInterval(() => {
      let now = Date.now();
      // console.log(now);
      let time = this.targetDate - now;
      this.currentTime(time);
      if (now >= this.targetDate) {
        clearInterval(timer);
        this.currentTime(0);
      }
    }, 1000);
  }

  currentTime(time) {
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
    this.refs(days, hours, mins, secs);
  }

  refs(day, hour, min, sec) {
    this.days.innerText = this.pad(day);
    this.hours.innerText = this.pad(hour);
    this.mins.innerText = this.pad(min);
    this.secs.innerText = this.pad(sec);
  }

  pad(text) {
    return String(text).padStart(2, "0");
  }
}

const timerCounter = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2030"),
});
console.log(timerCounter);
console.log(Date.now());
