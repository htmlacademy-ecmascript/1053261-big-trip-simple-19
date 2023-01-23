import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyView from '../view/empty-view';
import PointPresenter from './point-presenter';
import { SORT_TYPE } from '../constants/sort';
import { sortDate, sortPrice } from '../utils/point';

export default class TripPresenter {
  #pointListView = new PointListView();
  #emptyView = new EmptyView();
  #filterContainer = null;
  #siteMainContainer = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = [];
  #sortComponent = null;
  #currentSortType = SORT_TYPE.DAY;

  constructor ({ filterContainer, siteMainContainer, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#points = [...this.#pointsModel.points];

    this.#renderFilter(this.#points);
    if (this.#points.length === 0) {
      this.#renderEmptyView();
      return;
    }

    this.#sortPoints(this.#currentSortType);
    this.#renderSortView();
    this.#renderPointListView();
  }

  #resetPoints = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.reset());
  };

  #clearPointListView = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresenters = [];
  };

  #sortPoints (sortType) {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#points.sort(sortDate);
        break;
      case SORT_TYPE.PRICE:
        this.#points.sort(sortPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointListView();
    this.#renderPointListView();
  };

  #renderFilter (points) {
    render(new FilterView({ points: points }), this.#filterContainer);
  }

  #renderEmptyView () {
    render(this.#emptyView, this.#siteMainContainer);
  }

  #renderSortView () {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#siteMainContainer);
  }

  #renderPointListView () {
    for (let i = 0; i < this.#points.length; i++) {
      const pointPresenter = new PointPresenter({
        pointListView: this.#pointListView,
        beforeEditCallback: this.#resetPoints
      });
      pointPresenter.init(this.#points[i]);
      this.#pointPresenters.push(pointPresenter);
    }

    render(this.#pointListView, this.#siteMainContainer);
  }
}
