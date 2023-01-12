import {render} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import EmptyView from '../view/empty-view';

export default class PointPresenter {
  #point;
  #pointListView;
  #replaceFormToCard;
  #replaceCardToForm;
  #escKeyDownHandler;
  #pointComponent;
  #pointEditComponent;
  #beforeEditCallback;
  #isFormOpened;

  constructor ({pointListView, beforeEditCallback}) {
    this.#pointListView = pointListView;
    this.#beforeEditCallback = beforeEditCallback;
  }

  init (point) {
    this.#point = point;
    this.#isFormOpened = false;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: this.#handleEditClick
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose
    });

    this.#replaceCardToForm = () => {
      this.#pointListView.element.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
    };

    this.#replaceFormToCard = () => {
      this.#pointListView.element.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
    };

    this.#escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    };

    render(this.#pointComponent, this.#pointListView.element);
  }

  #handleFormSubmit = () => {
    this.#isFormOpened = false;
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditClick = () => {
    this.#beforeEditCallback();
    this.#replaceCardToForm();
    this.#isFormOpened = true;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    if (this.#isFormOpened) {
      this.#replaceFormToCard();
      this.#isFormOpened = false;
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  reset = () => {
    this.#handleFormClose();
  };
}
