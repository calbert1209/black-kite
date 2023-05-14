// const FormData = require('form-data');
// const fetch = require('node-fetch');
// const formData = new FormData();

// formData.append('MAKE_EPHEM', 'YES');
// formData.append('COMMAND', '301');
// formData.append('EPHEM_TYPE', 'OBSERVER');
// formData.append('CENTER', ''coord@399'');
// formData.append('COORD_TYPE', 'GEODETIC');
// formData.append('SITE_COORD', ''139.484444,35.300556,0'');
// formData.append('START_TIME', ''2022-12-31'');
// formData.append('STOP_TIME', ''2024-01-01'');
// formData.append('QUANTITIES', ''4,43'');
// formData.append('CAL_TYPE', ''M'');
// formData.append('CSV_FORMAT', ''YES'');
// formData.append('OBJ_DATA', ''NO'');
// formData.append('format', 'text');

// let url = 'https://ssd.jpl.nasa.gov/api/horizons.api';

// let options = {
//   method: 'GET',
//   headers: {
//     Accept: '*/*',
//     'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
//     'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
//   }
// };

// options.body = formData;

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));