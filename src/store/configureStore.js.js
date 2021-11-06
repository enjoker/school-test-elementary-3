import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import userReducer from './reducers/user';
import levelTestReducer from './reducers/levelTest';
import subGradeReducer from './reducers/subGrade';
import scoreReducer from './reducers/score';
import couresReducer from './reducers/coures';

const rootReducer = combineReducers({
  user: userReducer,
  level: levelTestReducer,
  score: scoreReducer,
  subGrade: subGradeReducer,
  coures: couresReducer,
});
const configureStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default configureStore;
