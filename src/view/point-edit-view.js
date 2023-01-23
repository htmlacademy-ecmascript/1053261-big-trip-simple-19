import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const.js';
import dayjs from 'dayjs';
import { capitalizeFirstLetter } from '../utils/common.js';
import { pointAvaliableOfferIds } from '../utils/point.js';
import { calculateTotalPrice } from '../utils/point.js';

const BLANK_POINT = {
  basePrice: null,
  dateFrom: new Date('2022-01-01T00:00'),
  dateTo: new Date('2022-01-01T00:00'),
  offers: [],
  type: POINT_TYPES[0],
};

function createPointEditEventTypeItemsTemplate() {
  return POINT_TYPES.map((pointType, i) => `
    <div class="event__type-item">
      <input id="event-type-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${i}">${capitalizeFirstLetter(pointType)}</label>
    </div>
    `)
    .join('');
}

function createPointEditOffersDestinationTemplate(point, destination) {
  const avaliableOfferIds = pointAvaliableOfferIds(point);
  if (avaliableOfferIds.length === 0 && destination.name === '') {
    return '';
  }
  return (`
    <section class="event__details">
    ${(avaliableOfferIds.length > 0) ? `${createPointEditOffersTemplate(point)}` : ''}
    ${(destination.name !== '') ? `${createPointEditDestinationTemplate(destination)}` : ''}
    </section>
`);
}

function createPointEditOffersTemplate(point) {
  const offersMarkup = pointAvaliableOfferIds(point).map((pointAvaliableOfferId, i) => {
    const offer = point.allOffers.find((o) => o.id === pointAvaliableOfferId);
    const checked = point.selectedOffers.includes(offer.id) ? 'checked' : '';
    const eventInputName = `event-offer-${offer.title.toLowerCase().replaceAll(' ', '-')}`;
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="${eventInputName}" data-offer-id="${offer.id}" ${checked}>
        <label class="event__offer-label" for="event-offer-${i}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  }).join('');

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>
  `);
}

function createPointEditDestinationTemplate(destination) {
  const photosTape = destination.pictures.length === 0 ? '' : `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`)}
      </div>
    </div>
  `;
  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${photosTape}
    </section>
  `);
}

function createPointEditTemplate(point) {
  const isNewPoint = !('id' in point);
  if (isNewPoint) {
    point = { ...point, ...BLANK_POINT };
  }
  const { basePrice, dateFrom, dateTo, type } = point;
  const destination = isNewPoint ? { name: '' } : point.allDestinations.find((dest) => dest.id === point.destination);
  const destinationDataList = point.allDestinations.map((dest) => `<option value="${dest.name}">`).join('');

  return (
    `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createPointEditEventTypeItemsTemplate(point)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${point.id}">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${point.id}">
            <datalist id="destination-list-${point.id}">
              ${destinationDataList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${point.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice !== null ? basePrice : ''}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${isNewPoint ? `
          <button class="event__reset-btn" type="reset">Cancel</button>
          ` : `
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
          `}
        </header>
        ${createPointEditOffersDestinationTemplate(point, destination)}
      </form>
    </li>
    `
  );
}

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;

  constructor({ point, onFormSubmit, onDeleteClick, onCloseClick }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    if (pointAvaliableOfferIds(this._state).length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      selectedOffers: [],
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const parsedPrice = parseInt(evt.target.value, 10);
    evt.target.value = isNaN(parsedPrice) ? this._state.basePrice : parsedPrice;
    this.updateElement({ basePrice: parseInt(evt.target.value, 10) });
  };

  #offerChangeHandler = (evt) => {
    let selectedOffers = this._state.selectedOffers;
    const offerId = parseInt(evt.target.dataset.offerId, 10);
    if (evt.target.checked) {
      selectedOffers.push(offerId);
      selectedOffers.sort();
    } else {
      selectedOffers = this._state.selectedOffers.filter((e) => e !== offerId);
    }
    this.updateElement({ selectedOffers });
  };

  #destinationChangeHandler = (evt) => {
    const point = this._state;
    const destination = point.allDestinations.find((dest) => dest.name === evt.target.value);
    if (destination === undefined) {
      this.reset(this._state);
    } else {
      this.updateElement({ destination: destination.id });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = () => {
    this.#handleDeleteClick();
  };

  #closeClickHandler = () => {
    this.#handleCloseClick();
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return {
      ...state,
      totalPrice: calculateTotalPrice(state),
    };
  }
}
