/**
 * @flow
 */

import React from 'react';

import { View, ActivityIndicator, Text } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';

export default class MainScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Parts',
    headerRight: <Icon name={'refresh'} />,
  };

  componentDidMount() {
    console.log('COMPONENT DID MOUNT');
    const { getParts, ticket } = this.props;
    getParts(ticket);
  }

  render() {
    const { isGettingParts, parts } = this.props;

    if (isGettingParts) {
      return (
        <View>
          <Text>Getting data...</Text>
          <ActivityIndicator />
        </View>
      );
    } else if (this.props.parts) {
      return (
        <View>
          {this.renderPartList()}
          {this.renderAddButton()}
        </View>
      );
    }
  }

  renderPartList() {
    const { isGettingParts, parts } = this.props;
    return (
      <List>
        {parts.map((l, idx) => (
          <ListItem
            key={l.update_id}
            title={l.name}
            subtitle={`Barcode: ${l.barcode}`}
          />
        ))}
      </List>
    );
  }

  renderAddButton() {
    return (
      <Icon
        raised
        reverse
        name={'add'}
        color={'#517fa4'}
        onPress={() => this.props.navigation.navigate('AddPart')}
      />
    );
  }
}
