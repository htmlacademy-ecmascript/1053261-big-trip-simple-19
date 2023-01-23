import {filter} from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      isEmpty: filterPoints(points).length === 0,
    }),
  );
}

export {generateFilter};
