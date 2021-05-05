
// ------------------ imports ------------------
import express from 'express';
import { responses } from '@/router/globalMiddlewares/response.middlewares';
import { getValidator } from 'libs/validator/validator';
import deliveriesPublicServices from '@/services/deliveries/public.deliveries.services';
import { handler } from '@/router/globalMiddlewares/fnapply.middlewares';
import validations from '@/controllers/public/web/deliveries/deliveries.public.validations';

// ------------------ init router --------------

const router = express.Router()


// jobs/tracking/:shortId
router.route('/:id')
  .get(
    (req, res, next) => handler(getValidator, req, res, next, validations['mainGet']),
    (req, res, next) => responses(deliveriesPublicServices.getTrackingInfo, req, res, next))


// export
module.exports = router
