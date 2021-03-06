/**
 * @flow
 */

import React from 'react';

import { FlatList, View, Text, RefreshControl } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

import styles from 'src/components/MainScreen/styles';
import { COLOR_PRIMARY } from 'src/theme';

export default class MainScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Parts',
    headerStyle: styles.headerStyle,
    headerTintColor: 'white',
    headerLeft: null,
  };

  componentDidMount() {
    this.getParts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.deletePartSuccess) {
      this.getParts();
    }
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        {this.renderPending()}
        {this.renderPartList()}
        {this.renderAddButton()}
      </View>
    );
  }

  renderPending() {
    if (this.props.isGettingParts) {
      return <Text style={styles.loadingText}>Getting data...</Text>;
    }
    return null;
  }

  renderPartList() {
    const { parts } = this.props;
    return (
      <FlatList
        data={parts}
        refreshControl={this.getRefreshControl()}
        renderItem={({ item }) => this.renderListItem(item)}
      />
    );
  }

  renderListItem(item) {
    const { barcodeDeleting, ticket } = this.props;

    const button = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => this.props.deletePart(ticket, item.barcode),
      },
    ];
    const deletingStyle =
      barcodeDeleting === item.barcode ? { backgroundColor: 'lightgray' } : {};
    return (
      <Swipeout right={button} close={barcodeDeleting === ''}>
        <View style={[styles.listItem, deletingStyle]}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Barcode: {item.barcode}</Text>
        </View>
      </Swipeout>
    );
  }

  getRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.isGettingParts}
        onRefresh={this.getParts.bind(this)}
      />
    );
  }

  renderAddButton() {
    return (
      <Icon
        containerStyle={styles.fabButton}
        raised
        reverse
        color={COLOR_PRIMARY}
        name={'add'}
        onPress={() => this.props.navigation.navigate('AddPart')}
      />
    );
  }

  getParts() {
    const { getParts, ticket } = this.props;
    getParts(ticket);
  }
}
