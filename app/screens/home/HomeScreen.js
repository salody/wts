/**
 * @function: 主页面、地图页面
 * @desc:
 * @author: salody on 2017/10/20
 */

import React, {Component} from 'react';
import {
  View,
  AlertIOS,
  Text,
  TouchableOpacity
} from 'react-native';
import BaseComponent from "../../comoponents/BaseComponent";
import GlobalStyles from "../../common/GlobalStyles";
import { WebView } from 'react-native-webview-messaging/WebView';

export default class HomeScreen extends BaseComponent {

  componentDidMount() {
    this.webview.messagesChannel.on('text', text => console.log(text));
    this.webview.messagesChannel.on('json', json => console.log(json));
    this.webview.messagesChannel.on('custom-event-from-webview', eventData => console.log(eventData));
  }

  sendMessageToWebView = () => {
    // this.webview.sendJSON({
    //   payload: 'JSON from RN'
    // });
    ///AlertIOS.alert('send ship');
    this.webview.send('ship');

   // this.webview.emit('custom-event-from-rn', { payload: 'Custom event from RN' });
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: GlobalStyles.marginTopCompat}}>
        <WebView
          ref={ webview => { this.webview = webview; }}
          source={{uri: 'http://salody.cc:3000/'}}
          style={{flex: 1}}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 200, left: 18, zIndex:1000}}
          onPress={this.sendMessageToWebView}
          underlayColor='transparent'
        >
          <View>
            <Text>向webView发消息</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
