const validator = require("fastest-validator");

const v = new validator();

const schema = {
  firstName: { type: "string", min: 3, max: 255 },
  lastName: { type: "string", min: 3, max: 255 },
  fatherName: { type: "string", min: 3, max: 255, optional: true },
  username: { type: "string", min: 3, max: 100 },
  password: { type: "string", min: 8, max: 24 },
  confirmPassword: { type: "equal", field: "password" },

  phone: {
    type: "string",
    pattern: /^(\+98|0)?9\d{9}$/,
    optional: true,
  },
  address: { type: "string", min: 5, max: 500, optional: true },
  idCard: {
    type: "string",
    pattern: /^\d{10}$/,
    optional: true,
  },

  educationLevel: {
    type: "enum",
    values: ["دیپلم", "کاردانی", "کارشناسی", "کارشناسی ارشد", "دکتری"],
  },

  fieldOfStudy: { type: "string", min: 3, max: 255 },

  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
