import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().required(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal'),
  userId: Joi.string().required(), 
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string(),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal'),
});
