/**
 * Created by gaojie on 2017/11/1.
 */

import React from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Dimensions,
} from 'react-native';
import BaseComponent from "../../common/BaseComponent";

export default class Login extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<ScrollView  style={styles.container}>
				<ImageBackground
					style={styles.headerImg}
					resizeMode='cover'
					source={{uri:'http://pic.qiantucdn.com/58pic/25/55/80/58390e0522a14_1024.jpg'}}
				>
					<TouchableOpacity style={{margin:20,justifyContent:'center'}}
									  onPress = {this.router.pop()}
					>
						<Image
							style={{height:44,width:34,resizeMode:'center'}}
							source={require('../../images/back_black.png')}></Image>
					</TouchableOpacity>
				</ImageBackground>
				<View style={styles.detailContainer}>
					{this._renderHeaderItem('基本信息')}
					{this._renderRowItem('船   名','TJ_401')}
					{this._renderRowItem('船长姓名','高佳')}
					{this._renderRowItem('联系电话','15020002333')}
					{this._renderRowItem('单    位','天津航道局')}
					{this._renderHeaderItem('船舶情况')}
					{this._renderRowItem('吨    位','1000吨')}
					{this._renderRowItem('空 气 舱','Jack')}
					{this._renderRowItem('层    数','4层')}
					{this._renderRowItem('容    量','10000L')}
				</View>
			</ScrollView>
		)
	}
	_renderHeaderItem = (headerText) =>{
		return(
			<View style={{height:40,flexDirection:'row'}}>
				<View
					style={{width:2,height:15,marginRight:5,backgroundColor:this.color.primary}}
				/>
				<Text style={{color:this.color.textPrimary,fontSize:16}}>
					{headerText}
				</Text>
			</View>
		)
	}
	_renderRowItem = (key,value)=>{
		let color = (key=='联系电话'?{color:'blue'}:{color:this.color.textPrimary})
		return (
			<View style={{flex:1,flexDirection:'row',height:40,justifyContent:'center',paddingLeft:10}}>
				<Text style={{width:80,color:this.color.textSecondary}}>
					{key}
				</Text>
				<Text style={[{flex:1},color]}>
					{value}
				</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		// backgroundColor:'orange',
	},
	headerImg: {
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').width*3/5,
	},
	detailContainer: {
		backgroundColor:'white',
		flex:1,
		paddingTop:20,
		paddingLeft:20,
		paddingRight:20,
	},
})

