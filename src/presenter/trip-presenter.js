import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class TripPresenter {
  pointListView = new PointListView();
  POINTS_COUNT = 3;

  constructor({filterContainer, siteMainContainer}) {
    this.filterContainer = filterContainer;
    this.siteMainContainer = siteMainContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.siteMainContainer);
    render(this.pointListView, this.siteMainContainer);
    render(new PointEditView(), this.pointListView.getElement());

    for (let i = 0; i < this.POINTS_COUNT; i++) {
      render(new PointView(), this.pointListView.getElement());
    }
  }
}
