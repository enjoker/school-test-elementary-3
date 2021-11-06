import { GET_LEVEL } from '../actions/levelTest'

const initialState = {
    showQuestions: null,
    randomQuestions: null
};

const levelTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEVEL:
            return {
                ...state,
                showQuestions: action.getQuestions,        
                randomQuestions: action.randomQuestions      
            }        
        default:
            return state;
    }
}
export default levelTestReducer;