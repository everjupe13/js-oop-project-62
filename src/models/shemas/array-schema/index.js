import { BaseSchema } from '../base-schema/index.js';

class ArraySchema extends BaseSchema {
  required() {
    super.createRule(
      'required',
      (value) => Array.isArray(value),
    );

    return this;
  }

  sizeof(length) {
    super.createRule(
      'sizeof',
      (value) => Array.isArray(value) && value.length === length,
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

export default ArraySchema;
export { ArraySchema };
