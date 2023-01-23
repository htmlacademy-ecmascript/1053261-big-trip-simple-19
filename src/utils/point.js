import dayjs from 'dayjs';

function getWeightForNullParam(a, b) {
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
}

function sortDate(pointA, pointB) {
  const weight = getWeightForNullParam(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPrice(pointA, pointB) {
  const weight = getWeightForNullParam(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
}

function pointAvaliableOfferIds(point) {
  return point.offersByType.find((o) => o.type === point.type).offers;
}

function calculateTotalPrice(point) {
  let price = point.basePrice;
  point.selectedOffers.map((selectedOfferId) => {
    const offer = point.allOffers.find((o) => o.id === selectedOfferId);
    price += offer.price;
  });
  return price;
}

export { sortDate, sortPrice, pointAvaliableOfferIds, calculateTotalPrice };
