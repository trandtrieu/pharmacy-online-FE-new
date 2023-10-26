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

  getPrescriptionsByAccountId(accountId) {
    return axios.get(
      PRESCRIPTION_API_BASE_URL + "/byaccount?account_id=" + accountId
    );
  } //http://localhost:8080/pharmacy-online/prescriptions/byaccount?account_id=1

  getPrescriptionsDetail(prescriptionId) {
    return axios.get(PRESCRIPTION_API_BASE_URL + "/view/" + prescriptionId);
  }

  removePrescription(prescriptionId) {
    return axios.delete(
      PRESCRIPTION_API_BASE_URL + "/delete/" + prescriptionId
    );
  } //http://localhost:8080/pharmacy-online/prescriptions/delete/1

  updatePrescription(presciption, id) {
    return axios.put(PRESCRIPTION_API_BASE_URL + "/update/" + id, presciption);
    //http://localhost:8080/pharmacy-online/prescriptions/update/20
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new PrescriptionServices();
