suite('About page test', () => {
  test('Страница должна содержать ссылку на Контакты', () => {
    assert($('a[href="/contact"]').length);
  });
});