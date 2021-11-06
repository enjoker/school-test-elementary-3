import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/style';
import { Image, Icon, Avatar, normalize, Card } from 'react-native-elements';

import RenameIcon from '../assets/images/icons/rename_icon.svg';

interface headerOptions {
  homeScreen: boolean
}

const Header = ({ homeScreen }: headerOptions) => {
  console.log(homeScreen)
  return (
    <View style={pageStyle.headerBar}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/SchooltestLogo.png')}
          style={{ width: 34, height: 24 }}
        />
        <Text style={[styles.textMedium16, { marginHorizontal: 5, color: '#555' }]}>
          School Test Lite
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RenameIcon width={26} height={26} />
      </View>
    </View>
  );
};

const pageStyle = StyleSheet.create({
  headerBar: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 10
  }
})

export default Header;
