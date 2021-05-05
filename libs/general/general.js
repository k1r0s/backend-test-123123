
// exportable methods
const addPropertiesToObject = (object, properties) => {
  // iterate over every property
  for (let key in properties) {
    // add property to object
    object[key] = properties[key]
  }

  // return modified object
  return object
}
const getValueOrNull = (value, path) => {
  try {
    // check that the value has a value
    if (!value) {
      return null
    }

    // default vars
    let pieces = path.split("."), piece

    // iterate over every piece
    for (piece of pieces) {
      // try to get the value of the corresponding level
      if (!value[piece]) {
        return null
      }

      value = value[piece]
    }

    return value
  } catch (e) {
    throw `Path: ${path}, value ${value}`;
  }

}

// exports
export default {
  addPropertiesToObject,
  getValueOrNull
}
