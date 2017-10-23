/**
 * @function: 主页面、地图页面
 * @desc:
 * @author: salody on 2017/10/20
 */

import React, {Component} from 'react';
import {
  View,
  WebView,
} from 'react-native';
import BaseComponent from "../../comoponents/BaseComponent";
import GlobalStyles from "../../common/GlobalStyles";
import MapView from 'react-native-maps';

export default class HomeScreen extends BaseComponent {
  render() {
    return (
      <View style={{flex: 1, marginTop: GlobalStyles.marginTopCompat}}>
        <WebView
          source={{uri: 'http://salody.cc:3000/'}}
          style={{flex: 1}}
          scrollEnabled={false}
        />
      </View>
    )
  }
}
