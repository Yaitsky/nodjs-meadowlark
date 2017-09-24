const Browser = require('zombie'),
  assert = require('chai').assert;
let browser;

suite('Межстраничные тесты', () => {
  setup(() => {
    browser = new Browser()
  });

  test('запрос расценок для групп со страницы туров по реке Худ' + 
  'должен заполнять поле реферера', (done) => {
    let referrer = 'http://localhost:3000/tours/hood-river';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('запрос расценок для групп со страницы туров' + 
  ' пансионата Орегон коаст должен' + 
  ' заполнять поле реферера', (done) => {
    let referrer = 'http://localhost:3000/tours/oregon-coast';
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        assert(browser.field('referrer').value === referrer);
        done();
      });
    });
  });

  test('посещение страницы Запрос цен для групп напрямую' + 
  'должен приводить к пустому поле реферера', (done) => {
    browser.visit('http://localhost:3000/tours/request-group-rate', () => {
      assert(browser.field('referrer').value === '');
      done();
    });
  });
});