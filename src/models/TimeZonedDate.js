class TimeZonedDate {
  static #assertValid(date) {
    if (date instanceof Date && !isNaN(date)) {
      return date;
    }

    throw new Error("Invalid Date");
  }

  static #parseTimeZone(isoDateString) {
    const lastChar = isoDateString.charAt(isoDateString.length - 1);
    if (lastChar.toLowerCase() === "z") {
      return 0;
    }

    const pattern = /([+-]\d+)$/;
    const match = pattern.exec(isoDateString);

    if (!match || !match[0]) {
      return 0;
    }

    const [tzString] = match;

    const valence = tzString[0] === '+' ? 1 : -1;
    const hours = parseInt(tzString.substring(1, 3), 10);
    const minutes = parseInt(tzString.substring(3, 5), 10);

    if (isNaN(hours) || isNaN(minutes)) {
      return 0;
    }

    const minutesAsHours = minutes / 60;
    return valence * (hours + minutesAsHours);
  }

  static #doubleDigit(d) {
    return `${d}`.length === 1 ? `0${d}` : `${d}`;
  }

  constructor(isoDateString) {
    this.date = TimeZonedDate.#assertValid(new Date(isoDateString));
    this.timeZone = TimeZonedDate.#parseTimeZone(isoDateString);
  }

  get dateString() {
    const year = this.date.getFullYear();
    const month = TimeZonedDate.#doubleDigit(this.date.getMonth() + 1);
    const date = TimeZonedDate.#doubleDigit(this.date.getDate());

    return `${year}-${month}-${date}`;
  }

  get timeString() {
    const [hours, minutes, seconds] = [
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
    ].map((x) => TimeZonedDate.#doubleDigit(x));

    return `${hours}:${minutes}:${seconds}${this.timeZoneString}`;
  }

  get timeZoneString() {
    const absValue = Math.abs(this.timeZone);
    const hours = TimeZonedDate.#doubleDigit(Math.floor(absValue));
    const minutes = TimeZonedDate.#doubleDigit((absValue % 1) * 60);
    const sign = this.timeZone >= 0 ? "+" : "-";

    return `${sign}${hours}${minutes}`;
  }

  get hours() {
    return this.date.getHours();
  }

  #assertSameTimeZone(other) {
    if (other.timeZone === this.timeZone) {
      return;
    }

    throw new Error('Dates have different time zones');
  }

  hasSameDate(other) {
    this.#assertSameTimeZone(other);
    return other.dateString === this.dateString;
  }

  hasSameDateAndHour(other) {
    this.#assertSameTimeZone(other);
    return this.hasSameDate(other) && this.hours === other.hours;
  }

  get [Symbol.toStringTag]() {
    return `${this.dateString}T${this.timeString}`;
  }
}

module.exports = { TimeZonedDate };
