/**
 * @flow
 */

import React from 'react';

import { View, ActivityIndicator, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';

export default class AuthScreen extends React.Component<{}> {
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
    if (this.props.isLoggingIn) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
          <Text>Logging in...</Text>
        </View>
      );
    }

    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ email: text })}
          keyboardType={'email-address'}
          placeholder={'Enter your email'}
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          placeholder={'Enter your password'}
        />
        {this.renderError()}
        <Button title={'Sign in'} onPress={this.login.bind(this)} />
      </View>
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
