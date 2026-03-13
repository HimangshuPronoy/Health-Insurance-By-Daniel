/* eslint-disable */
const fs = require('fs');
const https = require('https');
const path = require('path');

const domains = {
  'Kaiser Permanente': 'kaiserpermanente.org',
  'UnitedHealthcare': 'uhc.com',
  'Blue Cross Blue Shield': 'bcbs.com',
  'Cigna': 'cigna.com',
  'Aetna': 'aetna.com',
  'Humana': 'humana.com',
  'Molina Healthcare': 'molinahealthcare.com',
  'Oscar Health': 'hioscar.com'
};

const dir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(domains).forEach(([name, domain]) => {
  const file = fs.createWriteStream(path.join(dir, `${domain}.png`));
  https.get(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`, (res) => {
    res.pipe(file);
    file.on('finish', () => file.close());
  });
});
console.log('Logos fetched!');
