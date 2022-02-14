import React from 'react';
import {WebView} from 'react-native-webview';
import styles from './PaymentFormStyles';

export default function PaymentFormView(props) {
  return (
    <WebView
      style={{flex: 1}}
      renderLoading={props.renderLoading}
      scalesPageToFit={true}
      onMessage={event => props.onMessage(event)}
      source={{uri: props.paymentUrl}}
      startInLoadingState={true}
    />
  );
}
