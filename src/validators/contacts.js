import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(6).max(16).required(),
  email: Joi.string(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal'),
});
