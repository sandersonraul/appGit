import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import Global from '../styles/Global';
import Theme from '../styles/Theme';
import api from '../services/api';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Details({ route,navigation }) {

  const keyAsyncStorage = "@gitnetwork:users";

  const [user, setUser] = useState({});

  async function carregarUsuarios(nickname) {
    try {
      response = await api.get('/users/' + nickname);
      const { data } = response;

      const obj = {
        id: data.id,
        name: data.name,
        login: data.login,
        company: data.company,
        bio: data.bio,
        avatar_url: data.avatar_url,
        url: data.url,
        public_repos: data.public_repos,
        followers: data.followers,
      }

      setUser(obj);
      console.log(obj);

    } catch (error) {
      console.error(error);
    }
  }

  async function deleteUser(id) {
    try {
        const retorno = await AsyncStorage.getItem(keyAsyncStorage);
        const parseJson = JSON.parse(retorno);

        const newData = parseJson.filter(item => item.id != id);
        await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(newData));

        navigation.navigate('Home');

    } catch(error) {
        console.error(error);
    }
}


  useEffect(() => {
    const { user } = route.params;
    carregarUsuarios(user);

  }, []);


  return (
    <View style={Global.screenContainer}>
      <View style={styles.perfil}>
        <Image style={styles.tinyLogo} source={{ uri: user.avatar_url }} />
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.textSmall}>{user.url}</Text>
        {user.company && <Text style={styles.textRegular}>Empresa: {user.company}</Text>}

        <Text style={styles.textRegular}> {user.bio}</Text>

      </View>

      <View style={styles.info}>

        <View >
          <Text style={styles.titleInfo}>Repositórios</Text>
          <View style={styles.infoCount}>
            <MaterialCommunityIcons name="source-repository" size={50} color="black" />
            <Text style={styles.textCount}>{user.public_repos}</Text>
          </View>
        </View>

        <View >
          <Text style={styles.titleInfo}>Seguidores</Text>
          <View style={styles.infoCount}>
            <FontAwesome5 name="users" size={40} color="black" />
            <Text style={styles.textCount}>{user.followers}</Text>
          </View>
        </View>
      </View>

      <View style={styles.viewDelete}>
                <TouchableOpacity style={styles.btnDelete} onPress={() => deleteUser(user.id)}>
                    <Text style={styles.txtDelete}>Remover</Text>
                </TouchableOpacity>
            </View>

    </View>

  );
}

const styles = StyleSheet.create({
  perfil: {
    alignItems: 'center',
  },
  info: {
    marginTop: 70,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
  },
  infoCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textCount: {
    fontSize: 25,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.black
  },
  titleInfo: {
    fontSize: 22,
    fontFamily: Theme.fonts.rebotoRegular,
  },
  title: {
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.primary,
  },
  textSmall: {
    fontSize: 14,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray
  },
  textRegular: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray
  },

  tinyLogo: {
    width: 140,
    height: 140,
    borderRadius: 90,
  },
  btnDelete: {
    height: 50,
    width: 200,
    borderRadius: 15,
    backgroundColor: Theme.colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
},
txtDelete: {
    fontSize: 25,
    color: '#FFF'
},
viewDelete: {
  marginTop: 100,
  width: '90%',
  alignItems: 'center'
},

})