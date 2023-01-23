import Observable from '../framework/observable.js';
import { getOffers } from '../mock/offer.js';
import { getOffersByType } from '../mock/offers-by-type.js';
import { getDestinations } from '../mock/destination.js';

export default class PointCommonModel extends Observable {
  #allOffers = getOffers();
  #offersByType = getOffersByType();
  #allDestinations = getDestinations();

  get pointCommon() {
    return {
      allOffers: this.#allOffers,
      offersByType: this.#offersByType,
      allDestinations: this.#allDestinations,
    };
  }
}
