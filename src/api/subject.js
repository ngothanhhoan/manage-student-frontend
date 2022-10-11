import { API_METHOD } from "@/common/constant";
import api from "./common";

const subjectApi = {
  getListSubject: () => api(API_METHOD.GET, "/subject"),
  createSubject: (body) => api(API_METHOD.POST, "/subject", body),
  updateSubject: (body) => api(API_METHOD.PUT, "/subject", body),
  deleteSubject: (body) => api(API_METHOD.DELETE, "/subject", body),
};

export default subjectApi;
