import { expect } from 'chai';
import Validator from '../app/components/validator.js';
import { json } from './data.js';

describe('validate data', () => {
  describe('validate errors', () => {
    it('should process null with error', () => {
      const validator = new Validator(null);
      validator.run();
      expect(validator.error).to.be.not.equal(null);
    });

    it('should process empty array without error', () => {
      const validator = new Validator([]);
      validator.run();
      expect(validator.error).to.be.equal(null);
    });

    it('should process array of objects without error', () => {
      const validator = new Validator(json);
      validator.run();
      expect(validator.error).to.be.equal(null);
    });
  });
  describe('validate duplicate references', () => {
    // test internal interface
    it('should have reference 146009 twice', () => {
      const validator = new Validator(json);
      const map = validator.countDuplicates('reference');
      expect(map['146009']).to.be.equal(2);
    });

    // test internal interface
    it('should return reference 146009 as a duplicate value', () => {
      const validator = new Validator(json);
      const arr = validator.checkDuplicates();
      expect(arr.length).to.be.equal(1);
      expect(arr[0]).to.be.equal('146009');
    });

    // test public interface
    it('should query reference 146009 as a duplicate value', () => {
      const validator = new Validator(json);
      validator.run();
      expect(validator.isDuplicate('146009')).to.be.equal(true);
      expect(validator.isDuplicate('175885')).to.be.equal(false);
    });
  });

  describe('validate end balance', () => {
    // test internal interface
    it('should return false when transaction item does not balance', () => {
      const validator = new Validator(json);

      // do NOT run validator and check internals

      // correct
      expect(validator.checkBalance({
        startBalance: '32.01',
        mutation: '+27.12',
        endBalance: '59.13'
      })).to.be.equal(true);

      // wrong end balance
      expect(validator.checkBalance({
        startBalance: '32.01',
        mutation: '+27.12',
        endBalance: '59.14'
      })).to.be.equal(false);

      // deduct
      expect(validator.checkBalance({
        startBalance: '32.01',
        mutation: '-27.12',
        endBalance: '59.13'
      })).to.be.equal(false);

      // omit + symbol
      expect(validator.checkBalance({
        startBalance: '32.01',
        mutation: '27.12',
        endBalance: '59.13'
      })).to.be.equal(true);
    });

    it('should return validation result by transaction reference', () => {
      const validator = new Validator(json);
      validator.run();

      // balance ok
      expect(validator.isBalanced('163585')).to.be.equal(true);
      // balance not ok
      expect(validator.isBalanced('175885')).to.be.equal(false);
    });
  });
});
