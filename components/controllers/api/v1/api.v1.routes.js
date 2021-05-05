// ------------------ imports ------------------
import express from 'express';
import deliveries from './deliveries/deliveries.api.v1.controllers';
import products from './products/products.api.v1.controllers';
// ------------------ init router --------------
const router = express.Router()

// ------------------ endpoints ----------------
router.route('/')
  .get((req, res) => {
    res.json({
      title: 'Welcome to Public API v-1.0',
      timestamp: new Date(),
      node_env: process.env.NODE_ENV
    });
  })

router.use('/deliveries', deliveries);
router.use('/products', products);

// export
module.exports = router
