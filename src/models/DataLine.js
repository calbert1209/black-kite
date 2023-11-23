// const { TidalEvent } = require("./TidalEvent/TidalEvent");
import { TidalEvent } from "./TidalEvent/TidalEvent.js";
/**
 * 　毎時潮位データ	：	　１～　７２カラム	　３桁×２４時間（０時から２３時）
 * 　年月日	：	７３～　７８カラム	　２桁×３
 * 　地点記号	：	７９～　８０カラム	　２桁英数字記号
 * 　満潮時刻・潮位	：	８１～１０８カラム	　時刻４桁（時分s）、潮位３桁（ｃｍ）
 * 　干潮時刻・潮位	：	１０９～１３６カラム	　時刻４桁（時分）、潮位３桁（ｃｍ）
 */

export class Line {
  #tzOffset;
  #data;

  constructor(line, tzOffset) {
    this.#data = line;
    this.#tzOffset = tzOffset;
  }

  get #tzOffsetString() {
    const offsetString = this.#doubleDigit(this.#tzOffset);
    const sign = this.#tzOffset >= 0 ? "+" : "-";
    return `${sign}${offsetString}00`;
  }

  get dateString() {
    const year = this.#substring(72, 2);
    const month = this.#doubleDigit(this.#substring(74, 2));
    const day = this.#doubleDigit(this.#substring(76, 2));
    return `20${year}-${month}-${day}`;
  }

  #doubleDigit(d) {
    const dString = `${d}`;
    return dString.length === 1 ? `0${dString}` : dString;
  }

  #substring(offset, count, trim = true) {
    const substring = this.#data.substring(offset, offset + count);
    return trim ? substring.trim() : substring;
  }

  #parseSubstring(offset, count) {
    return parseInt(this.#substring(offset, count, true), 10);
  }

  #parseTime(offset) {
    return [offset, offset + 2].map((start) => this.#parseSubstring(start, 2));
  }

  #tidalEventAt(offset, type) {
    const [hours, minutes] = this.#parseTime(offset);

    // when there is only one high or low tide event, the place for a second will
    // be overwritten with `9`s
    if (hours > 24) {
      return null;
    }

    const timestamp = this.#timeStamp(hours, minutes);
    const level = this.#parseSubstring(offset + 4, 3);
    return new TidalEvent(timestamp, level, type);
  }

  #tidalEvents(offsets, type) {
    return offsets
      .map((offset) => this.#tidalEventAt(offset, type))
      .filter((event) => event !== null);
  }

  #timeStamp(h = 0, m = 0) {
    const hours = this.#doubleDigit(h);
    const minutes = this.#doubleDigit(m);
    return `${this.dateString}T${hours}:${minutes}:00${this.#tzOffsetString}`;
  }

  get dayStart() {
    return this.#timeStamp();
  }

  get hourlySeaLevels() {
    const levels = [];
    for (let h = 0; h < 24; h++) {
      const timeStamp = this.#timeStamp(h);
      const hourlyLevel = this.#parseSubstring(h * 3, 3);
      levels.push(new TidalEvent(timeStamp, hourlyLevel, "hourly"));
    }

    return levels;
  }

  get highTideEvents() {
    return this.#tidalEvents([80, 87], "high");
  }

  get lowTideEvents() {
    return this.#tidalEvents([108, 115], "low");
  }

  get orderedEvents() {
    return [
      ...this.hourlySeaLevels,
      ...this.highTideEvents,
      ...this.lowTideEvents,
    ].sort((a, b) => a.compareTo(b));
  }

  get eventsAsObjects() {
    return this.orderedEvents.map((event) => event.asObject);
  }
}
