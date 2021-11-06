import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import {Image, Icon, Avatar, normalize, Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
// import Ads
import BannerAds from '../components/bannerAds';

const typeScreen = ({navigation, route}) => {
  const SubGradeDetail = useSelector(state => state.subGrade.showSubGrade);
  const {couresName} = route.params;
  const [newSubGradeDetail, setnewSubGradeDetail] = useState([]);
  const [colorBox, setcolorBox] = useState([
    '#028c6a',
    '#1FA246',
    '#FFA73F',
    '#2E59F1',
    '#FF4E4E',
    '#EF2A80',
    '#B13AFA',
  ]);

  useEffect(() => {
    if(SubGradeDetail.length != 0){
    let test = [];
    let dontUse = [];
    let dataLength = SubGradeDetail.length;
    for (let k = 0; k < dataLength; k++) {
      let value = SubGradeDetail.splice(0, 1);
      if (value != '') {
        if (
          value[0].csg_name == 'test' ||
          value[0].csg_name == 'test1' ||
          value[0].csg_name == 'test2' ||
          value[0].csg_name == 'test3' ||
          value[0].csg_name == 'Test' ||
          value[0].csg_name == 'Test1' ||
          value[0].csg_name == 'Test2' ||
          value[0].csg_name == 'Test3'
        ) {
          dontUse.push(value[0]);
        } else {
          test.push(value[0]);
        }
      }
    }
    for (let k = 0; k < test.length; k++) {
      console.log('for test');
      SubGradeDetail.push(test[k]);
    }
    for (let k = 0; k < dontUse.length; k++) {
      console.log('for dontUse');
      SubGradeDetail.push(dontUse[k]);
    }
    //SubGradeDetail.push(test.concat(dontUse))
    setnewSubGradeDetail(test);
  }else{
    Alert.alert('แจ้งเตือน', 'ระดับชั้นนี้ยังไม่มีข้อสอบ', [
      { text: 'ยืนยัน', onPress: () => navigation.navigate('home') },
    ]);
  }
  }, [SubGradeDetail]);

  const ContainerContent = () => {
    return (
      <View>
        <Text
          style={[
            styles.textMedium34,
            {textAlign: 'center', color: '#333333'},
          ]}>
          {couresName}
        </Text>
        <ScrollView>
          <View style={{flex: 1, alignItems: 'center'}}>
            {console.log(newSubGradeDetail)}
            {newSubGradeDetail !== null
              ? newSubGradeDetail.map((item, index) => {
                  console.log(newSubGradeDetail);
                  return (
                    <TouchableOpacity
                      key={item.csg_id}
                      style={{marginVertical: 10, height: 70}}
                      onPress={() =>
                        navigation.navigate('optionTest', {
                          subid: item.csg_id,
                          gradeid: item.cgd_id,
                          csgName: item.csg_name,
                          couresName: couresName,
                        })
                      }>
                      <ImageBackground
                        style={{flex: 1.5, justifyContent: 'center'}}
                        source={require('../assets/images/bg-Artboard.png')}
                        resizeMode="stretch">
                        <Text
                          style={[
                            styles.textBold18,
                            {
                              width: wp('80%'),
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              padding: 10,
                              borderRadius: 8,
                              color: '#fff',
                            },
                          ]}>
                          {item.csg_name}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/Background-Class.png')}
        imageStyle={{opacity: 0.5}}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            marginBottom: 10,
            flex: 1,
          }}>
          <ScrollView style={{flex: 1}}>
            <ContainerContent />
          </ScrollView>
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
        </View>
      </ImageBackground>
      <BannerAds />
    </SafeAreaView>
  );
};

export default typeScreen;
