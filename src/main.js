import TripPresenter from './presenter/trip-presenter.js';

const siteFilterElement = document.querySelector('.trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({
  filterContainer: siteFilterElement,
  siteMainContainer: siteMainElement
});

tripPresenter.init();
