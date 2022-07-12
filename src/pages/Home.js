import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Global from '../styles/Global';
import Theme from '../styles/Theme';
import { Input } from '../components/Input';
import { Item } from '../components/Item';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({ navigation }) {

  const keyAsyncStorage = "@gitnetwork:users";

  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState([]);

  function navigationDetails(login) {
    navigation.navigate('details', { user: login });
  }

  async function handleSearchUser() {
    try {
      response = await api.get('/users/' + nickname);
      const { data } = response;

      const obj = {
        id: data.id,
        nome: data.name,
        login: data.login,
        avatar_url: data.avatar_url,
      }

      const dataUser = [...users, obj];

      try {
        await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(dataUser))
      } catch (error) {
        console.error(error);
      }

      setNickname('');
      Keyboard.dismiss();
      loadData();

    } catch (error) {
      console.error(error);
    }
  }

  async function loadData() {
    try {
      const retorno = await AsyncStorage.getItem(keyAsyncStorage);
      const parseJson = JSON.parse(retorno);
      setUsers(parseJson || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => loadData());
  }, [navigation]);

  return (

    <View style={Global.screenContainer}>
      <AntDesign name="github" size={98} color={Theme.colors.primary} />
      <Text style={styles.title}>GIT.Networking </Text>
      <Input placeholder="Digite o nickname do usuário" value={nickname}
        onChangeText={setNickname} onPress={handleSearchUser} />

      <FlatList data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Item name={item.login} avatar={item.avatar_url} onPress={() => navigationDetails(item.login)} />
        )}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.primary,
  }
})