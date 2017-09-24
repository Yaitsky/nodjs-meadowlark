const companies = [
  'apple',
  'youtube',
  'google',
  'yandex',
  'paypal'
];

exports.getCompany = () => {
  let idx = Math.floor(Math.random() * companies.length);
  return companies[idx];
}