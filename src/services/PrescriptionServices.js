import axios from "axios";

const PRESCRIPTION_API_BASE_URL =
  "http://localhost:8080/pharmacy-online/prescriptions";

class PrescriptionServices {
  createPrescriptions(prescription, accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.post(
      `${PRESCRIPTION_API_BASE_URL}/create?account_id=${accountId}`,
      prescription,
      config
    );
  }

  getPrescriptionsByAccountId(accountId, accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.get(
      `${PRESCRIPTION_API_BASE_URL}/byaccount?account_id=${accountId}`,
      config
    );
  }

  getPrescriptionsDetail(prescriptionId) {
    return axios.get(PRESCRIPTION_API_BASE_URL + "/view/" + prescriptionId);
  }

  removePrescription(prescriptionId) {
    return axios.delete(
      PRESCRIPTION_API_BASE_URL + "/delete/" + prescriptionId
    );
  }

  updatePrescription(presciption, id) {
    return axios.put(PRESCRIPTION_API_BASE_URL + "/update/" + id, presciption);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new PrescriptionServices();
