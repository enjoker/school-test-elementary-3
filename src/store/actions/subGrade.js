import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSubGrade} from '../../functions/functions'
export const GET_SUBGRADE = 'GET_SUBGRADE';

export const getSub = (csub_id,cgd_id) => {
  return async (dispatch, getState) => {
    const res = await fetch(getSubGrade(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        csub_id: csub_id,
        cgd_id: cgd_id,        
      }),
    });
    if (!res.ok) {
      throw new Error(
        `ไม่สามารถเชื่อมต่อฐานข้อมูลได้ (FUNC:007 ERR:${res.status})`,
      );
    }
    const resData = await res.json();
    dispatch({ type: GET_SUBGRADE, showSubGrade: resData });
    
  };
};
