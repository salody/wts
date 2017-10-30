/**
 * 描述：
 * 2017/10/30
 * 作者：高佳
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
	ScrollView,
	StyleSheet,
	PixelRatio,
	TouchableHighlight
} from 'react-native';
import BaseComponent from '../common/BaseComponent';
import StyleVariable from '../style/StyleVariable';
import RowSplitLine from '../components/basic/RowSplitLine';
import Util from "../utils/basic/Util";
import Images from '../common/resource/Image';
import DataSource from '../config/DataConfig';
import VideoItem from './components/VideoListItem';

let scrollHeight=(5 * 44) + (5 / PixelRatio.get());

export default class VideoList extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			showSearchModal: false,
			searchDataSource: DataSource.VideoSearchDataSource
		}
	}

	render() {
		return(
			<View style={{flex:1,backgroundColor: this.color.background}}>
				{
					<View style={{position:'absolute',top:0,left:0,zIndex:1000}}>
						<SearchBar dataSource = {this.state.searchDataSource} />
					</View>

				}
				<View style={{marginTop: 44}}>
					{
						this.renderListView({
							data: DataSource.VideoDataSource,
							renderItem: (rowData, row, rowID) => this._renderItem(rowData, row, rowID),
							onRefresh: () => this._onRequestListWithReload(true),
							onFooterRefresh: () => this._onRequestListWithReload(false)
						})
					}
				</View>
			</View>
		)
	}



	_renderItem = (data) => {
		let item = {
			shipName: data.item.name,
			captainName: data.item.captainName,
			telephone: data.item.phone,
			address: data.item.address,
			onPress: () => {alert(data.item.code)},
		}
		return(
			<View>
				<VideoItem {...item}/>
			</View>
		)
	};

	_onRequestListWithReload = () => {

	}



}

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSearchModal: false,
		};
		this.dataSource = this.props.dataSource;
	}

	render() {
		return(
			<View>
				{this._renderSearchBar(this.dataSource)}
				{this.dataSource.length > 0 ? this._renderSearchModal(this.dataSource) : null}
			</View>
		)
	}
	_renderSearchBar = (dataSource) => {
		let searchItem = [];
		let searchCount = dataSource.length;
		dataSource.forEach((item)=> {
			searchItem.push(
				<View key={Util.GUID()} style={styles.searchBarContainer}>
					<TouchableHighlight underlayColor={'transparent'}
										onPress={()=>this._onSelectSearchType(item.id, !item.show, dataSource)}
					>
						{item.show ?
							<View style={{width: Util.Window.getWidth / searchCount}}>
								<View style={styles.itemStyle}>
									<View>
										<Text style={styles.titleTextStyle}
											  numberOfLines={1} allowFontScaling={false}>
											{item.title}
										</Text>
									</View>
									<View style={styles.iconContainer}>
										<Image {...Images.select_up} style={{width:8,height:8}} resizeMode='contain'/>
										{/*<Icon name='ios-arrow-up' size={17} color={this.color.primary}/>*/}
									</View>
								</View>
							</View> : <View style={{width: Util.Window.getWidth / searchCount}}>
								<View style={styles.itemStyle}>
									<View>
										<Text style={[styles.titleTextStyle, styles.textTertiaryColor]} numberOfLines={1}
											  allowFontScaling={false}>
											{item.title}
										</Text>
									</View>
									<View style={styles.iconContainer}>
										<Image {...Images.select_drop} style={{width:8,height:8}} resizeMode='contain'/>
									</View>
								</View>
							</View>
						}
					</TouchableHighlight>
				</View>
			)
		});
		return (<View style={styles.main}>
			{searchItem}
		</View>);
	};

	_renderSearchModal(dataSource) {
		return (<TouchableHighlight style={styles.modalContainer}>
			<View>
				{
					this.state.showSearchModal
						? <View style={styles.detailStyle}>
							{this._renderSearchItem(dataSource)}
						  </View>
						: null
				}
				<TouchableHighlight
					style={styles.modalStyle}
					underlayColor={'transparent'}
					onPress={()=>this._onCloseSearchItem(dataSource)}>
					<View>
					</View>
				</TouchableHighlight>
			</View>
		</TouchableHighlight>)
	}

	//关闭筛选条件弹出框
	_onCloseSearchItem(dataSource) {
		for(let item of dataSource) {
			item.show = false;
		}
		this.setState({
			showSearchModal: false
		});
	}

	//选择了筛选条件
	_onSelectSearchType(id, show, dataSource) {
		for(let item of dataSource) {
			item.show = false;
			if(item.id === id) {
				item.show = show;
			}
		}

		this.setState({
			showSearchModal: show
		});
	}

	_renderSearchItem(dataSource) {
		let result = [];
		for(let item of dataSource) {
			if(item.show) {
				item.items.map((data) => {
					result.push(
						<TouchableHighlight key={Util.GUID()}
											underlayColor={'transparent'}
											onPress={() => {this._onSelectData(item.id, data.id, dataSource)}}>
							<View>
								<RowSplitLine/>
								{
									data.selected
										? <View style={styles.textStyle}>
										<Text allowFontScaling={false}
											  style={[styles.itemFontStyle, styles.primaryColor]}>{data.title}</Text>
										<Image style={styles.choiceIconStyle} {...Images.selected} resizeMode='contain'/>
									</View>
										: <View style={styles.textStyle}>
										<Text allowFontScaling={false} style={styles.itemFontStyle}>{data.title}</Text>
									</View>
								}
							</View>
						</TouchableHighlight>
					)
				})
			}
		}

		result = result.length > 5
			? <ScrollView style={{height: scrollHeight}}>
				{result}
			  </ScrollView>
			: result;
		return result;
	}

	//选择类型
	_onSelectData(id,itemId, dataSource) {
		for(let item of dataSource) {
			item.show = false;
			if(item.id === id) {
				item.items.map((data) => {
					data.selected = false;
					if(data.id === itemId) {
						data.selected = true;
					}
				})
			}
		}
		this.setState({
			showSearchModal: false
		});
		// this._onHandleSearchResult(id, code, name);
	}
}

const styles = StyleSheet.create({
	searchBarContainer: {
		backgroundColor: StyleVariable.color.container,
	},
	container: {
		flex: 1,
		backgroundColor: StyleVariable.color.background,
	},
	listContainer: {
		flex: 1,
		width: Util.Window.getWidth,
	},
	choiceIconStyle: {
		height: 17,
		width: 17,
	},
	primaryColor: {
		color: StyleVariable.color.primary,
	},
	modalContainer: {
		position: 'absolute',
		//start4-----------------需自己添加的内容----------------------------------
		//如果搜索条上面有其它内容,top值加上其上其他内容高度即可
		top: 44,
		//end4--------------------需自己添加的内容--------------------------------------
	},
	modalStyle: {
		height: Util.Window.getHeight,
		backgroundColor: '#3d4751',
		opacity: 0.5,
	},
	textTertiaryColor: {
		color: StyleVariable.color.textSecondary,
	},
	iconContainer: {
		marginLeft: 5,
		width: 17,
	},
	titleTextStyle: {
		fontSize: StyleVariable.fontSize.someSmall,
		color: StyleVariable.color.primary,
		textAlign: 'center',
	},
	itemFontStyle: {
		fontSize: StyleVariable.fontSize.normal,
		color: StyleVariable.color.textSecondary,
	},
	main: {
		height: 44,
		flexDirection: 'row',
		backgroundColor: StyleVariable.color.container,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginHorizontal: 15,
	},
	detailStyle: {
		flex: 1,
		backgroundColor: StyleVariable.color.container,
		width: Util.Window.getWidth,
	},
	textStyle: {
		height: 44,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30,
	},
});
