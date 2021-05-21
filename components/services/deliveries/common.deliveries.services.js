import Deliveries from '@/models/Deliveries.model';

const cursorInterface = (cursorInstance, predicate, found) => new Promise(resolve => {
  let amount = 0;
  cursorInstance.on('data', (document => {
    if(predicate(document)) found(document, amount++);
  }));
  cursorInstance.on('end', () => resolve(amount));
})

const deliveryLookup = async (req) => {
  let { dateFrom, dateTo, weight } = req.body;

  let limit = req.body.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = req.body.page ? ((Math.max(0, parseInt(req.body.page)) - 1) * limit) : 0;
  let sort = { _id: 1 }

  const query = Deliveries
    .where('when')
    .gte(dateFrom)
    .lte(dateTo)
    .sort(sort)
    .populate('products')

  let deliveries = [];
  // this solution seems to be veeery slow :\
  const totalResults = await cursorInterface(
    query.cursor(),
    (document) => document.products.some(prod => prod.weight >= weight),
    (document, indx) => {
      // raw pagination.. it must be improved
      return indx >= skip && deliveries.length < limit && deliveries.push(document);
    }
  );

  return {
    totalResults,
    deliveries
  }
}

const find = async (req) => {
  // some vars
  let query = {};
  let limit = req.body.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = req.body.page ? ((Math.max(0, parseInt(req.body.page)) - 1) * limit) : 0;
  let sort = { _id: 1 }

  // if date provided, filter by date
  if (req.body.when) {
    query['when'] = {
      '$gte': req.body.when
    }
  };

  let totalResults = await Deliveries.find(query).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any delivery`
      }
    }
  }

  let deliveries = await Deliveries.find(query).skip(skip).sort(sort).limit(limit);

  return {
    totalResults: totalResults,
    deliveries
  }
}

const create = async (req) => {
  try {
    await Deliveries.create(req.body);
  } catch (e) {
    throw {
      code: 400,
      data: {
        message: `An error has occurred trying to create the delivery:
          ${JSON.stringify(e, null, 2)}`
      }
    }
  }
}

const findOne = async (req) => {
  let delivery = await Deliveries.findOne({_id: req.body.id});
  if (!delivery) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find a delivery with the sent ID`
      }
    }
  }
  return delivery;
}

export default {
  find,
  deliveryLookup,
  create,
  findOne
}
