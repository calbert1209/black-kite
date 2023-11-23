export class TidalEvent {
  constructor(timestamp, level, type) {
    this.timeStamp = timestamp;
    this.level = level;
    this.type = type;
  }

  get asObject() {
    return {
      timeStamp: this.timeStamp,
      level: this.level,
      type: this.type,
    };
  }

  compareTo(other) {
    const dateTimeMS = new Date(this.timeStamp).valueOf();
    const otherMS = new Date(other.timeStamp).valueOf();
    return dateTimeMS - otherMS;
  }
}
