import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {Input} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';
import {getCoures} from '../functions/functions';
import Modal from 'react-native-modal';

// import Ads
import BannerAds from '../components/bannerAds';
import { useRewardedAd } from '@react-native-admob/admob';

// import รูปบ้าน
import HomeIcon from '../assets/images/icons/HomeIcon.svg';
// import Icon Advert
import AdvertIcon from '../assets/images/icons/Vector.svg'
import * as subGradeActions from '../store/actions/subGrade';
import * as userActions from '../store/actions/user';

const hookOptions = {
  loadOnDismissed: true,
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
};
const homeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [couresData, setcouresData] = useState([]);
  const [newcouresData, setnewcouresData] = useState([]);
  const privilege = useSelector(state => state.user.userPrivilege)
  const [privilegeVisible, setprivilegeVisible] = useState(false);
  const { adLoadError, adLoaded, reward, show } = useRewardedAd(
    'ca-app-pub-3940256099942544/5224354917',
    hookOptions,
  );
  console.log(newcouresData.length);

  const GetCouresData = async () => {
    const res = await fetch(getCoures(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.json().then(res => setcouresData(res));

    // const resData = await res.json();
    // await setNewsData(resData)
  };
  useEffect(() => {
    GetCouresData();
  }, []);
  useEffect(() => {
    let test = [];
    let dontUse = [];
    let dataLength = couresData.length;
    for (let k = 0; k < dataLength; k++) {      
      let value = couresData.splice(0, 1);
      if (value != '') {
        if (
          value[0].csubName == 'test' ||
          value[0].csubName == 'test1' ||
          value[0].csubName == 'test2' ||
          value[0].csubName == 'test3' ||
          value[0].csubName == 'Test' ||
          value[0].csubName == 'Test1' ||
          value[0].csubName == 'Test2' ||
          value[0].csubName == 'Test3'
        ) {
          dontUse.push(value[0]);
        } else {
          test.push(value[0]);
        }
      }
    }for (let k = 0; k < test.length; k++) {
      console.log('for test');
      couresData.push(test[k]);
    }
    for (let k = 0; k < dontUse.length; k++) {
      console.log('for dontUse');
      couresData.push(dontUse[k]);
    }
    console.log(dataLength + test);
    setnewcouresData(test);
  }, [couresData]);
  

  const getPrivilege = useCallback(() => {
    dispatch(userActions.getPrivilege());
  })

  const savePrivilege = async () => {
    dispatch(userActions.addPrivilege());
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
    }
  }, [reward]);

  useEffect(() => {
    getPrivilege();
  }, []);
  

  const ContainerContent = () => {
    const gradeHandler = async (couresSelected, couresName) => {
      let action;
      if (couresSelected !== 0) {
        action = subGradeActions.getSub(couresSelected, 1);
        try {
          await dispatch(action);
          navigation.navigate('type', {couresName: couresName});
        } catch (e) {
          Alert.alert('แจ้งเตือน', e.message);
        }
      } else {
        console.log(couresSelected);
      }
    };
    const AdvertModal = () => {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={[
              styles.boxOvertime,
              { backgroundColor: '#1FA246', borderRadius: 15 },
            ]}>
            <Text style={[styles.textLight22, {
              marginTop: 10,
              textAlign: 'center',
              color: '#FFFFFF',
            }]}>
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
    return (
      <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <Text
          style={[
            styles.textMedium34,
            {textAlign: 'center', color: '#333333'},
          ]}>
          ประถมศึกษาปีที่ 1
        </Text>
        <View
          style={{
            margin: 5,
            flex: 2,
          }}>
          <ScrollView>
            <View style={{flex: 1}}>
              {newcouresData.map(item => {
                return (
                  <TouchableOpacity
                    key={item.csubId}
                    onPress={() => gradeHandler(item.csubId, item.csubName)}
                    style={{
                      flex: 1,
                      borderRadius: 8,
                      margin: 5,
                      height: 70,
                    }}>
                    <ImageBackground
                      style={{flex: 1.5, justifyContent: 'center'}}
                      source={require('../assets/images/bg-Artboard.png')}
                      resizeMode="stretch">
                      <Text
                        style={[
                          styles.textBold18,
                          {
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: '#fff',
                            fontWeight: '600',
                          },
                        ]}>
                        {item.csubName}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>          
        </View>
        <Text
          style={[
            styles.textBold18,
            {flex: 0.4, textAlign: 'center', color: '#333333'},
          ]}>
          กลับมาหน้าหลักนี้โดยการกดรูปบ้าน {'\n'}
          <HomeIcon width={26} height={26} /> ด้านบนขวาของแต่ละหน้า
        </Text>
        <TouchableOpacity
            style={{
              margin: 10,
              padding: 8,
              flexDirection: 'row',
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
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Text
            style={[
              styles.textLight20,
              {
                padding: 10,
                borderRadius: 8,
                backgroundColor: '#FAFE2F',
                color: '#6E7015',
              },
            ]}>
            ดาวน์โหลดวิชาอื่น ๆ กดตรงนี้
          </Text>
        </TouchableOpacity>
        <Modal isVisible={privilegeVisible}>
          <AdvertModal />
        </Modal>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/Background-Class.png')}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            marginBottom: 10,
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            <ContainerContent />
          </View>
        </View>
      </ImageBackground>
      <BannerAds />
    </SafeAreaView>
  );
};
const pageStyle = StyleSheet.create({
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
export default homeScreen;
