import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

// import { Container } from './styles';

const NotificationScreen = () => {
  return (
      <View style={styles.container}>
          <Text>Notification Screen</Text>
      </View>
  )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})