import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyView from '../view/empty-view';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #pointListView = new PointListView();
  #emptyView = new EmptyView();
  #filterContainer = null;
  #siteMainContainer = null;
  #pointsModel = null;
  #points = [];
  #pointPresenters = [];

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
    } else {
      this.#renderSortView();
      this.#renderPointListView();

      for (let i = 0; i < this.#points.length; i++) {
        const pointPresenter = new PointPresenter({
          pointListView: this.#pointListView,
          beforeEditCallback: this.#resetPoints
        });
        pointPresenter.init(this.#points[i]);
        this.#pointPresenters.push(pointPresenter);
      }
    }
  }

  #resetPoints = () => {
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.reset());
  };

  #renderFilter (points) {
    render(new FilterView({ points: points }), this.#filterContainer);
  }

  #renderEmptyView () {
    render(this.#emptyView, this.#siteMainContainer);
  }

  #renderSortView () {
    render(new SortView(), this.#siteMainContainer);
  }

  #renderPointListView () {
    render(this.#pointListView, this.#siteMainContainer);
  }
}
