const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    password2: Joi.string().required(),
    avatar: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    identifier: Joi.string().min(4).required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
