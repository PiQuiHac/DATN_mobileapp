import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function SubmitButton(props) {
  const {title, action} = props;
  return (
    <TouchableOpacity
      style={styles.submitButton}
      onPress={action}
      activeOpacity={0.6}>
      <Text style={styles.submitText}>{title} </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#33CCFF',
    borderRadius: 100,
    overflow: 'hidden',
    width: '90%',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom: 10,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});