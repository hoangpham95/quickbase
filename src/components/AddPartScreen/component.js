/**
 * @flow
 */

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
} from 'react-native-elements';

export default class AddPartScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Add new part',
  };
  state = {
    name: '',
    barcode: '',
  };

  componentWillReceiveProps(newProps) {
    if (newProps.addPartSuccess) {
      this.props.navigation.goBack();
    }
  }

  render() {
    if (this.props.isAddingPart) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
          <Text>Adding part...</Text>
        </View>
      );
    }
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          placeholder={'Enter part name'}
          onChangeText={text => this.setState({ name: text })}
        />

        <FormLabel>Barcode</FormLabel>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '87%' }}>
            <FormInput
              placeholder={'Enter barcode or scan'}
              onChangeText={text => this.setState({ barcode: text })}
            />
          </View>
          <Icon name={'camera'} />
        </View>
        {this.renderError()}
        <Icon name={'check'} raised reverse onPress={this.addPart.bind(this)} />
      </View>
    );
  }

  addPart() {
    const { name, barcode } = this.state;
    const { ticket, addPart } = this.props;

    addPart(ticket, { name, barcode });
  }

  renderError() {
    if (this.props.addPartFailure) {
      return (
        <FormValidationMessage>
          {this.props.addPartFailure}
        </FormValidationMessage>
      );
    }
  }
}
