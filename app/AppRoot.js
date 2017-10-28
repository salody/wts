import React from 'react';
import {
    Image,
    Text,
    NetInfo,
    StyleSheet,
    Alert,
    BackAndroid,
} from 'react-native'
import AppRouterContainer from './AppRouterContainer'


class AppRoot extends React.Component {
    constructor(props) {
        super(props);
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleFirstConnectivityChange
        );
    }

    componentDidMount() {
        this.configErrorHandler();
        this.configLog();
    }

    _handleFirstConnectivityChange = (reach) => {
        // 移除网络监听
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleFirstConnectivityChange
        );
    };

    //正式版禁用console.log
    configLog = () => {
        if (__DEV__ === false) {
            console = {};
            console.log = function () {
            };
            console.info = function () {
            };
            console.warn = function () {
            };
            console.error = function () {
            };
        }
    };

    //全局异常处理
    configErrorHandler = () => {
        if (!__DEV__) {
            ErrorUtils.setGlobalHandler((error, fatal) => {
                // TODO:记录异常
                // 关闭程序
                Alert.alert('提示', '程序出现致命异常！',
                    [
                        {
                            text: '关闭', onPress: () => {
                            BackAndroid.exitApp();
                        }
                        }
                    ], {cancelable: true});
            });
        }
    };

    render() {
        return (
            <AppRouterContainer />
        );
    }
}
let styles=StyleSheet.create({
    tabbarContainer: {
        flex: 1,
        backgroundColor: "#f6f6f6",
        height:60,
        borderTopWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
        borderTopColor:'#ddd'
    }
});

export default AppRoot;
