/**
 *
 * 2017/5/12 0012
 * 作者：高佳
 */

import React, { Component } from 'react';
import EmptyPage from './EmptyPage';
import { View, Text, StyleSheet, RefreshControl, ListView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

const propTypes = {
    onHeaderRefresh: React.PropTypes.func,
    onFooterRefresh: React.PropTypes.func,
};

const defaultProps = {
    footerRefreshingText: '数据加载中……',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据'
};

export const RefreshState = {
    Success: 'Success',
    Refreshing: 'Refreshing',
    NoMoreData: 'NoMoreData',
    Failure: 'Failure',
    None: 'None'
};

// create a component
export default class RefreshListView extends Component {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            headerState: RefreshState.Success,
            footerState: RefreshState.Success,
        }
    }

    startHeaderRefreshing() {
        this.setState({ headerState: RefreshState.Refreshing });

        if (this.props.onHeaderRefresh) {
            this.props.onHeaderRefresh()
        }
    }

    startFooterRefreshing() {
        this.setState({ footerState: RefreshState.Refreshing })

        if (this.props.onFooterRefresh) {
            this.props.onFooterRefresh()
        }
    }

    shouldStartHeaderRefreshing() {
        if (this.state.headerState == RefreshState.Refreshing ||
            this.state.footerState == RefreshState.Refreshing) {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing() {
        if (this.state.headerState == RefreshState.Refreshing ||
            this.state.footerState == RefreshState.Refreshing) {
            return false
        }
        if (this.state.footerState == RefreshState.Failure ||
            this.state.footerState == RefreshState.NoMoreData ||
            this.state.footerState == RefreshState.None) {
            return false
        }

        return this.props.data.length != 0;
    }

    endRefreshing(refreshState: RefreshState) {
        if (refreshState == RefreshState.Refreshing) {
            return
        }
        let footerState = refreshState
        if (this.props.data.length == 0) {
		    footerState = RefreshState.Success
		}

        this.setState({
            loaded: true,
            headerState: RefreshState.Success,
            footerState: footerState
        })
    }

    headerState() {
        return self.state.headerState
    }

    footerState() {
        return self.state.footerState
    }

    onHeaderRefresh() {
        if (this.shouldStartHeaderRefreshing()) {
            this.startHeaderRefreshing();
        }
    }

    onFooterRefresh() {
        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing();
        }
    }

    render() {
        return (
            <FlatList
                {...this.props}
				keyExtractor = {(item, index) => item.id}
				refreshing = {this.state.headerState == RefreshState.Refreshing}
				ListEmptyComponent={() => this.renderEmptyView()}
				ListFooterComponent={() => this.renderFooter()}
                onEndReachedThreshold={10}
                onEndReached={() => this.onFooterRefresh()}
            />
        );
    }

    renderFooter() {
        let footer = null;
        if(this.state.loaded){
            // if(this.props.dataSource.getRowCount() > 0){
                switch (this.state.footerState) {
                    case RefreshState.Success:
                        break;
                    case RefreshState.Failure: {
                        footer =
                            <TouchableOpacity style={styles.footerContainer}
                                              onPress={() => this.startFooterRefreshing()}
                            >
                                <Text style={styles.footerText}>
                                    {this.props.footerFailureText}
                                </Text>
                            </TouchableOpacity>;
                        break;
                    }
                    case RefreshState.Refreshing: {
                        footer =
                            <View style={styles.footerContainer} >
                                <ActivityIndicator size="small" color="#888888" />
                                <Text style={styles.footerText}>
                                    {this.props.footerRefreshingText}
                                </Text>
                            </View>;
                        break;
                    }
                    case RefreshState.NoMoreData: {
                        footer =
                            <View style={styles.footerContainer} >
                                <Text style={styles.footerText}>
                                    {this.props.footerNoMoreDataText}
                                </Text>
                            </View>;
                        break;
                    }
                }
            // } else {
            //     footer = this.renderEmptyView();
            // }
        }
        return footer;
    }

    renderEmptyView() {
        if (this.props.renderEmptyView) {
            return this.props.renderEmptyView();
        }

        return <EmptyPage style={this.props.emptyStyle} words = {this.props.emptyMsg || '暂无相关数据'}/>;
    }
}

// define your styles
const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        fontSize: 14,
        color: '#555555'
    }
});
