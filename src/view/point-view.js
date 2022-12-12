import { createElement } from '../render.js';
import { formatDateForDisplay, formatDateTimeForHtmlAttribute, formatTimeForDisplay } from '../utils';
import { POINT_TYPE_NAME } from '../constants/point-name';
import { mockDestinations } from '../mock/destination';
import { mockOffers } from '../mock/offer';
import { getPointTypeIconUrl } from '../constants/point-type-icons';

function offerTemplate (point) {
  if (point.offers.length === 0) {
    return '<li class="event__offer">No additional offers</li>';
  }
  return point.offers.map((pointOfferId) => {
    const offer = mockOffers.filter((el) => el.id === pointOfferId)[0];
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
  `);
  }).join('');
}

function pointTemplate (point) {
  const destination = mockDestinations.filter((el) => el.id === point.destination)[0];
  const title = POINT_TYPE_NAME[point.type] + ' ' + destination.title;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDateTimeForHtmlAttribute(point.start)}">${formatDateForDisplay(point.start)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${getPointTypeIconUrl(point.type)}" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDateTimeForHtmlAttribute(point.start)}">${formatTimeForDisplay(point.start)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDateTimeForHtmlAttribute(point.end)}">${formatTimeForDisplay(point.end)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerTemplate(point)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView {
  constructor ({ point }) {
    this.point = point;
  }

  getTemplate () {
    return pointTemplate(this.point);
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
