let responses = async (...args) => {
  let code, data
  let fn = args.shift()

  try {
    data = await fn.apply(this, args);

    // build response
    code = (data && data.code) ? data.code : 200
    // send it over res
    args[1].status(code).json({ data });
  } catch (e) {
    // send it over next to error handler
    args[2](e);
  }
}

export {
  responses,
}
