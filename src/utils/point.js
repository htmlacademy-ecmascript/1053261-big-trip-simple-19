import dayjs from 'dayjs';

const getWeightForNullParam = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
};

const sortDate = (pointA, pointB) => {
  const weight = getWeightForNullParam(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPrice = (pointA, pointB) => {
  const weight = getWeightForNullParam(pointA.totalPrice, pointB.totalPrice);

  return weight ?? pointB.totalPrice - pointA.totalPrice;
};

const getOffersByType = (point, pointCommon) => pointCommon.allOffers.find((offerTypes) => offerTypes.type === point.type).offers;

const calculateTotalPrice = (point, pointCommon) => {
  let price = point.basePrice;
  const offersByType = getOffersByType(point, pointCommon);
  point.selectedOffers.map((selectedOfferId) => {
    const offerPrice = offersByType.find((offer) => offer.id === selectedOfferId).price;
    price += offerPrice;
  });
  return price;
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export { sortDate, sortPrice, getOffersByType, calculateTotalPrice, isDatesEqual };
