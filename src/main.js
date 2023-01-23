import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: mainContentElement,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FilterView({ filters }), filterContainerElement);
boardPresenter.init();
