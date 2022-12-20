import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model';

const siteFilterElement = document.querySelector('.trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({
  filterContainer: siteFilterElement,
  siteMainContainer: siteMainElement,
  pointsModel
});

tripPresenter.init();
