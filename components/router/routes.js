// ------------------ components imports ------------------
import apiV1 from '../controllers/api/v1/api.v1.routes';
import publicWeb from '../controllers/public/web/web.public.routes';

// ------------------ routes definition ------------------

const unSecuredRoutes = (app) => {
  // public routes
  app.use('/public/web/', publicWeb);

  // catch 404 and forward to error handler
  app.all('/*', (req, res, next) => {
    if (req.url === '/') {
      // base backend route
      res.json({
        title: 'Welcome to API v-1',
        timestamp: new Date(),
        node_env: process.env.NODE_ENV
      });
    } else {
      next({
        status: 'Not Found',
        code: 404,
        data: {
          message: "The HTTP request sent does not exist in our API"
        }
      })
    }
  });
};

const defaultErrorHandler = (app) => {
  // Global error Handler Middleware => Has to be at the end of all routes
  app.use(async (err, req, res, next) => {
    console.log('ERROR', err);
    // handle custom errors only after headers had being sent to client
    if (res.headersSent) {
      // headers were already sent => do nothing
      return;
    }
    let code, status, data;
    if (err.name === 'MongoError') {
      code = 417;
      err.data = err.message;
    } else {
      // set vars
      code = err.code || 417;
    }
    // production environment
    data = err.data || JSON.stringify(err, Object.getOwnPropertyNames(err));

    // save log
    // send response to client
    res.status(code).json(data);
  });

}

const securedRoutes = (app) => {
  // new routes
  app.use(`/api/v1/`, apiV1);
};

const mountRoutes = (app) => {
  securedRoutes(app);
  unSecuredRoutes(app);
  defaultErrorHandler(app);

};

export default { mountRoutes };
