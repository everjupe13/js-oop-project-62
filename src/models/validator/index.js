import { StringSchema } from '../shemas/string-schema/index.js';
import { NumberSchema } from '../shemas/number-schema/index.js';
import { ArraySchema } from '../shemas/array-schema/index.js';
import { ObjectSchema } from '../shemas/object-schema/index.js';

class Validator {
  constructor() {
    this.validators = {
      string: {},
      number: {},
      array: {},
      object: {},
    };
  }

  string() {
    const schema = new StringSchema();
    schema.customValidators = this.validators.string;
    return schema;
  }

  number() {
    const schema = new NumberSchema();
    schema.customValidators = this.validators.number;
    return schema;
  }

  array() {
    const schema = new ArraySchema();
    schema.customValidators = this.validators.array;
    return schema;
  }

  object() {
    const schema = new ObjectSchema();
    schema.customValidators = this.validators.object;
    return schema;
  }

  addValidator(type, name, fn) {
    if (!this.validators[type]) {
      throw new Error(`Unknown type: ${type}`);
    }
    this.validators[type][name] = fn;
  }
}

export default Validator;
export { Validator };
