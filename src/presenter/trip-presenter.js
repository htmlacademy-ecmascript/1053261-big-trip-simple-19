import { render } from '../render.js';
import FilterView from '../view/filter-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class TripPresenter {
  pointListView = new PointListView();

  constructor ({ filterContainer, siteMainContainer, pointsModel }) {
    this.filterContainer = filterContainer;
    this.siteMainContainer = siteMainContainer;
    this.siteMainContainer = siteMainContainer;
    this.pointsModel = pointsModel;
  }

  init () {
    this.points = [...this.pointsModel.getPoints()];

    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.siteMainContainer);
    render(this.pointListView, this.siteMainContainer);
    render(new PointEditView({ point: this.points[0] }), this.pointListView.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView({ point: this.points[i] }), this.pointListView.getElement());
    }
  }
}
