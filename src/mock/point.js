import { getRandomArrayElement } from '../utils/common';
import { POINT_TYPE } from '../constants/point-type';
import { getRandomOffers } from './offer';

const mockPoints = [
  {
    type: POINT_TYPE.BUS,
    destination: 2,
    start: '2022-01-01 00:00:00',
    end: '2022-01-01 05:00:00',
    price: 10,
    offers: getRandomOffers()
  },
  {
    type: POINT_TYPE.CHECK_IN,
    destination: 1,
    start: '2022-01-01 05:00:00',
    end: '2022-01-02 12:00:00',
    price: 1000,
    offers: getRandomOffers()
  },
  {
    type: POINT_TYPE.DRIVE,
    destination: 3,
    start: '2022-01-02 12:00:00',
    end: '2022-01-02 15:00:00',
    price: 99,
    offers: getRandomOffers()
  },
  {
    type: POINT_TYPE.BUS,
    destination: 4,
    start: '2022-01-02 15:00:00',
    end: '2022-01-03 01:00:00',
    price: 45,
    offers: getRandomOffers()
  },
  {
    type: POINT_TYPE.SIGHTSEEING,
    destination: 1,
    start: '2022-01-02 15:00:00',
    end: '2022-01-03 01:00:00',
    price: 33,
    offers: getRandomOffers()
  },
  {
    type: POINT_TYPE.SHIP,
    destination: 3,
    start: '2022-01-02 15:00:00',
    end: '2022-01-03 01:00:00',
    price: 44,
    offers: getRandomOffers()
  }
];

function getRandomPoint () {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
