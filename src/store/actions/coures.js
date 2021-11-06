import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCoures} from '../../functions/functions';
export const SHOW_COURES = 'SHOW_COURES';

export const GETCouresData = () => {
  return async (dispatch, getState) => {
    const response = await fetch(getCoures(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `ไม่สามารถเชื่อมต่อฐานข้อมูลได้ (FUNC:025 ERR:${response.status})`,
      );
    }
    const resData = await response.json();
    console.log('coures: ' + resData);
    dispatch({type: SHOW_COURES, show_coures: resData});
  };
};


