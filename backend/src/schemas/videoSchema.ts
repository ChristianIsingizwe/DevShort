import Joi from 'joi';

export const videoUploadSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }).custom((value: string) => Number(value)),
  
  title: Joi.string().min(3).max(255).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 character long',
    'string.max': 'Title cannot exceed 255 characters',
    'any.required': 'Title is required'
  }),
  
  description: Joi.string().max(1000).allow('', null).optional().messages({
    'string.max': 'Description cannot exceed 1000 characters'
  }),
  duration: Joi.number().allow('', null).optional()
});

export type VideoUploadPayload = {
  userId: number;
  title: string;
  description?: string;
  duration?: number;
}; 