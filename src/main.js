import { render } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import PointCommonModel from './model/point-common-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api/points-api-service.js';
import PointCommonApiService from './api/point-common-api-service.js';

const AUTHORIZATION = 'Basic tsVaL7Ypbm9c4UVjKcef';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const mainContentElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const siteHeaderElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const pointCommonModel = new PointCommonModel({
  pointCommonApiService: new PointCommonApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: mainContentElement,
  pointsModel,
  pointCommonModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel,
  pointsModel
});
const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
boardPresenter.init();

Promise.all([
  pointsModel.init(),
  pointCommonModel.init()])
  .then(() => {
    render(newPointButtonComponent, siteHeaderElement);
  });
