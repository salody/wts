/**
 * 描述：
 * 2017/10/25
 * 作者：高佳
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	WebView,
	TouchableOpacity
} from 'react-native';
import BaseComponent from '../common/BaseComponent';

export default class Typhoon extends BaseComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<WebView
					ref={(c) => this.webView = c}
					source={{uri: 'http://www.wztf121.com/wap/release/index.html#route&t='+new Date().getTime()}}
					style={{flex: 1}}
					// injectedJavaScript={
					// 	`if(document.readyState == 'complete') {
					// 		document.getElementsByClassName('tf_menu_div')[0].style.display = 'none';
					// 		document.getElementsByClassName('close_tp_div')[0].style.display = 'none';
					// 		document.getElementsByClassName('current_checked_typhoon_div')[0].style.display = 'none';
					// 		document.getElementsByClassName('menu_div')[0].style.display = 'none';
					// 		document.getElementById('map').style.height = '600px';
					// 	}`
					// }
					bounces={false}/>
				<TouchableOpacity
					style={{position: 'absolute', top: 20, left: 18, zIndex: 1000}}
					onPress={() => this.props.navigation.goBack()}
					underlayColor='transparent'
				>
					<View>
						<Text>返回</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	_onLoad = () => {
		this.injectJavaScripted();
	}
}
