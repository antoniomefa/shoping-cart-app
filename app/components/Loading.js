import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Modal} from 'react-native';

export default function Loading(props) {
  const {isVisible, text} = props;

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color={'#F47205'} />
        { text && <Text style={styles.text}>{text}</Text> }
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    marginTop: 10,
    color: 'white'
  },
});
