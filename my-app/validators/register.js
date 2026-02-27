const Validator = require("fastest-validator");
const v = new Validator({
  useNewCustomCheckerFunction: true,
});

const schema = {
  firstName: {
    type: "string",
    min: 3,
    max: 50,
    trim: true,
    pattern: /^[آ-یa-zA-Z\s]+$/,
  },

  lastName: {
    type: "string",
    min: 3,
    max: 50,
    trim: true,
    pattern: /^[آ-یa-zA-Z\s]+$/,
  },

  fatherName: {
    type: "string",
    min: 3,
    max: 50,
    trim: true,
    optional: true,
    pattern: /^[آ-یa-zA-Z\s]+$/,
  },

  username: {
    type: "string",
    min: 3,
    max: 30,
    trim: true,
    lowercase: true,
    pattern: /^[a-z0-9_]+$/,
  },

  password: {
    type: "string",
    min: 8,
    max: 50,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  },

  confirmPassword: {
    type: "equal",
    field: "password",
  },

  phone: {
    type: "string",
    pattern: /^(\+98|0)?9\d{9}$/,
    optional: true,
  },

  address: {
    type: "string",
    min: 5,
    max: 300,
    trim: true,
    optional: true,
  },

  idCard: {
    type: "string",
    pattern: /^\d{10}$/,
    optional: true,
  },

  educationLevel: {
    type: "enum",
    values: ["دیپلم", "کاردانی", "کارشناسی", "کارشناسی ارشد", "دکتری"],
  },

  fieldOfStudy: {
    type: "string",
    min: 3,
    max: 100,
    trim: true,
  },

  $$strict: "remove",
};

const check = v.compile(schema);

module.exports = check;
