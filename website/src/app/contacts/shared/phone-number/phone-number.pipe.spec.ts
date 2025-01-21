import { PhoneNumberPipe } from "./phone-number.pipe"

describe('PhoneNumberPipe Tests', () => {
  let phoneNumber: PhoneNumberPipe = null;

  beforeEach(() => {
    phoneNumber = new PhoneNumberPipe();
  });

  describe('default behavior', () => {
    it('should transform the string or number into the default phone format', () => {
      const testInputPhoneNumber = '7035550123';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
      const expectedResult = '(703) 555-0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });

    it('should not display anything if the length is not 10 digits', () => {
      const testInputPhoneNumber = '703555012';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber);
      const expectedResult = '';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });
  });

  describe('phone number format tests', () => {
    it('should format the phone number using the dots format', () => {
      const testInputPhoneNumber = '7035550123';
      const format = 'dots';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
      const expectedResult = '703.555.0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });

    it('should format the phone number using the default format', () => {
      const testInputPhoneNumber = '7035550123';
      const format = 'default';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
      const expectedResult = '(703) 555-0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });

    it('should format the phone number using the hyphens format', () => {
      const testInputPhoneNumber = '7035550123';
      const format = 'hyphens';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
      const expectedResult = '703-555-0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });

    it('should format the phone number using the default format when gibberish is inputted as format', () => {
      const testInputPhoneNumber = '7035550123';
      const format = 'gibberish';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format);
      const expectedResult = '(703) 555-0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });
  });

  describe('country code paramter tests', () => {
    it('should add respective country code', () => {
      const testInputPhoneNumber = '7035550123';
      const format = 'default';
      const countryCode = 'us';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format, countryCode);
      const expectedResult = '+1 (703) 555-0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });

    it('should not add respective country code when country code is unrecognized', () => {
      const testInputPhoneNumber = '7035550123';
      const format = 'default';
      const countryCode = 'be';
      const tranformedPhoneNumber = phoneNumber.transform(testInputPhoneNumber, format, countryCode);
      const expectedResult = '(703) 555-0123';

      expect(tranformedPhoneNumber).toBe(expectedResult);
    });


  });

  afterEach(() => {
    phoneNumber = null;
  });
});
