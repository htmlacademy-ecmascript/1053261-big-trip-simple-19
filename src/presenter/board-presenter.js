import { render, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorLoadingView from '../view/error-loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortDate, sortPrice, calculateTotalPrice } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #pointCommonModel = null;
  #filterModel = null;

  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #ErrorLoadingView = new ErrorLoadingView();
  #sortComponent = null;
  #noPointComponent = null;

  #pointCommon = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isPointLoading = true;
  #isPointCommonLoading = true;
  #isErrorLoading = false;
  #onNewPointDestroy = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ boardContainer, pointsModel, pointCommonModel, filterModel, onNewPointDestroy }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#pointCommonModel = pointCommonModel;
    this.#pointCommon = this.#pointCommonModel.pointCommon;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#pointCommonModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        filteredPoints.sort(sortDate);
        break;
      case SortType.PRICE:
        filteredPoints.forEach((point) => {
          point.totalPrice = calculateTotalPrice(point, this.#pointCommon);
        });
        filteredPoints.sort(sortPrice);
        filteredPoints.forEach((point) => delete point.totalPrice);
        break;
    }

    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #createNewPointPresenter() {
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      pointCommon: this.#pointCommon,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointDestroy,
    });
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT_POINT:
        this.#isPointLoading = false;
        break;
      case UpdateType.INIT_POINT_COMMON:
        this.#pointCommon = this.#pointCommonModel.pointCommon;
        this.#isPointCommonLoading = false;
        break;
      case UpdateType.ERROR_LOADING:
        this.#isErrorLoading = true;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
    if ((updateType === UpdateType.INIT_POINT ||
      updateType === UpdateType.INIT_POINT_COMMON) &&
      (!this.#isPointLoading && !this.#isPointCommonLoading)) {
      this.#createNewPointPresenter();
      remove(this.#loadingComponent);
      this.#renderBoard();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #renderErrorLoading() {
    render(this.#ErrorLoadingView, this.#boardContainer);
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      pointCommon: this.#pointCommon,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    if (this.#isErrorLoading) {
      this.#renderErrorLoading();
      return;
    }

    if (this.#isPointLoading || this.#isPointCommonLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderPoints(points);
  }
}
