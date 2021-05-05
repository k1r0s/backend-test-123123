
// imports
import tools from 'libs/general/general'

// exportable methods
const coreValidator = (body, schema) => {
  // validate the schema
  const validationResult = schema.validate(body)

  // check if there are any errors
  if (validationResult.error) {
    throw ({
      code: 400,
      data: {
        message: validationResult.error.message
      },
    })
  }
}
const validator = (req, res, next, schema) => {
  // add params to body
  req.body = tools.addPropertiesToObject(req.body, req.params)

  // add query to body
  req.body = tools.addPropertiesToObject(req.body, req.query)

  // call the core validator
  return coreValidator(req.body, schema)
}
const getValidator = (req, res, next, schema) => {
  // change default vars
  req.body = {
    ...req.query,
    ...req.body,
  }

  // call regular validator
  validator(req, res, next, schema)
}
const validateValue = (val) => {
  if(val === undefined || val === '' || val === null) return '';
  return val
};

// exports
export {
  validator,
  getValidator,
  validateValue,
  coreValidator,
}
