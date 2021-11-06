import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import { useSelector } from 'react-redux';
import ImageModal from 'react-native-image-modal';
import { Image, Icon, Avatar, normalize, Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import Ads
import BannerAds from '../components/bannerAds';

const testScreen = ({ navigation, route }) => {
  const { timeOut, level, gradeName, csgId, csgName, gradeId, couresName, timeTestEasy, timeTestMedium, timeTestHard, } = route.params;
  const questionDetails = useSelector(state => state.level.randomQuestions);
  const { width } = Dimensions.get('window');
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [choiceSelected, setchoiceSelected] = useState([]);
  const [choiceUnAnswered, setchoiceUnAnswered] = useState([]);
  const [value, setValue] = useState();
  const [seconds, setseconds] = useState(timeOut);
  const [secondsPlus, setsecondsPlus] = useState(0);
  const [showOvertimePlus, setshowOvertimePlus] = useState(false);
  const [showModalTimeOut, setshowModalTimeOut] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmExamVisible, setConfirmExamVisible] = useState(false);
  const [isIncompleteVisible, setIncompleteVisible] = useState(false);
  const [showButtonSendExam, setshowButtonSendExam] = useState(false);


  console.log(value);
  const findChoice = item => {
    let choice = null;
    switch (true) {
      case item.c1 !== undefined:
        return (choice = item.c1);
      case item.c2 !== undefined:
        return (choice = item.c2);
      case item.c3 !== undefined:
        return (choice = item.c3);
      case item.c4 !== undefined:
        return (choice = item.c4);
      default:
        console.log('not detect');
        break;
    }
  };

  const findIndexChoice = () => {
    const checkIndex = choiceSelected.find(
      item => item.questionId === currentQuestion,
    );
    checkIndex && setValue(checkIndex.choiceValue);
  };

  const selectChoice = choiceValue => {
    setValue(choiceValue);
    const checkSelected = choiceSelected.findIndex(
      item => item.questionId === currentQuestion,
    );
    checkSelected === -1
      ? setchoiceSelected([
        ...choiceSelected,
        {
          questionId: currentQuestion,
          choiceValue: choiceValue,
        },
      ])
      : [(choiceSelected[checkSelected].choiceValue = choiceValue)];
  };

  const SendExamHandler = async overTime => {
    if (overTime == 0) {
      if (choiceSelected.length !== questionDetails.length) {
        setIncompleteVisible(!isIncompleteVisible);
      } else {
        setConfirmExamVisible(!isConfirmExamVisible);
      }
    } else if (overTime == 1) {
      if (choiceSelected.length !== questionDetails.length) {
        let choiceTimeOut = [];
        for (let k = 0; k < questionDetails.length; k++) {
          let value = choiceSelected.splice(0, 1);
          if (value != '') {
            if (value[0].questionId !== k) {
              choiceTimeOut.push({ choiceValue: 'หมดเวลา', questionId: k });
              choiceSelected.unshift(value[0]);
            } else {
              choiceTimeOut.push(value[0]);
            }
          } else {
            choiceTimeOut.push({ choiceValue: 'หมดเวลา', questionId: k });
          }
        }
        for (let k = 0; k < choiceTimeOut.length; k++) {
          choiceSelected.push(choiceTimeOut[k]);
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'home' },
              {
                name: 'score',
                params: {
                  questionCount: questionDetails.length,
                  level: level,
                  timeLeft: seconds,
                  timeOut: timeOut,
                  choiceSelected: choiceSelected,
                  gradeName: gradeName,
                  csgId: csgId,
                  csgName: csgName,
                  gradeId: gradeId,
                  overTimePlus: secondsPlus,
                  timeTestEasy: timeTestEasy,
                  timeTestMedium: timeTestMedium,
                  timeTestHard: timeTestHard,
                },
              },
            ],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'home' },
              {
                name: 'score',
                params: {
                  questionCount: questionDetails.length,
                  level: level,
                  timeLeft: seconds,
                  timeOut: timeOut,
                  choiceSelected: choiceSelected,
                  gradeName: gradeName,
                  csgId: csgId,
                  csgName: csgName,
                  gradeId: gradeId,
                  overTimePlus: secondsPlus,
                  timeTestEasy: timeTestEasy,
                  timeTestMedium: timeTestMedium,
                  timeTestHard: timeTestHard,
                },
              },
            ],
          }),
        );
      }
    } else if (overTime == 2) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'home' },
            {
              name: 'score',
              params: {
                questionCount: questionDetails.length,
                level: level,
                timeLeft: seconds,
                timeOut: timeOut,
                choiceSelected: choiceSelected,
                gradeName: gradeName,
                csgId: csgId,
                csgName: csgName,
                gradeId: gradeId,
                overTimePlus: secondsPlus,
                timeTestEasy: timeTestEasy,
                timeTestMedium: timeTestMedium,
                timeTestHard: timeTestHard,
              },
            },
          ],
        }),
      );
      setshowModalTimeOut(false);
    }
  };
  const warpExam = async () => {
    let test = [];
    for (let k = 0; k < questionDetails.length; k++) {
      //console.log(choiceSelected);
      choiceSelected.sort((a, b) => (a.questionId > b.questionId ? 1 : -1));
      let value = choiceSelected.splice(0, 1);
      if (value != '') {
        if (value[0].questionId !== k) {
          choiceUnAnswered.push({ choiceValue: false, questionId: k });
          choiceSelected.unshift(value[0]);
        } else {
          test.push(value[0]);
        }
      } else {
        choiceUnAnswered.push({ choiceValue: false, questionId: k });
      }
    }
    for (let k = 0; k < test.length; k++) {
      choiceSelected.push(test[k]);
    }
    //console.log(choiceUnAnswered);
    //console.log(choiceSelected)
    if (choiceUnAnswered[0].choiceValue == false) {
      //console.log(choiceUnAnswered[0].questionId);
      setcurrentQuestion(choiceUnAnswered[0].questionId);
    }
    setshowButtonSendExam(true);
  };

  useEffect(() => {
    if (showButtonSendExam == true) {
      warpExam();
    }
  }, [choiceUnAnswered, choiceSelected]);

  useEffect(() => {
    findIndexChoice();
  }, [choiceSelected, value, currentQuestion]);

  useEffect(() => {
    if (seconds !== 0) {
      let interval = setInterval(() => {
        setseconds(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => {
        setModalVisible(showModalTimeOut ? !isModalVisible : false);
      });
    }
  }, [seconds]);

  useEffect(() => {
    if (showOvertimePlus == true) {
      if (secondsPlus >= 0) {
        let interval2 = setInterval(() => {
          setsecondsPlus(lastTimerCount2 => {
            lastTimerCount2 >= 0 && clearInterval(interval2);
            return lastTimerCount2 + 1;
          });
        }, 1000);
        return () => clearInterval(interval2);
      }
    }
  }, [secondsPlus, showOvertimePlus]);
  useEffect(() => {
    if (questionDetails.length == 0) {
      Alert.alert('แจ้งเตือน', 'วิชาย่อยนี้ยังไม่มีข้อสอบ', [
        {
          text: 'ยืนยัน',
          onPress: () => navigation.navigate('type', { couresName: couresName }),
        },
      ]);
    }
  }, [questionDetails]);

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
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.textMedium14, pageStyle.textEtc]}>
                      ข้อที่
                    </Text>
                    <Text style={[styles.textMedium14, pageStyle.boxYello]}>
                      {currentQuestion + 1}/{questionDetails.length}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.textMedium14, pageStyle.textEtc]}>
                      เหลือเวลา
                    </Text>
                    <Text style={[styles.textMedium14, pageStyle.boxYello]}>
                      {showOvertimePlus
                        ? new Date(secondsPlus * 1000)
                          .toISOString()
                          .substr(14, 5)
                        : new Date(seconds * 1000).toISOString().substr(14, 5)}

                      {/*  hh/mm/ss
                      {new Date(seconds * 1000).toISOString().substr(11, 8)}*/}
                    </Text>
                    <Text style={[styles.textMedium14, pageStyle.textEtc]}>
                      นาที
                    </Text>
                  </View>
                </View>
                <ScrollView>
                  <View style={{ justifyContent: 'center' }}>
                    {questionDetails[currentQuestion] ? (
                      // questionDetails.map(item => {
                      //     return (
                      <View
                        style={{ width: width - wp('10%'), padding: 8 }}
                        key={questionDetails[currentQuestion].examId}>
                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                          <Text
                            style={[
                              styles.textBold16,
                              pageStyle.CardTextExamQuestion,
                            ]}>
                            {questionDetails[currentQuestion].examQuestion}
                          </Text>
                        </View>
                        {questionDetails[currentQuestion].examPicQuestion !==
                          null &&
                          questionDetails[currentQuestion].examPicQuestion !==
                          '' ? (
                          <View style={{ marginVertical: 5 }}>
                            <ImageModal
                              resizeMode="contain"
                              modalImageResizeMode="contain"
                              imageBackgroundColor="#ffffff"
                              style={{ width: 100, height: 100 }}
                              source={{
                                uri:
                                  'https://api.test.schoolcare.app/getImg/getUploadFile?name=' +
                                  questionDetails[
                                    currentQuestion
                                  ].examPicQuestion.substr(8),
                              }}
                            />
                          </View>
                        ) : null}
                        <View style={{ marginVertical: 5 }}>
                          <RadioButton.Group
                            onValueChange={newValue => selectChoice(newValue)}
                            value={value}>
                            {questionDetails[currentQuestion].examChoice.map(
                              (item, index) => {
                                const choiceValue = findChoice(item);
                                return (
                                  <View style={pageStyle.radioZone} key={index}>
                                    <RadioButton
                                      value={choiceValue}
                                      color="#ffb84e"
                                      uncheckedColor="#ffb84e"
                                    />
                                    <TouchableOpacity
                                      style={[
                                        pageStyle.radioText,
                                        value == undefined
                                          ? pageStyle.noneActiveBg
                                          : value == item.c1 ||
                                            value == item.c2 ||
                                            value == item.c3 ||
                                            value == item.c4
                                            ? pageStyle.activeBg
                                            : pageStyle.noneActiveBg,
                                      ]}
                                      onPress={() => {
                                        selectChoice(choiceValue);
                                      }}>
                                      <Text
                                        style={[
                                          styles.textBold16,
                                          { textAlignVertical: 'center' },
                                        ]}>
                                        {' ' + choiceValue}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                );
                              },
                            )}
                          </RadioButton.Group>
                        </View>
                      </View>
                    ) : null}
                  </View>
                  {choiceSelected.length !== questionDetails.length ? (
                    showButtonSendExam ? (
                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                          style={{ marginTop: 10 }}
                          onPress={() => {
                            warpExam();
                            setchoiceUnAnswered([]);
                          }}>
                          <View style={[pageStyle.buttonUnAnswered]}>
                            <Text
                              style={[
                                styles.textMedium16,
                                pageStyle.textbuttonNB,
                              ]}>
                              กดเพื่อไปข้อที่ยังไม่ได้ทำ
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null
                  ) : showButtonSendExam ? (
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => SendExamHandler(0)}>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/SendExam.png')}
                            style={{ width: 30, height: 50 }}
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
                              ส่งคำตอบ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {currentQuestion === 0 ? (
                      <View />
                    ) : (
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => setcurrentQuestion(currentQuestion - 1)}>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/Pre-bt.png')}
                            style={{ width: 50, height: 50 }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: 5,
                            }}>
                            <Image
                              source={require('../assets/images/icons/previous.png')}
                              style={{ width: 15, height: 15 }}
                            />
                            <Text
                              style={[
                                styles.textMedium16,
                                { marginHorizontal: 5 },
                              ]}>
                              ก่อนหน้า
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {currentQuestion === questionDetails.length - 1 ? (
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => SendExamHandler(0)}>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/SendExam.png')}
                            style={{ width: 30, height: 50 }}
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
                              ส่งคำตอบ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => setcurrentQuestion(currentQuestion + 1)}>
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={require('../assets/images/icons/Next-bt.png')}
                            style={{ width: 50, height: 50 }}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: 5,
                            }}>
                            <Text
                              style={[
                                styles.textMedium16,
                                { marginHorizontal: 5 },
                              ]}>
                              ข้อถัดไป
                            </Text>
                            <Image
                              source={require('../assets/images/icons/next.png')}
                              style={{ width: 15, height: 15 }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
        <Modal isVisible={isConfirmExamVisible}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={[
                styles.boxOvertime,
                { backgroundColor: '#fff', borderRadius: 15 },
              ]}>
              <Text
                style={[
                  styles.boxOvertime,
                  styles.textBold16,
                  pageStyle.textConfirm,
                ]}>
                แจ้งเตือน
              </Text>
              <Text
                style={[
                  styles.textLight18,
                  { marginTop: 10, padding: 10, textAlign: 'center' },
                ]}>
                ยืนยันการส่งคำตอบใช่หรือไม่ ?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10,
                }}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => setConfirmExamVisible(false)}>
                  <Text style={[styles.textLight18, pageStyle.confirmLeft]}>
                    ไม่ใช่
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    SendExamHandler(2);
                    setshowOvertimePlus(false);
                    setConfirmExamVisible(false);
                  }}>
                  <Text style={[styles.textLight18, pageStyle.confirmRight]}>
                    ใช่
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={[
                styles.boxOvertime,
                { backgroundColor: '#fff', borderRadius: 15 },
              ]}>
              <Text
                style={[
                  styles.boxOvertime,
                  styles.textBold16,
                  pageStyle.textOvertime,
                ]}>
                หมดเวลา
              </Text>
              <Text
                style={[
                  styles.textLight18,
                  { marginTop: 10, padding: 10, textAlign: 'center' },
                ]}>
                ต้องการทำต่อหรือไม่ ?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10,
                }}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    SendExamHandler(1);
                    setModalVisible(false);
                  }}>
                  <Text style={[styles.textLight18, pageStyle.overTimeLeft]}>
                    ไม่ทำ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    setshowOvertimePlus(true);
                    setModalVisible(false);
                  }}>
                  <Text style={[styles.textLight18, pageStyle.overTimeRight2]}>
                    กดดูโฆษณารับสิทธิ์ต่อเวลา
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={isIncompleteVisible}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={[
                styles.boxOvertime,
                { backgroundColor: '#fff', borderRadius: 15 },
              ]}>
              <Text
                style={[
                  styles.boxOvertime,
                  styles.textBold16,
                  pageStyle.textWarning,
                ]}>
                แจ้งเตือน
              </Text>
              <Text
                style={[
                  styles.textLight18,
                  { marginTop: 10, padding: 10, textAlign: 'center' },
                ]}>
                คุณยังเลือกคำตอบไม่ครบ
              </Text>
              <TouchableOpacity
                style={{ alignItems: 'center', padding: 10 }}
                onPress={() => {
                  setIncompleteVisible(false);
                  warpExam();
                  setchoiceUnAnswered([]);
                }}>
                <Text style={[styles.textLight18, pageStyle.warningBT]}>
                  ยืนยัน
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <BannerAds />
    </SafeAreaView>
  );
};

const pageStyle = StyleSheet.create({
  radioZone: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  radioText: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ffb84e',
  },
  textEtc: {
    margin: 5,
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  boxYello: {
    backgroundColor: '#FFD84E',
    borderColor: '#0036F3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlignVertical: 'center',
  },
  CardTextExamQuestion: {
    borderWidth: 1,
    borderColor: '#ffb84e',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  textPoint: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  buttonNB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    width: 110,
    borderColor: '#264ddb',
    backgroundColor: '#ffd84e',
  },
  buttonUnAnswered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    width: 200,
    height: 50,
    borderColor: '#264ddb',
    backgroundColor: '#ffd84e',
  },
  textbuttonNB: {
    marginHorizontal: 5,
    color: '#0036F3D9',
  },
  textOvertime: {
    padding: 10,
    color: '#fff',
    backgroundColor: '#FF1B37',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    textAlign: 'center',
  },
  overTimeLeft: {
    backgroundColor: '#fff',
    borderColor: '#FF834E',
    color: '#FF834E',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  overTimeRight: {
    backgroundColor: '#FF834E',
    borderColor: '#FF834E',
    color: '#fff',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  overTimeRight2: {
    backgroundColor: '#FF834E',
    borderColor: '#FF834E',
    color: '#fff',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    width: 200,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  textConfirm: {
    padding: 10,
    color: '#fff',
    backgroundColor: '#0e773f',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    textAlign: 'center',
  },
  confirmLeft: {
    backgroundColor: '#fff',
    borderColor: '#5eb996',
    color: '#5eb996',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  confirmRight: {
    backgroundColor: '#5eb996',
    borderColor: '#5eb996',
    color: '#fff',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  textWarning: {
    padding: 10,
    color: '#fff',
    backgroundColor: '#f5a400',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    textAlign: 'center',
  },
  warningBT: {
    backgroundColor: '#ffd83f',
    borderColor: '#ffd83f',
    color: '#000',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    width: 100,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  activeBg: {
    backgroundColor: '#ffb84e',
  },
  noneActiveBg: {
    backgroundColor: '#fff',
  },
});

export default testScreen;
