# Black-kite

Visual representation of tide levels

## Setup

### Capture Annual Data

#### 1. Create Year's lunar data JSON

```bash
# Writes to ./data/main/YEAR-lunar-data.json
node ./scripts/createLunarDataFile.js <year>
```

#### 2. Create Year's tidal data JSON

```bash
# Writes to ./data/main/YEAR-tidal-data.json
node ./scripts/createTidalDataFile.js <year>
```

#### 3. Append annual data

Append lunar data to the public asset `./public/lunar-data.json`. Do the same for `./public/tidal-data.json`.

