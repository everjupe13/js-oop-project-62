import { BaseSchema } from './base-schema.js';

class StringSchema extends BaseSchema {
  required() {
    super.createRule(
      'required',
      (value) => typeof value === 'string' && value.length > 0,
    );

    return this;
  }

  minLength(length) {
    super.createRule(
      'minLength',
      (value) => value === null || value === undefined || value.length >= length,
    );

    return this;
  }

  contains(substring) {
    super.createRule(
      'contains',
      (value) => value === null || value === undefined || value.includes(substring),
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

export default StringSchema;
export { StringSchema as StringSchemaClass };
