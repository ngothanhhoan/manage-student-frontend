import { API_METHOD } from "@/common/constant";
import api from "./common";

const studentApi = {
  getListStudent: () => api(API_METHOD.GET, "/student"),
  createStudent: (body) => api(API_METHOD.POST, "/student", body),
  updateStudent: (body) => api(API_METHOD.PUT, "/student", body),
  deleteStudent: (body) => api(API_METHOD.DELETE, "/student", body),
};

export default studentApi;
