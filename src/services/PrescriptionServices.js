import axios from "axios";

const PRESCRIPTION_API_BASE_URL =
  "http://localhost:8080/pharmacy-online/prescriptions";

class PrescriptionServices {
  createPrescriptions(presciption, accountId) {
    return axios.post(
      PRESCRIPTION_API_BASE_URL + "/create?account_id=" + accountId,
      presciption
    );
  } //http://localhost:8080/pharmacy-online/prescriptions/create?account_id=2
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new PrescriptionServices();
