import {StyleSheet, PixelRatio} from 'react-native';
import normalize, {
  widtScreen,
  heightScreen,
  containerTextHeight,
  scale,
} from './normalize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './colors';
const styles = StyleSheet.create({
  //------------- SCREEN STYLE  ------------//
  screen: {
    flex: 1,
  },
  //------------- FONT STYLE  ------------//
  textBold26: {
    fontFamily: 'Sarabun-Bold',
    fontSize: PixelRatio.roundToNearestPixel(26),
  },
  textBold22: {
    fontFamily: 'Sarabun-Bold',
    fontSize: PixelRatio.roundToNearestPixel(22),
  },
  textBold18: {
    fontFamily: 'Sarabun-Bold',
    fontSize: PixelRatio.roundToNearestPixel(18),
  },
  textBold16: {
    fontFamily: 'Sarabun-Bold',
    fontSize: PixelRatio.roundToNearestPixel(16),
  },
  textMedium40: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(40),
  },
  textMedium38: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(38),
  },
  textMedium36: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(36),
  },
  textMedium34: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(34),
  },
  textMedium32: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(32),
  },
  textMedium30: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(30),
  },
  textMedium28: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(28),
  },
  textMedium26: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(26),
  },
  textMedium24: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(24),
  },
  textMedium22: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(22),
  },
  textMedium20: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(20),
  },
  textMedium18: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(18),
  },
  textMedium16: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(16),
  },
  textMedium14: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(14),
  },
  textMedium12: {
    fontFamily: 'Sarabun-Medium',
    fontSize: PixelRatio.roundToNearestPixel(12),
  },
  // ------------------ Font Medium --------------------//
  textRegular40: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(40),
  },
  textRegular38: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(38),
  },
  textRegular36: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(36),
  },
  textRegular34: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(34),
  },
  textRegular32: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(32),
  },
  textRegular30: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(30),
  },
  textRegular28: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(28),
  },
  textRegular26: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(26),
  },
  textRegular24: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(24),
  },
  textRegular22: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(22),
  },
  textRegular20: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(20),
  },
  textRegular18: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(18),
  },
  textRegular16: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(16),
  },
  textRegular14: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(14),
  },
  textRegular12: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(12),
  },
  textRegular10: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(10),
  },
  textRegular8: {
    fontFamily: 'Sarabun-Regular',
    fontSize: PixelRatio.roundToNearestPixel(8),
  },
  //-----------------------------------------------//
  textLight22: {
    fontFamily: 'Sarabun-Light',
    fontSize: normalize(22),
  },
  textLight20: {
    fontFamily: 'Sarabun-Light',
    fontSize: normalize(20),
  },
  textLight18: {
    fontFamily: 'Sarabun-Light',
    fontSize: normalize(18),
  },
  textLight16: {
    fontFamily: 'Sarabun-Light',
    fontSize: normalize(16),
  },
  textLight14: {
    fontFamily: 'Sarabun-Light',
    fontSize: normalize(14),
  },
  textLight12: {
    fontFamily: 'Sarabun-Light',
    fontSize: normalize(12),
  },
  textExtraLight12: {
    fontFamily: 'Sarabun-ExtraLight',
    fontSize: hp('1.1%'),
  },
  textExtraLight14: {
    fontFamily: 'Sarabun-ExtraLight',
    fontSize: hp('1.1%'),
  },
  //------------- LIST IN CARD ------------//
  containerList: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: normalize(10),
  },
  Image: {
    width: normalize(70),
    height: normalize(70),
    borderRadius: normalize(40),
    marginHorizontal: normalize(10),
  },
  containertextName: {
    width: normalize(90),
    height: normalize(90),
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 4,
  },
  containerIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: normalize(10),
    marginBottom: normalize(10),
  },
  sizeIcon: {
    width: normalize(20),
    height: normalize(20),
    margin: normalize(5),
  },
  //------------- Shadow STYLE  ------------//
  boxshadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.0,

    elevation: 1,
  },
  textshadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.52)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  //------------- Modal STYLE  ------------//
  containerModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  backgroundModal: {
    width: (widtScreen * 93) / 100,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  //------------- Image STYLE  ------------//
  ImageCircle: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(60),
  },
  ImageCircleSmall: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(40),
  },
  //--------------------------------------//
  BoxScheduleMain: {
    minWidth: wp('15.62%'),
    maxWidth: wp('20.60%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: normalize(5),
    borderBottomLeftRadius: normalize(5),
  },
  BoxScheduleDetail: {
    padding: normalize(10),
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBG: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  containerCardList: {
    alignItems: 'center',
    padding: wp('2%'),
    borderRadius: 5,
  },
  containerTop: {
    paddingTop: hp('1.05%'),
    backgroundColor: '#FFF',
    paddingBottom: 0,
  },
  containerContent: {
    backgroundColor: '#FFF',
    paddingTop: hp('2.64%'),
    paddingBottom: hp('1'),
    paddingHorizontal: wp('5%'),
  },
  imgCardList: {
    width: hp('7.04%'),
    height: hp('7.04%'),
    borderRadius: hp('7.04%'),
  },
  containerCardRow: {
    padding: 0,
    maxWidth: wp('42.75%'),
    minWidth: wp('42.75%'),
    minHeight: hp('10.56%'),
    maxHeight: hp('15%'),
    borderRadius: normalize(5),
    marginHorizontal: wp('0.1%'),
  },
  containerBOX: {
    paddingHorizontal: hp('1%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: wp('1.1%'),
    borderRadius: normalize(15),
    width: wp('20.63%'),
    minHeight: wp('20.63%'),
    maxHeight: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerSelection: {
    backgroundColor: '#FFF',
    width: wp('43%'),
    borderRadius: 5,
    borderColor: '#E7E7E7',
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
  parentBoxHome: {
    flex: 1,
    borderTopWidth: 1.5,
    borderStyle: 'solid',
    borderTopColor: '#E7E7E7',
    borderLeftWidth: 0.75,
    borderLeftColor: '#E7E7E7',
    borderRightWidth: 0.75,
    borderRightColor: '#E7E7E7',
  },
  parentHomeMenu: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  containerCard: {
    padding: 0,
    borderTopLeftRadius: normalize(5),
    borderTopRightRadius: normalize(5),
    width: '100%',
    marginLeft: 0,
  },
  headCard: {
    borderTopLeftRadius: normalize(5),
    borderTopRightRadius: normalize(5),
  },
  textHeadCard: {
    color: colors.white,
    marginHorizontal: normalize(15),
    marginVertical: hp('0.2%'),
  },
  detailContainerCard: {
    width: '100%',
    padding: hp('1.2%'),
  },
  buttonContainer: {
    padding: hp('0.5%'),
    borderRadius: normalize(15),
  },
  buttonText: {
    color: '#FFF',
    fontSize: hp('1.5%'),
    margin: 0,
  },
  buttonCircleMini: {
    width: wp('9.37%'),
    height: wp('9.37%'),
    borderRadius: wp('4.68%'),
  },
  inputContainer: {
    marginBottom: hp('3%'),
  },
  buttonStyle: {
    justifyContent: 'flex-start',
    backgroundColor: null,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  containerLoginCard: {
    borderRadius: normalize(15),
    alignSelf: 'center',
    padding: hp('2%'),
  },
  reportDetailBorder: {
    borderTopColor: '#eeeeee',
    borderTopWidth: 1,
  },
  containerCoverContainerInput: {
    width: wp('82.85%'),
    height: wp('12.08%'),
    paddingHorizontal: 0,
    marginTop: hp('1.16%'),
  },
  containerInput: {
    borderWidth: 1,
    borderRadius: 20,
    width: wp('82.85%'),
    height: wp('12.08%'),
    paddingHorizontal: 20,
    borderColor: colors.gray2,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  boxETC: {
    marginHorizontal: 3,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 5.51,

    elevation: 8,
  },
  boxOvertime: {
    borderWidth: 1,    
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 5.51,

    elevation: 8,
  },
  
  CirclePin: {
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 5.51,

    elevation: 8,
  },
});

export default styles;
