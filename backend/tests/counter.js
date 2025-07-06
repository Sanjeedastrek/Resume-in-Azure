function increment(counter) {
  return { ...counter, count: counter.count + 1 };
}

module.exports = increment;