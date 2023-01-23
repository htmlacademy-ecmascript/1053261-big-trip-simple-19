import { getPoints } from '../mock/point.js';
import { getOffers } from '../mock/offer.js';
import { getOffersByType } from '../mock/offers-by-type.js';
import { getDestinations } from '../mock/destination.js';

export default class PointsModel {
  #points = [...getPoints()];
  #allOffers = getOffers();
  #offersByType = getOffersByType();
  #allDestinations = getDestinations();

  get points() {
    return this.#points;
  }

  get allOffers() {
    return this.#allOffers;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get allDestinations() {
    return this.#allDestinations;
  }
}
