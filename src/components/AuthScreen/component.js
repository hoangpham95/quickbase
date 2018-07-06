/**
 * @flow
 */

import React from 'react';

import { Image, View, ActivityIndicator, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';

import styles from 'src/components/AuthScreen/styles';
import { COLOR_PRIMARY } from 'src/theme';

export default class AuthScreen extends React.Component<{}> {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    const { checkToken } = this.props;
    checkToken();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.ticket && newProps.ticket.length > 0) {
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Image
          style={styles.imageStyle}
          source={require('src/image/quickbase.jpg')}
        />
        <FormLabel labelStyle={styles.labelStyle}>Email</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ email: text })}
          keyboardType={'email-address'}
          placeholder={'Enter your email'}
        />

        <FormLabel labelStyle={styles.labelStyle}>Password</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          placeholder={'Enter your password'}
        />
        {this.renderError()}
        {this.renderSignIn()}
      </View>
    );
  }

  renderSignIn() {
    if (this.props.isLoggingIn) {
      return (
        <ActivityIndicator
          style={styles.button}
          size={'large'}
          color={COLOR_PRIMARY}
        />
      );
    }
    return (
      <Button
        containerViewStyle={styles.button}
        backgroundColor={COLOR_PRIMARY}
        title={'Sign in'}
        onPress={this.login.bind(this)}
      />
    );
  }

  login() {
    const { email, password } = this.state;
    this.props.login({ email, password });
  }

  renderError() {
    if (this.props.loginFailure) {
      return (
        <FormValidationMessage>{this.props.loginFailure}</FormValidationMessage>
      );
    }

    return null;
  }
}
