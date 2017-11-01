import React, { Component } from 'react';
import {
    Alert,
    PixelRatio,
    StyleSheet,
    View,
} from 'react-native';
import {Scene, Router, Actions, ActionConst, Stack} from 'react-native-router-flux'
import Utils from './utils/Index';
import HomeScreen from './view/HomeScreen';
import Typhoon from './view/Typhoon';
import Login from './view/Login/Login';
import LearningFiles from './view/LearningFiles/LearningFiles'
import Message from './view/Message/Message'
import Video from './view/Video/VideoList'
import Setting from './view/Setting/Setting'
import { VideoList } from './view/Page';

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex           : 1,
        backgroundColor: 'white',
        shadowColor    : null,
        shadowOffset   : null,
        shadowOpacity  : null,
        shadowRadius   : null,
    };
    if (computedProps && computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

export default class AppRouterContainer extends Component {
    constructor (props) {
        super(props);
        console.log('store==>' + JSON.stringify(props));
    }


    render () {
        return (
			<Router getSceneStyle={getSceneStyle}  backAndroidHandler={this._onExitApp}>
				<Stack key="root">
					<Scene key="login" component={Login}  hideNavBar={true}/>
					<Scene key="home" component={HomeScreen} type="reset" initial hideNavBar={true}/>
					<Scene key="typhoon" component={Typhoon} title="Typhoon"/>
					<Scene key="videoList" component={VideoList} title="Video"/>
					<Scene key="learningFiles" component={LearningFiles} title="学习文档"/>
					<Scene key="message" component={Message} title="消息"/>
					<Scene key="video" component={Video} title="视频"/>
					<Scene key="setting" component={Setting} title="设置" />
				</Stack>
			</Router>
        );
    }

    _onBackAndroid = () => {
        return true;
    };

    _onExitApp = () => {
        this._exit();
        return true;
    };

    // 退出程序
    _exit = () => {
        // 当前页面为root页面时的处理
        if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
            //最近2秒内按过back键，可以退出应用。
            Alert.alert('提示', '确认退出?',
                [{text: '取消', onPress: () => { }},
                    {text: '确定', onPress: () => { Utils.onBackPressed(); }},
                ]);
            return true;
        }
        this.lastBackPressed = Date.now();
        Utils.showMessage('再按一次退出应用');
        return true;
    };

}

let styles = StyleSheet.create({
    tabbarContainer: {
        flex           : 1,
        backgroundColor: 'white',
        height         : 50,
        borderTopWidth : 1 / PixelRatio.get(),
        borderStyle    : 'solid',
        borderTopColor : '#ddd',
    },
});
