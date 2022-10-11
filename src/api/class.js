import { API_METHOD } from "@/common/constant";
import api from "./common";

const classApi = {
  getListClass: () => api(API_METHOD.GET, "/class"),
  createClass: (body) => api(API_METHOD.POST, "/class", body),
  updateClass: (body) => api(API_METHOD.PUT, "/class", body),
  deleteClass: (body) => api(API_METHOD.DELETE, "/class", body),
};

export default classApi;
