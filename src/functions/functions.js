const baseURL = 'https://api.test.schoolcare.app/';

export const getSubGrade = () => {
  return baseURL + 'sub-of-grade-no-auth/find-by-grade';
};

export const getLevelAndExam = () => {
  return baseURL + 'exam-no-auth/find-by-amount-and-level';
};
export const getCoures = () => {
  return baseURL + 'sub-of-grade-no-auth/find-all-subject';
};
export const getSubAndTime = () => {
  return baseURL + 'sub-of-grade-no-auth/find-by-cgd-id/1';
};


export const sendReport = () => {
  return baseURL + 'report-no-auth/create';
}