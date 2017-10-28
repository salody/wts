/**
 * Created by 高洁 on 2017/4/18.
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import StyleVariable from '../../style/StyleVariable';
// import {Actions} from 'react-native-router-flux'

const propTypes = {
    style: React.PropTypes.object,
    fontStyle: React.PropTypes.object,
    onPress: React.PropTypes.func,
}

export default class BaseButton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity
                style={[styles.container,this.props.style]}
                onPress={()=>this.props.onPress()}
            >
                <Text style={this.props.fontStyle}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:40,
        marginLeft:20,
        marginRight:20,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:StyleVariable.color.primary,
    }
})
