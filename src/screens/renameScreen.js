import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../styles/style';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ads
import BannerAds from '../components/bannerAds';

const renameScreen = ({ navigation }) => {
   const [name, setname] = useState()

   const saveName = async () => {
      await AsyncStorage.setItem('user', name);
      navigation.pop()
   }

   useEffect(() => {
      const getName = async () => {
         try {
            const currentName = await AsyncStorage.getItem('user')
            setname(currentName)
         } catch (error) {
            console.log(error)
         }
      }
      getName()
   }, [])

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
         <ImageBackground
            style={{ flex: 1, paddingHorizontal: 15 }}
            source={require('../assets/images/Bg-one.png')}>
            <View style={{ paddingVertical: 30, alignItems: 'center' }}>
               <Text style={[styles.textBold22, { color: '#fff' }]}>เปลี่ยนชื่อ</Text>
            </View>
            <Input
               inputStyle={[
                  styles.textLight16,
                  {
                     borderWidth: 1,
                     borderRadius: 8,
                     paddingHorizontal: 10,
                     textAlignVertical: 'center',
                     textAlign: 'center',
                     marginTop: 20,
                     backgroundColor: '#fff'
                  },
               ]}
               inputContainerStyle={{ borderBottomWidth: 0 }}
               placeholder="ชื่อผู้ใช้งาน"
               onChangeText={value => setname(value)}
               value={name}
            />
            <Button
               title="บันทึก"
               titleStyle={styles.textBold18}
               buttonStyle={{ borderRadius: 8, borderWidth: 1, borderColor: '#fff' }}
               containerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
               onPress={saveName}
            />
         </ImageBackground>
         <BannerAds />
      </SafeAreaView>
   );
}

export default renameScreen
