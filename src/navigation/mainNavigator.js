import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import { Image } from 'react-native-elements';
import styles from '../styles/style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import * as userActions from '../store/actions/user';

// import Icon.SVG
import RenameIcon from '../assets/images/icons/rename_icon.svg';
import HomeIcon from '../assets/images/icons/HomeIcon.svg';
// import AdvertIcon from '../assets/images/icons/Vector.svg';

//import Screen
import registerScreen from '../screens/registerScreen';
import loadingScreen from '../screens/loadingScreen';
import homeScreen from '../screens/homeScreen';
import renameScreen from '../screens/renameScreen';
import typeScreen from '../screens/typeScreen';
import optionTestScreen from '../screens/optionTestScreen';
import testScreen from '../screens/testScreen';
import scoreScreen from '../screens/scoreScreen';
import rankingScreen from '../screens/rankingScreen';
import advertScreen from '../screens/advertScreen';

// import {useRewardedAd} from '@react-native-admob/admob';

const hookOptions = {
  loadOnDismissed: true,
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
};

const Navigator = () => {
  const dispatch = useDispatch();
  const checkUser = useSelector(state => state.user.userName);
  const loadingUser = useSelector(state => state.user.loadingUser);
  const Stack = createNativeStackNavigator();  

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(userActions.getUser());
      //  await AsyncStorage.removeItem('user')
      //  await AsyncStorage.removeItem('privilege')
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  
  const MainLogo = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/SchooltestLogo.png')}
          style={{width: 34, height: 24}}
        />
        <Text
          style={[styles.textMedium16, {marginHorizontal: 5, color: '#555'}]}>
          School Test Lite
        </Text>
      </View>
    );
  };

  const clearStackOptions = ({navigation}) => ({
    title: '',
    headerLeft: () => {
      return <MainLogo />;
    },
    headerRight: () => {
      return (     
          <TouchableOpacity           
            onPress={() => navigation.popToTop()}>
            <HomeIcon width={26} height={26} />
          </TouchableOpacity>       
      );
    },
  });

  const screenOptions = ({navigation}) => ({
    headerTitle: () => {
      return <MainLogo />;
    },
    headerRight: () => {
      return (               
          <TouchableOpacity            
            onPress={() => navigation.popToTop()}>
            <HomeIcon width={26} height={26} />
          </TouchableOpacity>   
      );
    },
  });

  const screenRename = ({navigation}) => ({
    headerTitle: () => {
      return <MainLogo />;
    },
    headerRight: () => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('rename')}>
          <RenameIcon width={26} height={26} />
        </TouchableOpacity>
      );
    },
  });

  const AppNavigator = ({navigation}) => {
    return (
      <Stack.Navigator>
        {checkUser === null && loadingUser === false ? (
          <>
            <Stack.Screen
              name="register"
              component={registerScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="advert"
              component={advertScreen}
              options={{headerShown: false}}
            />
          </>
        ) : checkUser !== null && loadingUser === false ? (
          <>
            <Stack.Screen
              name="home"
              component={homeScreen}
              options={screenRename}
            />
            <Stack.Screen
              name="type"
              component={typeScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="optionTest"
              component={optionTestScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="test"
              component={testScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="score"
              component={scoreScreen}
              options={clearStackOptions}
            />
            <Stack.Screen
              name="ranking"
              component={rankingScreen}
              options={screenOptions}
            />
            <Stack.Screen
              name="rename"
              component={renameScreen}
              options={screenOptions}
            />
          </>
        ) : (
          <Stack.Screen
            name="loading"
            component={loadingScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppNavigator />      
    </NavigationContainer>
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

export default Navigator;
