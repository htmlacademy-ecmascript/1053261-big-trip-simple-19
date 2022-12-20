import { render } from '../render.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import EmptyView from '../view/empty-view';

export default class TripPresenter {
  #pointListView = new PointListView();
  #emptyView = new EmptyView();
  #filterContainer = null;
  #siteMainContainer = null;
  #pointsModel = null;
  #points = [];

  constructor ({ filterContainer, siteMainContainer, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#points = [...this.#pointsModel.points];

    render(new FilterView(), this.#filterContainer);
    if (this.#points.length === 0) {
      render(this.#emptyView, this.#siteMainContainer);
    } else {
      render(new SortView(), this.#siteMainContainer);
      render(this.#pointListView, this.#siteMainContainer);

      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    }
  }

  #renderPoint (point) {
    const pointComponent = new PointView({ point });
    const pointEditComponent = new PointEditView({ point });

    const replaceCardToForm = () => {
      this.#pointListView.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#pointListView.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointListView.element);
  }
}
