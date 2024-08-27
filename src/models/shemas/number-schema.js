import { BaseSchema } from './base-schema.js';

class NumberSchema extends BaseSchema {
  required() {
    super.createRule(
      'required',
      (value) => typeof value === 'number',
    );

    return this;
  }

  positive() {
    super.createRule(
      'positive',
      (value) => value === null || value === undefined || value > 0,
    );

    return this;
  }

  range(min, max) {
    super.createRule(
      'range',
      (value) => value === null || value === undefined || (value >= min && value <= max),
    );

    return this;
  }

  test(validatorName, ...args) {
    if (this.customValidators && this.customValidators[validatorName]) {
      super.createRule(
        validatorName,
        (value) => this.customValidators[validatorName](value, ...args),
      );
    }

    return this;
  }
}

export default NumberSchema;
export { NumberSchema };
