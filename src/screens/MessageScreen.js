import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
// import { Container } from './styles';

const MessageScreen = () => {
  return (
      <View style={styles.container}>
          <Text>Message Screen</Text>
      </View>
  )
}

export default MessageScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})