/**
 * @function: 全局样式
 * @desc: 存储全局样式
 * @author: salody on 2017/10/20
 */

import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

const GlobalStyles = {
  marginTopCompat: Platform.OS === 'ios' ? 20 : 0,
  window_height: height,
  window_width: width,
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
};

export default GlobalStyles;