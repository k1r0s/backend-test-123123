// ------------------ imports ------------------

import express from 'express';
import { handler } from '@/router/globalMiddlewares/fnapply.middlewares';
import { responses } from '@/router/globalMiddlewares/response.middlewares';
import { getValidator, validator } from 'libs/validator/validator';
import validations from './deliveries.api.v1.validations';
import deliveriesCommonServices from '@/services/deliveries/common.deliveries.services';


// ------------------ init router --------------

const router = express.Router()

// ------------------ endpoints ----------------

// CRUD requests
// deliveries
router.route('/')
  .get(
    (req, res, next) => handler(getValidator, req, res, next, validations['mainGet']),
    (req, res, next) => responses(deliveriesCommonServices.find, req, res, next))
  .post(
    (req, res, next) => handler(validator, req, res, next, validations['mainPost']),
    (req, res, next) => responses(deliveriesCommonServices.create, req, res, next))

router.route('/:id')
  .get(
    (req, res, next) => handler(getValidator, req, res, next, validations['getOne']),
    (req, res, next) => responses(deliveriesCommonServices.findOne, req, res, next))


// export
module.exports = router
