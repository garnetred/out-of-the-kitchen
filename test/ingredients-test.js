const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/Ingredient');

describe('Ingredient', function() {

  let ingredient1;

  beforeEach(function() {
    ingredient1 = new Ingredient({id: 20081,
      name: "wheat flour",
      estimatedCostInCents: 142});
  });

  it('should be a function', function() {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of the Ingredient class', function() {
    expect(ingredient1).to.be.an.instanceof(Ingredient);
  });

});
