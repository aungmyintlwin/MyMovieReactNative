import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scaleWidth = (size: number) => width / guidelineBaseWidth * size;
const scaleHeight = (size: number) => height / guidelineBaseHeight * size;

export {scaleWidth, scaleHeight};