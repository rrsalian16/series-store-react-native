import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {Container, Form, Input, Item, Button, H1} from 'native-base';

import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation, route}) => {
  const [name, setName] = useState("");
  const [totalNoOfSeason, setTotalNoOfSeason] = useState("");

  const onAddList = async () => {
    if (!name || !totalNoOfSeason) {
      alert('Please add valid entry in both field');
    }

    const seasonToAdd = {
      id: shortid.generate(),
      name,
      totalNoOfSeason,
      isWatched: false,
    };

    const storedValue = await AsyncStorage.getItem('@season_list');
    const prevList = await JSON.parse(storedValue);

    if (!prevList) {
      const newList = [seasonToAdd];
      await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    } else {
      prevList.push(seasonToAdd);
      await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
    }

    setName('');
    setTotalNoOfSeason('');
    navigation.navigate('Home');
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H1 style={styles.heading}>Add to watach List</H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Season Name"
              style={{color: '#eee', paddingLeft: 20}}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Toatal No. of Season"
              style={{color: '#eee', paddingLeft: 20}}
              value={totalNoOfSeason}
              onChangeText={(text) => setTotalNoOfSeason(text)}
            />
          </Item>
          <Button onPress={onAddList} rounded block style={styles.formItem}>
            <Text style={{color: '#eee', fontSize: 20}}>ADD</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
