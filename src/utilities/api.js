const baseURL = 'https://api.test.schoolcare.app/';
const TestServer = 'http://103.13.30.165:8087/';

export const getSubGrade = () => {
   return baseURL + 'sub-of-grade-no-auth/find-by-grade';
};

export const getLevelAndExam = () => {
   return baseURL + 'exam-no-auth/find-by-amount-and-level';
};

export const getReportBySubOfGrade = () => {
   return baseURL + 'report-no-auth/find-by-grade/';
};

export const sendReport = () => {
   return baseURL + 'report-no-auth/create';
};