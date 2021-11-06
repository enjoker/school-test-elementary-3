import {GET_SUBGRADE} from '../actions/subGrade';

const initialState = {
  showSubGrade: null,
};

const subGradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBGRADE:
      return {
        ...state,
        showSubGrade: action.showSubGrade,
      };
    default:
      return state;
  }
};
export default subGradeReducer;
