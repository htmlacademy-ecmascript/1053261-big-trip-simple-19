import { POINT_TYPE } from './point-type';
import dayjs from 'dayjs';

export const BLANK_POINT = {
  type: POINT_TYPE.FLIGHT,
  destination: 1,
  start: dayjs(),
  end: dayjs(),
  price: 0,
  offers: [1]
};
