import { expect } from 'chai';
import parser from '../app/components/parser.js';
import { xml as xmlString } from './data.js';

describe('parse data', () => {
  describe.skip('parse csv string to json', () => {
    it('should return an error when input is null', () => {
      // not implemented yet
    });

    it('should return an error when input is not a valid csv string', () => {
      // not implemented yet
    });

    it('should parse csv string to json', () => {
      // not implemented yet
    });
  });

  describe('parse xml string to json', () => {
    it('should return an error when input is null', (done) => {
      parser.parseXml(null, (err, data) => {
        expect(err).to.be.not.equal(null);
        expect(data).to.be.equal(undefined);
        done();
      });
    });

    it('should return an error when input is not a valid xml string', (done) => {
      parser.parseXml('<a>bad xml<b>!</b></a>', (err, data) => {
        expect(err).to.be.not.equal(null);
        expect(data).to.be.equal(undefined);
        done();
      });
    });

    it('should parse xml string to json', (done) => {
      parser.parseXml(xmlString, (err, data) => {
        expect(err).to.be.equal(null);
        expect(data).to.be.an('array');
        expect(data.length).to.be.equal(11);
        done();
      });
    });
  });
});
