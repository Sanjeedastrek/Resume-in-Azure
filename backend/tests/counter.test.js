const increment = require('./counter'); // go up one level to import

test('increments count by 1', () => {
  const result = increment({ id: 1, count: 2 });
  expect(result.count).toBe(3);
});
