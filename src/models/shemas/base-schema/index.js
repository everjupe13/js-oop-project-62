class BaseSchema {
  constructor() {
    this.rules = [];
  }

  createRule(ruleName, validator) {
    this.rules = this.rules.filter((rule) => rule.name !== ruleName);

    const rule = {
      validate: validator,
      name: ruleName,
    };

    this.rules.push(rule);
  }

  isValid(value) {
    return this.rules.every((rule) => rule.validate(value));
  }
}

export default BaseSchema;
export { BaseSchema };
