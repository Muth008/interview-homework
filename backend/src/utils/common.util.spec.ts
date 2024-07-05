import { convertStringsToNumbers, generateShipmentId } from './common.util';
import { handleFormNumberError } from "./ajv.util";

jest.mock('./ajv.util', () => ({
  handleFormNumberError: jest.fn(),
}));

describe('convertStringsToNumbers', () => {
  it('should convert valid string numbers to numbers', () => {
    const body = { price: '30', quantity: '100', name: 'test'};
    convertStringsToNumbers(body, ['price', 'quantity']);
    expect(body).toEqual({ price: 30, quantity: 100, name: 'test' });
  });

  it('should call error handler for invalid string numbers', () => {
    const body = { price: 'aa', quantity: '100', name: 'test'};
    convertStringsToNumbers(body, ['price', 'quantity']);
    expect(handleFormNumberError).toHaveBeenCalledWith('price');
    expect(body.quantity).toBe(100); // quantity should still be converted
  });
});

describe('generateShipmentId', () => {
  it('should return a string', () => {
    const id = generateShipmentId();
    expect(typeof id).toBe('string');
  });

  it('should start with a hexadecimal character', () => {
    const id = generateShipmentId();
    expect(id).toMatch(/^[0-9a-f]+$/);
  });
});