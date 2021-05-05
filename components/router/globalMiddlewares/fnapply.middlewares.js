let handler = async (...args) => {
  try {
    // default vars
    let fn = args.shift()

    // execute the function
    await fn.apply(this, args)

    // call next function
    args[2]()
  } catch (e) {
    // set vars
    let code = e.code || 500
    let status = e.status || 'Error'
    let data = e.data || JSON.stringify(e, Object.getOwnPropertyNames(e))

    // send it to error handler
    args[2]({
      code,
      status,
      data
    })
  }
}

export {
  handler
};

