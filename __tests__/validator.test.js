import { describe, it, expect } from 'vitest';
import { Validator } from '../src/models/validator.js';

describe('StringSchema', () => {
  it('should validate strings with no rules applied', () => {
    const v = new Validator();
    const schema = v.string();

    expect(schema.isValid('')).toBe(true);
    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid(undefined)).toBe(true);
  });

  it('should validate required strings', () => {
    const v = new Validator();
    const schema = v.string().required();

    expect(schema.isValid('what does the fox say')).toBe(true);
    expect(schema.isValid('hexlet')).toBe(true);
    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid('')).toBe(false);
  });

  it('should validate strings with contains rule', () => {
    const v = new Validator();
    const schema = v.string().required().contains('what');

    expect(schema.isValid('what does the fox say')).toBe(true);
    expect(schema.isValid('hexlet')).toBe(false);
    expect(schema.contains('whatthe').isValid('what does the fox say')).toBe(false);
  });

  it('should apply the last contains rule', () => {
    const v = new Validator();
    const schema = v.string().contains('fox').contains('whatthe');

    expect(schema.isValid('what does the fox say')).toBe(false);
  });

  it('should apply the last minLength rule', () => {
    const v = new Validator();
    const schema = v.string().minLength(10).minLength(4);

    expect(schema.isValid('Hexlet')).toBe(true);
    expect(schema.isValid('Hey')).toBe(false);
  });
});

describe('NumberSchema', () => {
  it('should validate numbers with no rules applied', () => {
    const v = new Validator();
    const schema = v.number();

    expect(schema.isValid(null)).toBe(true);
  });

  it('should validate required numbers', () => {
    const v = new Validator();
    const schema = v.number().required();

    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid(7)).toBe(true);
  });

  it('should validate positive numbers', () => {
    const v = new Validator();
    const schema = v.number().required().positive();

    expect(schema.isValid(10)).toBe(true);
    expect(schema.isValid(-10)).toBe(false);
  });

  it('should validate numbers within a range', () => {
    const v = new Validator();
    const schema = v.number().range(-5, 5);

    expect(schema.isValid(-3)).toBe(true);
    expect(schema.isValid(5)).toBe(true);
    expect(schema.isValid(-10)).toBe(false);
  });
});

describe('ArraySchema', () => {
  it('should validate arrays with no rules applied', () => {
    const v = new Validator();
    const schema = v.array();

    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid([])).toBe(true);
    expect(schema.isValid(['hexlet'])).toBe(true);
  });

  it('should validate required arrays', () => {
    const v = new Validator();
    const schema = v.array().required();

    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid([])).toBe(true);
    expect(schema.isValid(['hexlet'])).toBe(true);
  });

  it('should validate arrays by size', () => {
    const v = new Validator();
    const schema = v.array().sizeof(2);

    expect(schema.isValid(['hexlet'])).toBe(false);
    expect(schema.isValid(['hexlet', 'code-basics'])).toBe(true);
    expect(schema.isValid(['hexlet', 'code-basics', 'js'])).toBe(false);
  });
});

describe('ObjectSchema', () => {
  it('should validate objects with no rules applied', () => {
    const v = new Validator();
    const schema = v.object();

    expect(schema.isValid(null)).toBe(true);
    expect(schema.isValid({})).toBe(true);
    expect(schema.isValid({ name: 'hexlet' })).toBe(true);
  });

  it('should validate objects with shape rules', () => {
    const v = new Validator();
    const schema = v.object().shape({
      name: v.string().required(),
      age: v.number().positive(),
    });

    expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true);
    expect(schema.isValid({ name: 'maya', age: null })).toBe(true);
    expect(schema.isValid({ name: '', age: null })).toBe(false);
    expect(schema.isValid({ name: 'ada', age: -5 })).toBe(false);
  });

  it('should validate nested objects', () => {
    const v = new Validator();
    const schema = v.object().shape({
      user: v.object().shape({
        name: v.string().required(),
        age: v.number().positive(),
      }),
    });

    expect(schema.isValid({ user: { name: 'kolya', age: 100 } })).toBe(true);
    expect(schema.isValid({ user: { name: '', age: 100 } })).toBe(false);
    expect(schema.isValid({ user: { name: 'kolya', age: -5 } })).toBe(false);
  });
});

describe('Custom Validators', () => {
  it('should validate strings with custom startWith validator', () => {
    const v = new Validator();
    const fn = (value, start) => value.startsWith(start);
    v.addValidator('string', 'startWith', fn);

    const schema = v.string().test('startWith', 'H');
    expect(schema.isValid('exlet')).toBe(false);
    expect(schema.isValid('Hexlet')).toBe(true);
  });

  it('should validate numbers with custom min validator', () => {
    const v = new Validator();
    const fn = (value, min) => value >= min;
    v.addValidator('number', 'min', fn);

    const schema = v.number().test('min', 5);
    expect(schema.isValid(4)).toBe(false);
    expect(schema.isValid(6)).toBe(true);
  });
});
