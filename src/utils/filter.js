import { FilterType } from '../const.js';
import { isFuturePoint } from './common.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateFrom)),
};

export { filter };
