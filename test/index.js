'use strict';

const assert = require('assert');
const lib = require(`../${process.env.NODE_LIB || 'lib'}`);

describe('You need a test', function () {
  it('should test fail', function () {
    assert.ok(false, 'you should add a test!');
  });
});
