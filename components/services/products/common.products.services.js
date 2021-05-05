import Products from '@/models/Products.model';

const find = async (req) => {
  // some vars
  let limit = req.body.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = req.body.page ? ((Math.max(0, parseInt(req.body.page)) - 1) * limit) : 0;
  let sort = { _id: 1 }

  let totalResults = await Products.find({}).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any product`
      }
    }
  }

  let products = await Products.find({}).skip(skip).sort(sort).limit(limit);

  return {
    totalResults: totalResults,
    products
  }
}

export default {
  find
}
