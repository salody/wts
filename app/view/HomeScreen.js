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
	Image,
	FlatList,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import BaseComponent from "../common/BaseComponent";
import { WebView } from 'react-native-webview-messaging/WebView';
import OtherConfig from '../config/OtherConfig'
import BaseButton from "../components/basic/BaseButton";

export default class HomeScreen extends BaseComponent {
	constructor(props) {
		super(props);
		this.state= {
			showMore: false,
			showTypeList:false,
			shipTypeSource: [{
				name:'运沙船',
			},{
				name:'抛石船',
			},{
				name:'其它',
			}],
		}
	}

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
		//this.webview.send('ship');

		// this.webview.emit('custom-event-from-rn', { payload: 'Custom event from RN' });

		this.router.jumpToPage('typhoon')
	};

	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar
					hidden={true}
					translucent={true}
					animated={false}
				/>
				<WebView
					ref={ webview => {
						this.webview = webview;
					}}
					source={{uri: 'http://salody.cc:3002/'}}
					style={{flex: 1}}
					bounces={false}
				/>
				<View style={styles.LTContainer}>
					{this._renderImgBtn('video',require('../images/video.png'))}
					{this._renderImgBtn('list',require('../images/list.png'))}
					{this._renderImgBtn('detail',require('../images/ship_icon.png'))}
					{this._renderImgBtn('type',require('../images/ship_menu.png'))}
					{this._renderImgBtn('path',require('../images/path.png'))}
				</View>
				<View style={styles.RTContainer}>
					{this._renderImgBtn('message',require('../images/message.png'))}
				</View>
				<View style={styles.RBMenuContainer}>
					{this._renderRightMenu()}
				</View>
				<View style={styles.RBContainer}>
					{this._renderImgBtn('position',require('../images/position.png'))}
				</View>
				<View style={styles.LBContainer}>
					{this._renderImgBtn('dotMore',require('../images/dot_more.png'))}
				</View>
				{this._renderShipTypeList()}
			</View>
		)
	}
	_renderRightMenu = ()=>{
		if(this.state.showMore){
			return(
				<View style={styles.rightContainer} hidden = {this.state.showMore}>
					{this._renderImgBtn('check',require('../images/check.png'))}
					{this._renderImgBtn('tyhoon',require('../images/tyhoon.png'))}
					{this._renderImgBtn('files',require('../images/files.png'))}
					{this._renderImgBtn('setting',require('../images/set.png'))}
				</View>
			)
		}else{
			null;
		}
	}
	_renderShipTypeList = () =>{
		if (this.state.showTypeList){
			return(
				<FlatList
					style={styles.flatList}
					data={this.state.shipTypeSource}
					extraData={this.state}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderListItem}
					ItemSeparatorComponent={this._renderSeparator}
				/>
			)
		}else {
			null;
		}
	}
	_renderListItem = (item) =>{
		let data = item.item;
		return(
			<TouchableOpacity key={item.id} style={{height:30,justifyContent:'center'}}>
				<Text style={{padding:5,marginLeft:5}}>
					{data.name}
				</Text>
			</TouchableOpacity>
		)
	}
	_renderSeparator = () =>{
		return(
			<View style={{height:1,backgroundColor:this.color.divider,marginLeft:10,marginRight:10}}/>
		)
	}
	_keyExtractor = (item, index) => item.id;
	_renderImgBtn =(btnType,source)=>{
		return(
			<BaseButton
				onPress={()=>this._onImgBtnAction(btnType)}
				imgSource={source}
			/>
		)
	}
	_onImgBtnAction = (btnType) =>{
		this.toast(btnType);
		switch (btnType){
			case 'video':{

			}
				break;
			case 'list':{

			}
				break;
			case 'detail':{

			}
				break;
			case 'type':{
				this.setState({
					showTypeList:!this.state.showTypeList,
				})
			}
				break;
			case 'path':{

			}
				break;
			case 'check':{

			}
				break;
			case 'typhone':{

			}
				break;
			case 'files':{

			}
				break;
			case 'setting':{

			}
				break;
			case 'dotMore':{
				this.setState({
					showMore:!this.state.showMore,
				})
			}
				break;
			case 'position':{

			}
				break;
			default:
				break;
		}
	}

}

var styles = StyleSheet.create({
	LTContainer:{
		position: 'absolute',
		left:OtherConfig.marginMid,
		top:60,
		width:50,
		// height:120,
		// backgroundColor:'gray',
	},
	LBContainer:{
		position:'absolute',
		bottom:OtherConfig.marginHuge,
		right:OtherConfig.marginMid,
		width:50,
	},
	RTContainer:{
		position:'absolute',
		width:50,
		top:60,
		right:OtherConfig.marginMid
	},
	RBMenuContainer:{
		position:'absolute',
		width:50,
		bottom:(OtherConfig.marginHuge+50+OtherConfig.marginMid),
		right:OtherConfig.marginMid
	},
	RBContainer:{
		position:'absolute',
		bottom:OtherConfig.marginHuge,
		left:OtherConfig.marginMid,
		width:50,
	},
	flatList:{
		position:'absolute',
		top:60+50*3,
		left:OtherConfig.marginMid+50+OtherConfig.marginSmall,
		width:100,
		backgroundColor:'white'
	}

})
