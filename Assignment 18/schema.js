import Joi from 'joi';

export const profileSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(13).max(120).required(),
  bio: Joi.string().max(300).optional()
});
