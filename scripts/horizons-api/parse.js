/**
 * Pad start of number (or string) `n` with zero characters to ensure length of `d`
 */
function padDigits(n, d) {
  return n.toString().padStart(d, "0");
}

/**
 * Convert date string like `2022-Dec-31 00:00`
 * into ISOString like `2022-12-31T00:00:00.000Z`
 */
function parseDate(datePart) {
  const toMonth = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const [date, time] = datePart.split(" ");
  const [yyyy, monthWord, dd] = date.split("-");
  const month = padDigits(toMonth[monthWord], 2);
  return `${yyyy}-${month}-${dd}T${time}:00.000Z`;
}

/**
 * Convert time-zone offset value into ISO compliant time-zone offset string
 */
function serializedTimeOffset(offset) {
  const sign = offset < 0 ? "-" : "+";
  const abs = Math.abs(offset);
  const hours = Math.floor(abs);
  const minutes = Math.floor((abs % 1) * 60);
  return `${sign}${padDigits(hours, 2)}${padDigits(minutes, 2)}`;
}

/**
 * Create ISO String with time-zone information from UTC string and time-zone offset values
 * @example `('2023-12-31T6:00:00.000Z', -3.5) => '2023-12-31T2:30:00.000-0330'`
 */
function zonedDateString(utcDateString, timeOffset) {
  const date = new Date(utcDateString);
  if (!(date instanceof Date) || isNaN(date)) {
    throw Error(`Invalid Date from ${utcDateString}`);
  }

  const offsetInMS = timeOffset * 60 * 60 * 1_000;
  const utcDatePlusOffset = new Date(date.valueOf() + offsetInMS);
  const [year, month, dd, h, m, s, ms] = [
    utcDatePlusOffset.getUTCFullYear(),
    padDigits(utcDatePlusOffset.getUTCMonth() + 1, 2),
    padDigits(utcDatePlusOffset.getUTCDate(), 2),
    padDigits(utcDatePlusOffset.getUTCHours(), 2),
    padDigits(utcDatePlusOffset.getUTCMinutes(), 2),
    padDigits(utcDatePlusOffset.getUTCSeconds(), 2),
    padDigits(utcDatePlusOffset.getUTCMilliseconds(), 3),
  ];

  const timeOffsetString = serializedTimeOffset(timeOffset);

  return `${year}-${month}-${dd}T${h}:${m}:${s}.${ms}${timeOffsetString}`;
}

/**
 * Convert csv table line to data object
 */
export function parseLine(line, svsInfo) {
  const [datePart, _sunPosition, _moonPosition, azimuth, elevation, phi] = line
    .split(",")
    .map((part) => part.trim());
  const parsedDateTime = parseDate(datePart);
  const svsMoonInfo = svsInfo[parsedDateTime] ?? {};
  return {
    utcDate: parsedDateTime,
    localDate: zonedDateString(parsedDateTime, 9),
    azimuth: parseFloat(azimuth),
    elevation: parseFloat(elevation),
    phi: parseFloat(phi),
    ...svsMoonInfo,
  };
}

/**
 * strip out csv table from response
 */
export function getCsvLines(lines) {
  const soePattern = /^\$\$SOE/;
  const eoePattern = /^\$\$EOE/;

  const csvLines = [];
  let canPush = false;
  for (const line of lines) {
    if (eoePattern.test(line)) {
      break;
    }

    if (soePattern.test(line)) {
      canPush = true;
      continue;
    }

    if (canPush) {
      csvLines.push(line);
    }
  }

  return csvLines;
}

export function collateParsedLines(lines) {
  return lines.reduce((agg, line) => {
    const [key] = line.localDate.split("T");
    if (!Array.isArray(agg[key])) {
      agg[key] = [];
    }

    agg[key].push(line);

    return agg;
  }, {});
}
