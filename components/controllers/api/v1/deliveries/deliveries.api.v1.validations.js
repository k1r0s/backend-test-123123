
// imports
import Joi from '@hapi/joi'

// export
export default {
  'mainGet': Joi.object({
    "when": Joi.string().isoDate().optional(),
    "page": Joi.number().optional(),
    "limit": Joi.number().optional(),
  }),
  'mainPost': Joi.object({
    "when": Joi.string().isoDate().required(),
    "origin": Joi.object({
      "street": Joi.string().max(150).required().trim(),
      "number": Joi.string().max(10).required().trim(),
      "city": Joi.string().max(50).required().trim(),
      "postalCode": Joi.string().max(10).required().trim(),
    }).required(),
    "destination": Joi.object({
      "street": Joi.string().max(150).required().trim(),
      "number": Joi.string().max(10).required().trim(),
      "city": Joi.string().max(50).required().trim(),
      "postalCode": Joi.string().max(10).required().trim(),
    }).required(),
    "products": Joi.array()
      .items(Joi.string().alphanum().min(24).max(24).required().trim())
      .min(1).required(),
  }),
  'getOne': Joi.object({
    "id": Joi.string().alphanum().min(24).max(24),
  }),
}
