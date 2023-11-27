var assert = require('assert');
const factorial = require('./factorial');



describe('factorial', function () {

     it('should return -1 when the value is not present', function () {
    console.log(factorial);
        assert.equal(factorial(-12), -1);
      });

      it('should return 120 when the value is 5', function () {
        assert.equal(factorial(5), 120);
      });
     
      it('should return 0 when the value is 1', function () {
        assert.equal(factorial(1), 1);
      });  
      


});