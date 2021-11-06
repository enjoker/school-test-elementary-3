import { Get_Ranking } from '../actions/score'

const initialState = {
   showRanking: null,
   user: null
};

const scoreReducer = (state = initialState, action) => {
   switch (action.type) {
      case Get_Ranking:
         return {
            ...state,
            showRanking: action.rankingData,
            user: action.username
         }
      default:
         return state;
   }
}
export default scoreReducer;