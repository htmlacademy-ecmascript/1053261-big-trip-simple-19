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

const pointAvaliableOfferIds = (point, pointCommon) => pointCommon.offersByType.find((o) => o.type === point.type).offers;

const calculateTotalPrice = (point, pointCommon) => {
  let price = point.basePrice;
  point.selectedOffers.map((selectedOfferId) => {
    const offer = pointCommon.allOffers.find((o) => o.id === selectedOfferId);
    price += offer.price;
  });
  return price;
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export { sortDate, sortPrice, pointAvaliableOfferIds, calculateTotalPrice, isDatesEqual };
