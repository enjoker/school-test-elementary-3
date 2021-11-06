import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLevelAndExam } from '../../functions/functions'
export const GET_LEVEL = 'GET_LEVEL';

export const getLevel = (ccl_id, scg_id, clv_id, exam_amount) => {
  return async (dispatch, getState) => {
    const res = await fetch(getLevelAndExam(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ccl_id: ccl_id,
        scg_id: scg_id,
        clv_id: clv_id,
        exam_amount: exam_amount,
      }),
    });
    if (!res.ok) {
      throw new Error(
        `ไม่สามารถเชื่อมต่อฐานข้อมูลได้ (FUNC:getLevel ERR:${res.status})`,
      );
    }
    const resData = await res.json();

    const groupChoice = resData ?
      resData.map(item => {
        const checkNullChoice = item.examChoice.map(item => {    // เช็คค่า {} ใน Array
          if ('c2' in item || 'c3' in item || 'c4' in item || 'c5' in item) {
            return item
          }
        }).filter(item => item)

        let randomChoice = [...item.examAnswer, ...checkNullChoice];
        const completeRandom = randomChoice // Random choice
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        return {
          cclId: item.cclId,
          cgdId: item.cgdId,
          clvId: item.clvId,
          csgId: item.csgId,
          examId: item.examId,
          examQuestion: item.examQuestion,
          examAnswer: item.examAnswer,
          examChoice: completeRandom,
          examTime: item.examTime,
          examPicQuestion: item.examPicQuestion,
          examPicAnswer: item.examPicAnswer,
          examCreditBy: item.examCreditBy,
          examPoints: item.examPoints,
        };
      })
      : null;
    dispatch({ type: GET_LEVEL, randomQuestions: groupChoice, getQuestions: resData });
  };
};
