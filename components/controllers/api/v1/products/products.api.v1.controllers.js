
// ------------------ imports ------------------
import express from 'express';
import { responses } from '@/router/globalMiddlewares/response.middlewares';
import { handler } from '@/router/globalMiddlewares/fnapply.middlewares';
import { getValidator } from 'libs/validator/validator';
import validations from '@/controllers/api/v1/products/products.api.v1.validations';
import productsCommonServices from '@/services/products/common.products.services';

// ------------------ init router --------------

const router = express.Router()


// jobs/tracking/:shortId
router.route('/')
  .get(
  (req, res, next) => handler(getValidator, req, res, next, validations['mainGet']),
  (req, res, next) => responses(productsCommonServices.find, req, res, next))


// export
module.exports = router
