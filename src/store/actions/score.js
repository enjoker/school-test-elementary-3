import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendReport, getReportBySubOfGrade } from '../../utilities/api';

export const Send_Score = 'Send_Score';
export const Get_Ranking = 'Get_Ranking';

export const sendScore = (csgId, level, questionCount, correctAnswerCount, rankingScore, timeUsed) => {
   return async (dispatch, getState) => {
      const user = await AsyncStorage.getItem('user');
      const res = await fetch(
         sendReport(), {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            cclId: 1,
            csgId: csgId,
            clvId: level,
            exreUser: user,
            exreFullScore: questionCount,
            exreRealScore: correctAnswerCount,
            exreRankingScore: rankingScore,
            exreUsedTime: timeUsed
         }),
      });
      if (!res.ok) {
         throw new Error(
            `ไม่สามารถเชื่อมต่อฐานข้อมูลได้ (FUNC:sendScore ERR:${res.status})`,
         );
      }
      console.log('send success!')
   }
}

export const getRanking = (csgId) => {
   return async (dispatch, getState) => {
      const user = await AsyncStorage.getItem('user');
      const res = await fetch(
         getReportBySubOfGrade()+csgId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         }
      });
      if (!res.ok) {
         throw new Error(
            `ไม่สามารถเชื่อมต่อฐานข้อมูลได้ (FUNC:getRanking ERR:${res.status})`,
         );
      }

      const reportData = await res.json();

      dispatch({ type: Get_Ranking, rankingData: reportData, username: user });
   }
}