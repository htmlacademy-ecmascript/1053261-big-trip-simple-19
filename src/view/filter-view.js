import AbstractView from '../framework/view/abstract-view';
import { FILTER_VALUE, DEFAULT_FILTER_VALUE } from '../constants/filter';

function createFilterTemplate (points) {
  const filterItems = Object.values(FILTER_VALUE).map((filterValue) => {
    const checked = filterValue === DEFAULT_FILTER_VALUE ? 'checked' : '';
    const disabled = !points.length && !checked ? 'disabled' : '';

    return `<div class="trip-filters__filter">
      <input id="filter-${filterValue}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterValue}" ${checked} ${disabled}>
      <label class="trip-filters__filter-label" for="filter-${filterValue}">${filterValue}</label>
    </div>`;
  }).join('');

  return (
    `<div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filterItems}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>`
  );
}

export default class FilterView extends AbstractView {
  #points;

  constructor({ points }) {
    super();
    this.#points = points;
  }

  get template () {
    return createFilterTemplate(this.#points);
  }
}
