# black-kite

<p align="center">
	<img src="./public/favicon.svg" alt="black-kite favicon" width="64" height="64" />
</p>

Black-kite is a Preact + Vite app for viewing daily tide levels and moon position data.

The app reads two static JSON assets at runtime:

- `public/tidal-data.json`
- `public/lunar-data.json`

## Requirements

- Node.js 18+ (20+ recommended)
- npm 9+

## Local Setup

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## How The App Runs

At startup, the UI fetches the following files from the web root:

- `./tidal-data.json`
- `./lunar-data.json`

Because Vite serves `public/` files as root assets, this maps to:

- `public/tidal-data.json`
- `public/lunar-data.json`

If these files are missing, outdated, or malformed, the UI will not render expected charts/windows.

## Data Pipeline

The repository separates source snapshots and generated files:

- `data/svs/`: NASA SVS moon information snapshots used by lunar generation.
- `data/main/`: generated year-specific JSON (and optional CSV) files.
- `public/`: runtime assets consumed by the app.

### Generate Annual Data

Generate lunar data for one year:

```bash
# Writes: data/main/<year>-lunar-data.json
node ./scripts/createLunarDataFile.js <year>
```

Generate tidal data for one year:

```bash
# Writes: data/main/<year>-tidal-data.json
node ./scripts/createTidalDataFile.js <year>
```

Optionally generate a combined per-day view for validation/analysis:

```bash
# Writes: data/main/<year>-merged-data.json
node ./scripts/mergeLunarTidalDataFiles.js <year>
```

Optionally export tidal events to CSV:

```bash
# Writes: data/main/<year>-tidal-data.csv
node ./scripts/createTidalCsv.js <year>
```

### Publish Data To Runtime Assets

After generating a new year, merge that year into the runtime JSON assets:

- append/merge `data/main/<year>-lunar-data.json` into `public/lunar-data.json`
- append/merge `data/main/<year>-tidal-data.json` into `public/tidal-data.json`

Keep top-level keys in `YYYY-MM-DD` format and avoid duplicate date keys.

## Where Data Comes From

### 1. Lunar Position Data

Source systems:

- NASA JPL Horizons API (`ssd.jpl.nasa.gov/api/horizons.api`) for hourly ephemeris values.
- NASA Scientific Visualization Studio snapshots in `data/svs/mooninfo_<year>.json` for moon metadata.

Process:

- `scripts/createLunarDataFile.js` fetches Horizons data for the year window.
- `scripts/horizons-api/parse.js` converts raw CSV rows to normalized entries.
- `scripts/nasa-svs/parse.js` overlays SVS info by UTC timestamp.
- output is written to `data/main/<year>-lunar-data.json`.

### 2. Tidal Data

Source system:

- Japan Meteorological Agency (JMA) tide text data (`www.data.jma.go.jp`).

Process:

- `scripts/createTidalDataFile.js` downloads yearly tidal data (`.../txt/<year>/D8.txt`).
- `scripts/jma/parse.js` parses rows into daily tidal events.
- output is written to `data/main/<year>-tidal-data.json`.

### 3. JMA Station Metadata (Optional)

Source system:

- JMA station table pages (`.../station<year>.php`).

Process:

- `scripts/gatherJmaStations.js` fetches and parses station metadata.
- output is written to `data/main/<year>-jma-stations.json`.

## Suggested Yearly Update Checklist

1. Ensure `data/svs/mooninfo_<year>.json` exists for the new year.
2. Run lunar and tidal generation scripts for that year.
3. Optionally run merged and CSV exports for sanity checks.
4. Merge generated year data into `public/lunar-data.json` and `public/tidal-data.json`.
5. Run `npm run dev` and verify several dates across the new year.
6. Run `npm run build` to confirm production build integrity.

## Tech Stack

- Preact
- TypeScript
- Vite
- date-fns

