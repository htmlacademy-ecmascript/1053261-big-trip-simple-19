import AbstractView from '../framework/view/abstract-view.js';

function createNoPointMessageTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NoPointView extends AbstractView {

  get template() {
    return createNoPointMessageTemplate();
  }
}
