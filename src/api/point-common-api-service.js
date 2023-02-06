import ApiService from '../framework/api-service.js';

export default class PointCommonApiService extends ApiService {
  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }
}
