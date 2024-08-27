import { BaseSchema } from './BaseSchema.js';

class ObjectSchema extends BaseSchema {
  constructor() {
    super();
    this.shapeSchema = {};
  }

  shape(schema) {
    this.shapeSchema = schema;
    return this;
  }

  test() {
    return this;
  }

  isValid(value) {
    if (typeof value !== 'object' || value === null) {
      return true; // Если объект не определён, возвращаем true
    }

    return Object.entries(this.shapeSchema).every(([key, schema]) => schema.isValid(value[key]));
  }
}

export { ObjectSchema };
export default ObjectSchema;
