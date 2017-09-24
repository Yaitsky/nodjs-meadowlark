const company = require('../lib/companies'),
  expect = require('chai').expect;

suite('Тесты компаний', () => {
  test('getCompany() должна возвращать компанию', () => {
    expect(typeof company.getCompany() === 'string');
  });
});