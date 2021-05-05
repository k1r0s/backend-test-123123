import Products from '@/models/Products.model';
import Deliveries from '@/models/Deliveries.model';
import faker from 'faker';

const productsQuantity = 2000;
const deliveriesQuantity = 100000;

const buildProducts = async () => {
  let total = await Products.countDocuments();
  if (total > productsQuantity) {
    console.log('fake Products data ready');
    return;
  }

  let data = [];
  for (let i = 0; i < productsQuantity; i++) {
    let fakeData = {
      reference: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      weight: faker.datatype.number(),
      height: faker.datatype.number(),
    };
    data.push(Products.create(fakeData))
  };

  await Promise.all(data);
}

const buildDeliveries = async () => {
  let total = await Deliveries.countDocuments();
  if (total > deliveriesQuantity) {
    console.log('fake Deliveries data ready');
    return;
  }
  let data = [];
  for (let i = 0; i < deliveriesQuantity; i++) {
    let random = faker.datatype.number();
    let productsFromDb = await Products.find().limit(random > 6 ? 6 : random);

    let products = [];
    for (let product of productsFromDb) {
      products.push(product._id);
    }
    let fakeData = {
      when: faker.date.soon(),
      origin: {
        street: faker.address.streetName(),
        number: faker.datatype.number(),
        postalCode: faker.address.zipCode(),
        city: faker.address.city(),
      },
      destination: {
        street: faker.address.streetName(),
        number: faker.datatype.number(),
        postalCode: faker.address.zipCode(),
        city: faker.address.city(),
      },
      products,
    };

    data.push(Deliveries.create(fakeData))
  };

  await Promise.all(data);
}

export default {
  buildProducts,
  buildDeliveries
}
