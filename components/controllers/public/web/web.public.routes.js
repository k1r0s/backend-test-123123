// ------------------ imports ------------------
import express from 'express';
import deliveries from './deliveries/deliveries.public.controllers'

// ------------------ init router --------------
const router = express.Router()

// ------------------ endpoints ----------------
router.route('/')
  .get((req, res) => {
    res.json({
        title: 'Welcome to the Public Web Endpoints',
      timestamp: new Date(),
      node_env: process.env.NODE_ENV
    });
  })

router.use('/tracking', deliveries);



// export
module.exports = router
