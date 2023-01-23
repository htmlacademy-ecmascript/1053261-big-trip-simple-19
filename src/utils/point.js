import dayjs from 'dayjs';

function getWeightForNullParam (a, b) {
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

function sortDate (pointA, pointB) {
  const weight = getWeightForNullParam(pointA.start, pointB.start);

  return weight ?? dayjs(pointA.start).diff(dayjs(pointB.start));
}

function sortPrice (pointA, pointB) {
  const weight = getWeightForNullParam(pointA.price, pointB.price);

  return weight ?? pointB.price - pointA.price;
}

export { sortDate, sortPrice };
