
// imports
import Joi from '@hapi/joi'

// export
export default {
  'mainGet': Joi.object({
    "id": Joi.string().alphanum().min(24).max(24),
  }),
}
