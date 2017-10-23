/**
 * @function: 主页面、地图页面
 * @desc:
 * @author: salody on 2017/10/20
 */

import React, {Component} from 'react';
import {
  View,
  WebView,
  Text,
  TouchableOpacity
} from 'react-native';
import BaseComponent from "../../comoponents/BaseComponent";
import GlobalStyles from "../../common/GlobalStyles";

export default class HomeScreen extends BaseComponent {
  render() {
    return (
      <View style={{flex: 1, marginTop: GlobalStyles.marginTopCompat}}>
        <WebView
          source={{uri: 'http://salody.cc:3000/'}}
          style={{flex: 1}}
        />
        <TouchableOpacity style={{position: 'absolute', top: 200, left: 18, zIndex:1000}}>
          <View>
            <Text>按钮</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
