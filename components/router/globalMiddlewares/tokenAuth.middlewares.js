import config from 'config';

const validateApiKey = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    throw {
      code: 403,
      data: {
        message: 'Token not sent'
      }
    }
  };

  if (Object.values(config.get('apiKeys')).find(key => key === req.headers.authorization)) {
    next();
  } else {
    throw {
      code: 401,
      data: {
        message: 'Malformed or invalid Token'
      }
    }
  }
};



export default {
  validateApiKey,
}
