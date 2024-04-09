import API from './api';

export default class PaymentService {
  static doPayment = (payload) => {
    return API.post("/api/screening/payment/dopayment", payload);
  };
  static createOrderOnKlarna = (authorizationToken,payload) => {
    return API.post(
      `/api/screening/payment/dopaymentusingklarna?authtoken=${authorizationToken}`,
      payload
    );
  };
}