/**
 * @function: 基础组件
 * @desc: Screen都继承这个组件，里面配置了所有Screen通用的东西
 * @author: salody on 2017/10/20
 */

import React, { Component } from 'react';

export default class BaseComponent extends Component {

  // react-navigation中对当前组件nav属性的配置
  static navigationOptions = {
    header: null
  };

}