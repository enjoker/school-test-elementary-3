import {SHOW_COURES} from '../actions/coures';

const initialState = {
  showcoures: null,
};

const couresReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COURES:
      return {
        ...state,
        showcoures: action.show_coures,
      };
    default:
      return state;
  }
};
export default couresReducer;
