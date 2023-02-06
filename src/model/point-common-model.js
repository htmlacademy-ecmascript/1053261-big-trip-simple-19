import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointCommonModel extends Observable {
  #pointCommonApiService = null;
  #pointCommon = null;

  constructor({ pointCommonApiService }) {
    super();
    this.#pointCommonApiService = pointCommonApiService;
  }

  get pointCommon() {
    return this.#pointCommon;
  }

  async init() {
    let allOffers, allDestinations;
    try {
      [allOffers, allDestinations] = await Promise.all([
        this.#pointCommonApiService.offers,
        this.#pointCommonApiService.destinations
      ]);
      this.#pointCommon = { allOffers, allDestinations };
      this._notify(UpdateType.INIT_POINT_COMMON);
    } catch (err) {
      this._notify(UpdateType.ERROR_LOADING);
      throw new Error('Error loading data from server');
    }
  }
}
