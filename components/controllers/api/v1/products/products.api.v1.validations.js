import Joi from '@hapi/joi';
// export
export default {
  'mainGet': Joi.object({
    "page": Joi.number()
      .optional(),
    "limit": Joi.number()
      .optional(),
  })
}
