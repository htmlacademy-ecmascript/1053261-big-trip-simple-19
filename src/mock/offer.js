import { getRandomArrayElement } from '../utils/common';

const offers = [
  'Upgrade to business',
  'Upgrade to comfort',
  'Upgrade to first class',
  'Travel with kids',
  'Travel with pets',
  'Luxury',
];

const mockOffers = [
  {
    id: 1,
    title: getRandomArrayElement(offers),
    price: 100
  },
  {
    id: 2,
    title: getRandomArrayElement(offers),
    price: 200
  },
  {
    id: 3,
    title: getRandomArrayElement(offers),
    price: 300
  },
  {
    id: 4,
    title: getRandomArrayElement(offers),
    price: 400
  },
  {
    id: 5,
    title: getRandomArrayElement(offers),
    price: 500
  }
];

function getRandomOffer() {
  return getRandomArrayElement(mockOffers);
}

function getRandomOffers () {
  const offerCount = Math.floor(Math.random() * 5);

  return Array.from({ length: offerCount }, getRandomOffer).map((offer) => offer.id);
}

export { getRandomOffers, mockOffers };
