import { POINT_TYPE } from './point-type';

const POINT_TYPE_ICONS = {
  [POINT_TYPE.BUS]: 'bus.png',
  [POINT_TYPE.TAXI]: 'taxi.png',
  [POINT_TYPE.TRAIN]: 'train.png',
  [POINT_TYPE.SHIP]: 'ship.png',
  [POINT_TYPE.DRIVE]: 'drive.png',
  [POINT_TYPE.FLIGHT]: 'flight.png',
  [POINT_TYPE.CHECK_IN]: 'check-in.png',
  [POINT_TYPE.SIGHTSEEING]: 'sightseeing.png',
  [POINT_TYPE.RESTAURANT]: 'restaurant.png',
};

export const getPointTypeIconUrl = (pointType) => {
  if (POINT_TYPE_ICONS[pointType]) {
    return `img/icons/${POINT_TYPE_ICONS[pointType]}`;
  }
  return 'img/icons/sightseeing.png';
};
