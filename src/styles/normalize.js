import {Dimensions,PixelRatio,Platform} from 'react-native';
export const widtScreen = Dimensions.get('screen').width;
export const heightScreen = Dimensions.get('screen').height
export const containerTextHeight = (heightScreen*93/100)*47/100;
export const scale = heightScreen / (heightScreen*105/100)
function normalize(size) {
    const newSize = size 
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {  
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  export default normalize;