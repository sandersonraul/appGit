import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image} from 'react-native';
import Theme from '../styles/Theme'; 
import { Ionicons } from '@expo/vector-icons'; 


export function Item(props) {
  return (
      <View style={styles.container}>
          <View style={styles.txtImg}>
              <Image style={styles.avatar} source={{uri: props.avatar}} />
              <Text style={styles.nameUser}>{props.name}</Text>
          </View>
          <View></View>

          <View>
              <TouchableOpacity style={styles.btn} onPress={props.onPress}>
                  <Ionicons name="ios-eye-outline" size={30} color={Theme.colors.primary} />
              </TouchableOpacity>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
      marginTop: 20,
      width: 370,
      height: 60,
      backgroundColor: '#d3d3d3',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  nameUser: {
      paddingLeft: 10,
      fontSize: 20,
      fontFamily: Theme.fonts.robotoBold,
  },
  btn: {
      padding: 15,
      marginRight: 5,
  },
  avatar: {
      width: 50,
      height: 50,
      borderRadius: 100
  },
  txtImg: {
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center',
  }
});
