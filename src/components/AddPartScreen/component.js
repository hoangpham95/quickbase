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
import { RNCamera } from 'react-native-camera';

import styles from 'src/components/AddPartScreen/styles';
import { COLOR_PRIMARY } from 'src/theme';

export default class AddPartScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Add new part',
    headerStyle: styles.headerStyle,
    headerTintColor: 'white',
  };

  state = {
    showCamera: false,
    name: '',
    barcode: '',
  };

  componentWillReceiveProps(newProps) {
    if (newProps.addPartSuccess) {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <FormLabel labelStyle={styles.labelStyle}>Name</FormLabel>
        <FormInput
          placeholder={'Enter part name'}
          onChangeText={text => this.setState({ name: text })}
        />

        <FormLabel labelStyle={styles.labelStyle}>Barcode</FormLabel>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '87%' }}>
            <FormInput
              value={this.state.barcode}
              keyboardType={'number'}
              placeholder={'Enter barcode or scan'}
              onChangeText={text => this.setState({ barcode: text })}
            />
          </View>
          {this.renderCameraButton()}
        </View>
        {this.renderCamera()}
        {this.renderError()}
        {this.renderAddButton()}
      </View>
    );
  }

  addPart() {
    const { name, barcode } = this.state;
    const { ticket, addPart } = this.props;

    addPart(ticket, { name, barcode });
  }

  renderCameraButton() {
    const iconName = this.state.showCamera ? 'close' : 'camera-alt';
    const onClick = prevState => ({
      showCamera: !prevState.showCamera,
    });
    return (
      <Icon
        name={iconName}
        color={COLOR_PRIMARY}
        onPress={() => this.setState(onClick)}
      />
    );
  }

  renderCamera() {
    if (this.state.showCamera) {
      return (
        <RNCamera
          style={{ flex: 1 }}
          barcodeFinderVisible={this.state.showCamera}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
        />
      );
    }

    return null;
  }

  onBarCodeRead(scanResult) {
    if (scanResult.data) {
      this.setState(prevState => ({
        barcode: scanResult.data,
        showCamera: false,
      }));
    }
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

  renderAddButton() {
    if (!this.state.showCamera) {
      if (this.props.isAddingPart) {
        return (
          <ActivityIndicator
            color={COLOR_PRIMARY}
            size={'large'}
            style={styles.fabButton}
          />
        );
      }
      return (
        <Icon
          color={COLOR_PRIMARY}
          containerStyle={styles.fabButton}
          name={'check'}
          raised
          reverse
          onPress={this.addPart.bind(this)}
        />
      );
    }

    return false;
  }
}
