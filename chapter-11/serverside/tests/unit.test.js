const { oddNumberDetector } = require("../lib/oddNumberDetector");

describe("Unit Testing Section:", () => {
  test("Positive Case: Odd Number Detector, input is 1 and result must be true:", (done) => {
    expect(oddNumberDetector(1)).toBe(true);
    done();
  });

  test("Negative Case: Odd Number Detector, input is 2 and result must be true:", (done) => {
    expect(oddNumberDetector(2)).toBe(false);
    done();
  });
});
