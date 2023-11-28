import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
//add user in admin
const createNewUserAdmin = (data) => {
  return axios.post("/api/create-new-user", data);
};

const DeleteUserAdmin = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const EditUserAdmin = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const getAllCodeServices = (inputData) => {
  return axios.get(`/api/allcode?type=${inputData}`);
};

const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = (limit) => {
  return axios.get(`/api/get-all-doctor`);
};
const saveDoctorService = (inputData) => {
  return axios.post("/api/save-info-doctor", inputData);
};

const getDetailDoctorService = (inputId) => {
  return axios.get(`/api/get-detail-doctor?id=${inputId}`);
};

const bulkCreateSchedule = (inputData) => {
  return axios.post("/api/bulk-create-schedule", inputData);
};

const getScheduleDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraDoctorInfo = (doctorId) => {
  return axios.get(`/api/get-extra-infoDoctor-id?doctorId=${doctorId}`);
};

const getDoctorProfileInfo = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-profile?doctorId=${doctorId}`);
};

const postPatientAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyPatientAppointment = (data) => {
  return axios.post("/api/verify-appointment", data);
};
const postAddNewSpecial = (data) => {
  return axios.post("/api/add-new-special", data);
};
const getAllSpecial = () => {
  return axios.get(`/api/get-all-special`);
};
const getDetailSpecialById = (data) => {
  return axios.get(
    `/api/get-detail-special-id?id=${data.id}&location=${data.location}`
  );
};
const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};
const getDetailClinicById = (data) => {
  console.log("check data", data.id);
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId} &date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
export {
  postSendRemedy,
  getDetailClinicById,
  getAllClinic,
  createNewClinic,
  handleLoginApi,
  getAllUsers,
  createNewUserAdmin,
  DeleteUserAdmin,
  EditUserAdmin,
  getAllCodeServices,
  getTopDoctorService,
  getAllDoctorService,
  saveDoctorService,
  getDetailDoctorService,
  bulkCreateSchedule,
  getScheduleDate,
  getExtraDoctorInfo,
  getDoctorProfileInfo,
  postPatientAppointment,
  postVerifyPatientAppointment,
  postAddNewSpecial,
  getAllSpecial,
  getDetailSpecialById,
  getAllPatientForDoctor,
};
