import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { Image, Icon, Avatar, normalize, Card } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
// import Icon Advert
import AdvertIcon from '../assets/images/icons/Vector.svg';
// import Ads
import BannerAds from '../components/bannerAds';
import { useRewardedAd } from '@react-native-admob/admob';
// import Actions
import * as scoreActions from '../store/actions/score';
import * as userActions from '../store/actions/user';
import userReducer from '../store/reducers/user';

const hookOptions = {
  loadOnDismissed: true,
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
};

const scoreScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const allQuestions = useSelector(state => state.level.showQuestions);
  const privilege = useSelector(state => state.user.userPrivilege)
  const {
    questionCount,
    level,
    timeLeft,
    timeOut,
    choiceSelected,
    gradeName,
    csgId,
    csgName,
    gradeId,
    overTimePlus,
    couresName,
    timeTestEasy,
    timeTestMedium,
    timeTestHard,
  } = route.params;
  const timeUsed = timeOut - timeLeft + overTimePlus;
  const timePlus = timeLeft - overTimePlus;
  const { width } = Dimensions.get('window');
  const [selectedQuestion, setselectedQuestion] = useState(false);
  const [ModalVisible, setmodalVisible] = useState(false);
  const [privilegeVisible, setprivilegeVisible] = useState(false);
  const [privilegeVisible2, setprivilegeVisible2] = useState(false);
  const [sendScoreStatus, setsendScoreStatus] = useState(false);
  const [amountAnsUser, setamountAnsUser] = useState(0);
  const [showLevel, setshowLevel] = useState(true);
  const [showDetailScore, setshowDetailScore] = useState(false);
  const [scoreLevel, setscoreLevel] = useState(0);
  const [sumScore, setsumScore] = useState(0);
  const [newChoiceSelected, setnewChoiceSelected] = useState(choiceSelected);
  const [usePrivilegeStatus, setUsePrivilegeStatus] = useState(false)
  const { adLoadError, adLoaded, reward, show } = useRewardedAd(
    'ca-app-pub-3940256099942544/5224354917',
    hookOptions,
  );
  const savePrivilege = async () => {
    dispatch(userActions.addPrivilege());
  };

  const usePrivilege = async () => {
    if (!usePrivilegeStatus) {
      dispatch(userActions.removePrivilege());
      setUsePrivilegeStatus(true)
    }
  };

  useEffect(() => {
    if (adLoadError) {
      console.error(adLoadError);
    }
  }, [adLoadError]);

  useEffect(() => {
    if (reward) {
      console.log(`Reward Earned: ${reward.type}`);
      savePrivilege();
      setprivilegeVisible(false)
    }
  }, [reward]);

  let correctAnswerCount = 0;
  let wrongAnswerCount = 0;
  let test = sumScore;
  choiceSelected.sort((a, b) => (a.questionId > b.questionId ? 1 : -1));
  allQuestions
    ? allQuestions.map((item, index) => {
      if (item.examAnswer[0].c1 === choiceSelected[index].choiceValue) {
        correctAnswerCount += 1;
      } else if (choiceSelected[index].choiceValue !== 'หมดเวลา') {
        wrongAnswerCount += 1;
      }
    })
    : null;

  const toggleModal = (index, answerResult,status) => {
    if (status == false) {
      if (privilege != '0') {
        setselectedQuestion({ index, answerResult });
        setmodalVisible(!ModalVisible);
        usePrivilege();
        // setUsePrivilegeStatus(true);
      } else if (usePrivilegeStatus && privilege == 0) {
        setselectedQuestion({ index, answerResult });
        setmodalVisible(!ModalVisible);
      } else {
        setprivilegeVisible2(!privilegeVisible2)
      }
    } else {
      setselectedQuestion({ index, answerResult });
      setmodalVisible(!ModalVisible);
    }
  };

  const sendScore = useCallback(() => {
    let rankingScore = 0;
    const levelBonus =
      level === 1 ? 1 : level === 3 ? 1.1 : level === 4 ? 1.2 : null;
    if (correctAnswerCount >= (questionCount * 80) / 100 && overTimePlus == 0) {
      rankingScore =
        Math.round(
          (Math.round(correctAnswerCount * levelBonus * 1000) / 1000 +
            (timeLeft - overTimePlus) / 100) *
          1000,
        ) / 1000;
    } else {
      rankingScore =
        Math.round(
          (Math.round(correctAnswerCount * levelBonus * 1000) / 1000 -
            overTimePlus / 100) *
          1000,
        ) / 1000;
    }
    /*if (timeLeft > 299) {
      rankingScore += 1;
    } else if (timeLeft === 0) {
      if (correctAnswerCount === 0) {
        rankingScore = 0;
      } else {
        rankingScore -= 1;
      }
    }*/
    if (!sendScoreStatus) {
      dispatch(
        scoreActions.sendScore(
          csgId,
          level,
          questionCount,
          correctAnswerCount,
          rankingScore,
          timeUsed,
        ),
      );
      setsendScoreStatus(true);
    }
  }, []);

  useEffect(() => {
    sendScore();
  }, []);

  useEffect(() => {
    if (correctAnswerCount != 0 || wrongAnswerCount != 0) {
      setamountAnsUser(timeUsed / (correctAnswerCount + wrongAnswerCount));
    } else {
      setamountAnsUser(0);
    }
  }, [timeUsed]);

  useEffect(() => {
    if (
      timeTestEasy == null &&
      timeTestMedium !== null &&
      timeTestHard == null
    ) {
      setshowLevel(false);
    }
  }, [csgName]);
  useEffect(() => {
    if (level == 1) {
      setscoreLevel(1);
    } else if (level == 3) {
      setscoreLevel(1.1);
    } else if (level == 4) {
      setscoreLevel(1.2);
    }
  }, [level]);
  useEffect(() => {
    if (correctAnswerCount >= (questionCount * 80) / 100 && overTimePlus == 0) {
      setsumScore(
        Math.round(
          (Math.round(correctAnswerCount * scoreLevel * 1000) / 1000 +
            (timeLeft - overTimePlus) / 100) *
          1000,
        ) / 1000,
      );
    } else {
      setsumScore(
        Math.round(
          (Math.round(correctAnswerCount * scoreLevel * 1000) / 1000 -
            overTimePlus / 100) *
          1000,
        ) / 1000,
      );
    }
  }, [scoreLevel, timeLeft, overTimePlus, questionCount, timeUsed]);

  const AnswerModal = () => {
    const answerResult = selectedQuestion.answerResult;
    const answerIndex = selectedQuestion.index;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={[
            styles.boxETC,
            answerResult
              ? { backgroundColor: '#63EF71' }
              : { backgroundColor: '#FFD84E' },
          ]}>
          <Text
            style={[
              styles.textMedium18,
              { marginVertical: 10, fontWeight: 'bold' },
            ]}>
            คำถาม: {allQuestions[selectedQuestion.index].examQuestion}
          </Text>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text
              style={[
                styles.textMedium18,
                pageStyle.correctAnswer,
                { textDecorationLine: 'underline' },
              ]}>
              นักเรียนตอบ
            </Text>
            <Text
              style={[
                styles.textMedium18,
                pageStyle.correctAnswer,
                { flexWrap: 'wrap', flex: 1 },
              ]}>
              {choiceSelected[answerIndex].choiceValue}
            </Text>
          </View>
          {!answerResult ? (
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <Text
                style={[
                  styles.textMedium18,
                  pageStyle.correctAnswer,
                  { textDecorationLine: 'underline' },
                ]}>
                คำตอบที่ถูก
              </Text>
              <Text
                style={[
                  styles.textMedium18,
                  pageStyle.correctAnswer,
                  { flexWrap: 'wrap', flex: 1 },
                ]}>
                {allQuestions[answerIndex].examAnswer[0].c1}
              </Text>
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={{ alignItems: 'center', marginVertical: 10 }}
              onPress={() => setmodalVisible(false)}>
              <Text style={[styles.textMedium14, pageStyle.closeModal]}>
                กลับ
              </Text>
            </TouchableOpacity>            
          </View>
        </View>
      </View>
    );
  };
  const AdvertModal = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={[
            styles.boxOvertime,
            { backgroundColor: '#1FA246', borderRadius: 15 },
          ]}>
          <Text
            style={[
              styles.textLight22,
              {
                marginTop: 10,

                textAlign: 'center',
                color: '#FFFFFF',
              },
            ]}>
            ท่านมีสิทธื์ในการดูเฉลยจำนวน
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              style={[
                styles.textRegular30,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: '#D7B641',
                  marginHorizontal: 5,
                },
              ]}>
              {privilege}
            </Text>
            <Text
              style={[
                styles.textLight22,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: '#FFFFFF',
                  marginHorizontal: 5,
                },
              ]}>
              สิทธิ์
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              marginBottom: 5,
            }}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                setprivilegeVisible(false);
              }}>
              <Text style={[styles.textLight18, pageStyle.overTimeLeft]}>
                ยกเลิก
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => show()}>
              <Text style={[styles.textLight18, pageStyle.overTimeRight]}>
                กดดูโฆษณาเพื่อรับสิทธิ์เพิ่ม
              </Text>
            </TouchableOpacity>
          </View>
        </View>        
      </View>
    );
  };
  const AdvertModal2 = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>        
         <View
          style={[
            styles.boxOvertime,
            {backgroundColor: '#D84315', borderRadius: 15},
          ]}>
          <Text
            style={[
              styles.textLight22,
              {marginTop: 10, padding: 10, textAlign: 'center',color:'#FFFFFF'},
            ]}>
            สิทธิ์ในการดูเฉลยของท่านเหลือ 0
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              marginBottom:10
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                setprivilegeVisible2(false);
              }}>
              <Text style={[styles.textLight18, pageStyle.overTimeLeft]}>
                ยกเลิก
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => { show(); setprivilegeVisible2(false); }}>
              <Text style={[styles.textLight18, pageStyle.overTimeRight]}>
                กดดูโฆษณาเพื่อรับ 2 สิทธิ์
              </Text>
            </TouchableOpacity>
          </View>
        </View>        
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            marginBottom: 10,
            flex: 1,
          }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[styles.textMedium20, { flex: 1, color: '#333333' }]}>
                    {csgName}
                  </Text>
                  <Text
                    style={[
                      styles.textMedium20,
                      { textAlign: 'center', color: '#333333' },
                    ]}>
                    {gradeName}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      marginTop: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        จำนวน
                      </Text>
                      <Text style={[styles.textBold16, pageStyle.yellowBox]}>
                        {questionCount}
                      </Text>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        ข้อ
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        ระดับ
                      </Text>
                      <Text
                        style={[
                          styles.textBold16,
                          {
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                            marginHorizontal: 5,
                            textAlign: 'center',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: '#000000',
                            backgroundColor: '#FFD84E',
                          },
                        ]}>
                        {showLevel
                          ? level === 1
                            ? 'ง่าย'
                            : level === 3
                              ? 'ปานกลาง'
                              : level === 4
                                ? 'ยาก'
                                : null
                          : '-'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        ทำถูก
                      </Text>
                      <Text style={[styles.textBold16, pageStyle.yellowBox]}>
                        {correctAnswerCount}
                      </Text>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        ข้อ
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        เหลือเวลา
                      </Text>
                      <Text style={[styles.textBold16, pageStyle.yellowBox]}>
                        {new Date(timeLeft * 1000).toISOString().substr(14, 2) +
                          '.' +
                          new Date(timeLeft * 1000).toISOString().substr(17, 2)}
                      </Text>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        นาที
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        ใช้เวลา
                      </Text>
                      <Text style={[styles.textBold16, pageStyle.yellowBox]}>
                        {new Date(timeUsed * 1000).toISOString().substr(14, 2) +
                          '.' +
                          new Date(timeUsed * 1000).toISOString().substr(17, 2)}
                      </Text>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        นาที
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        เฉลี่ยข้อละ
                      </Text>
                      <Text style={[styles.textBold16, pageStyle.yellowBox]}>
                        {new Date(amountAnsUser * 1000)
                          .toISOString()
                          .substr(14, 2) +
                          '.' +
                          new Date(amountAnsUser * 1000)
                            .toISOString()
                            .substr(17, 2)}
                      </Text>
                      <Text
                        style={[
                          styles.textBold16,
                          { textAlignVertical: 'center', color: '#333333' },
                        ]}>
                        นาที
                      </Text>
                    </View>
                  </View>
                  {showDetailScore ? (
                    <View
                      style={{
                        padding: 15,
                        marginTop: 10,
                        borderWidth: 2,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        flex: 1,
                      }}>
                      <Text
                        style={[
                          styles.textBold18,
                          { textAlign: 'center', color: '#01579B' },
                        ]}>
                        การคำนวนแต้มที่ได้
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 3, color: '#FF834E' },
                          ]}>
                          คะแนนที่ทำถูกต้องจำนวน
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          {correctAnswerCount}
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          ข้อ
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 3, color: '#FF834E' },
                          ]}>
                          คูณด้วยระดับ ความยาก
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          {scoreLevel}
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          แต้ม
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 3, color: '#FF834E' },
                          ]}>
                          รวมได้แต้มเท่ากับ
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          {Math.round(correctAnswerCount * scoreLevel * 1000) /
                            1000}
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          แต้ม
                        </Text>
                      </View>
                      {(correctAnswerCount >= (questionCount * 80) / 100 && overTimePlus == 0) ||
                        (correctAnswerCount <= questionCount && overTimePlus > 0) ? (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={[
                                styles.textMedium16,
                                { flex: 3, color: '#FF834E' },
                              ]}>
                              {overTimePlus == 0
                                ? 'เวลาคงเหลือ'
                                : 'ใช้เวลาเกิน'}
                            </Text>
                            <Text
                              style={[
                                styles.textMedium16,
                                { flex: 1, textAlign: 'right', color: '#FF834E' },
                              ]}>
                              {overTimePlus == 0
                                ? timeLeft - overTimePlus
                                : overTimePlus}
                            </Text>
                            <Text
                              style={[
                                styles.textMedium16,
                                { flex: 1, textAlign: 'right', color: '#FF834E' },
                              ]}>
                              วินาที
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={[
                                styles.textMedium16,
                                { flex: 3, color: '#FF834E' },
                              ]}>
                              เวลาคงเหลือคูณด้วย 0.01
                            </Text>
                            <Text
                              style={[
                                styles.textMedium16,
                                { flex: 1, textAlign: 'right', color: '#FF834E' },
                              ]}>
                              {(timeLeft - overTimePlus) / 100}
                            </Text>
                            <Text
                              style={[
                                styles.textMedium16,
                                { flex: 1, textAlign: 'right', color: '#FF834E' },
                              ]}>
                              แต้ม
                            </Text>
                          </View>
                        </View>
                      ) : null}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 3, color: '#FF834E' },
                          ]}>
                          รวมได้แต้มทั้งสิ้น
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#01579B' },
                          ]}>
                          {sumScore}
                        </Text>
                        <Text
                          style={[
                            styles.textMedium16,
                            { flex: 1, textAlign: 'right', color: '#FF834E' },
                          ]}>
                          แต้ม
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        paddingHorizontal: 15,
                        marginTop: 10,
                        borderWidth: 2,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        flex: 1,
                      }}>
                      <ScrollView
                        style={{ paddingVertical: 15 }}
                        showsVerticalScrollIndicator={false}>
                        {allQuestions
                          ? allQuestions.map((item, index) => {
                            const checkAnswer =
                              item.examAnswer[0].c1 ===
                              choiceSelected[index].choiceValue;
                            const checkAnsTimeOut =
                              choiceSelected[index].choiceValue == 'หมดเวลา'
                                ? 'หมดเวลา'
                                : 'ผิด';
                            const checkColorTimeOut =
                              choiceSelected[index].choiceValue == 'หมดเวลา'
                                ? pageStyle.timeOutColor
                                : pageStyle.falseColor;
                            return (
                              <View
                                key={item.examId}
                                style={{
                                  justifyContent: 'space-between',
                                  flexDirection: 'row',
                                  marginBottom: 5,
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    style={[
                                      styles.textMedium16,
                                      { marginRight: 5, fontWeight: 'bold' },
                                      checkAnswer
                                        ? pageStyle.trueColor
                                        : checkColorTimeOut,
                                    ]}>
                                    ข้อที่ {index + 1}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.textMedium16,
                                      { marginRight: 5, fontWeight: 'bold' },
                                      checkAnswer
                                        ? pageStyle.trueColor
                                        : checkColorTimeOut,
                                    ]}>
                                    {checkAnswer
                                      ? 'ถูกต้อง'
                                      : checkAnsTimeOut}
                                  </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                  {checkAnswer ? (
                                    <TouchableOpacity
                                      onPress={() =>
                                        toggleModal(index, checkAnswer, true)
                                      }>
                                      {/* <TouchableOpacity onPress={checkAnswer ? toggleCorrectModal : toggleWrongModal}> */}
                                      <Text
                                        style={[
                                          styles.textMedium16,
                                          { fontWeight: 'bold' },
                                          checkAnswer
                                            ? pageStyle.trueColor
                                            : checkColorTimeOut,
                                        ]}>
                                        ดูคำถาม
                                      </Text>
                                    </TouchableOpacity>
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() =>
                                        toggleModal(index, checkAnswer, false)
                                      }>
                                      {/* <TouchableOpacity onPress={checkAnswer ? toggleCorrectModal : toggleWrongModal}> */}
                                      <Text
                                        style={[
                                          styles.textMedium16,
                                          { fontWeight: 'bold' },
                                          checkAnswer
                                            ? pageStyle.trueColor
                                            : checkColorTimeOut,
                                        ]}>
                                        ดูเฉลย
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </View>
                            );
                          })
                          : null}
                        <View style={{ height: 30 }} />
                      </ScrollView>
                    </View>
                  )}
                  <View style={{ flexDirection: 'row', flex: 1, marginTop: 5 }}>
                    <Text style={[styles.textBold16, { textAlignVertical: 'center', color: '#333333' }]}>
                      จำนวนสิทธิ์ดูเฉลย: {privilege}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      padding: 8,
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'center',
                      backgroundColor: '#37565b',
                      borderRadius: 10,
                    }}
                    onPress={() => setprivilegeVisible(!privilegeVisible)}>
                    <AdvertIcon width={26} height={26} />
                    <Text style={[styles.textLight18, { textAlignVertical: 'center', marginLeft: 10, color: '#ffffff' }]}>
                      ดูโฆษณาเพื่อรับสิทธิ์ดูเฉลย
                    </Text>
                  </TouchableOpacity>
                  {showDetailScore ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        style={{ alignItems: 'center', marginTop: 10 }}
                        onPress={() =>
                          navigation.navigate('ranking', {
                            csgId: csgId,
                            gradeId: gradeId,
                            csgName: csgName,
                            gradeName: gradeName,
                          })
                        }>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/Ranking.png')}
                            style={{ width: 60, height: 50 }}
                            resizeMode="stretch"
                          />
                          <View
                            style={{
                              alignItems: 'center',
                              padding: 5,
                            }}>
                            <Text
                              style={[
                                styles.textMedium16,
                                { marginHorizontal: 5 },
                              ]}>
                              ดูอันดับ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        style={{ alignItems: 'center', marginTop: 10 }}
                        onPress={() => setshowDetailScore(true)}>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/Ranking.png')}
                            style={{ width: 60, height: 50 }}
                            resizeMode="stretch"
                          />
                          <View
                            style={{
                              alignItems: 'center',
                              padding: 5,
                            }}>
                            <Text
                              style={[
                                styles.textMedium16,
                                { marginHorizontal: 5 },
                              ]}>
                              ดูอันดับ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ alignItems: 'center', marginTop: 10 }}
                        onPress={() =>
                          navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [
                                { name: 'home' },
                                {
                                  name: 'optionTest',
                                  params: {
                                    subid: csgId,
                                    gradeid: gradeId,
                                    csgName: csgName,
                                    couresName:couresName,
                                  },
                                },
                              ],
                            }),
                          )
                        }>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/ExamOneMore.png')}
                            style={{ width: 60, height: 50 }}
                            resizeMode="stretch"
                          />
                          <View
                            style={{
                              alignItems: 'center',
                              padding: 5,
                            }}>
                            <Text
                              style={[
                                styles.textMedium16,
                                { marginHorizontal: 5 },
                              ]}>
                              ทำอีกครั้ง
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <Modal isVisible={ModalVisible}>
                  <AnswerModal />
                </Modal>
                <Modal isVisible={privilegeVisible}>
                  <AdvertModal />
                </Modal>
                <Modal isVisible={privilegeVisible2}>
                  <AdvertModal2 />
                </Modal>
                {/* <Modal isVisible={isWrongModalVisible}>
                <WrongModel />
              </Modal> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <BannerAds />
    </SafeAreaView>
  );
};

const pageStyle = StyleSheet.create({
  trueColor: {
    color: '#00962A',
  },
  falseColor: {
    color: '#FF4E4E',
  },
  timeOutColor: {
    color: '#888',
  },
  yellowBox: {
    padding: 5,
    marginHorizontal: 5,
    width: wp('17%'),
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    backgroundColor: '#FFD84E',
  },
  closeModal: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff',
    width: 100,
    textAlign: 'center',
  },
  correctAnswer: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#0036F3',
  },
  overTimeLeft: {
    backgroundColor: '#fff',
    borderColor: '#D7B641',
    color: '#D7B641',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  overTimeRight: {
    backgroundColor: '#D7B641',
    borderColor: '#FFffff',
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default scoreScreen;
