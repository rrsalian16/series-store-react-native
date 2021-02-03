import React, {useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import { Fab,Text, Icon,List,ListItem,Left, Button,Body,Right,CheckBox,Title,H1, Container,Spinner,Form,Item,Input } from "native-base";

import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation,route}) => {

    const [name, setName] = useState("");
    const [totalNoOfSeason, setTotalNoOfSeason] = useState('');
    const [id, setId] = useState(null);

    const updateList= async ()=>{
         if (!name || !totalNoOfSeason) {
      alert('Please add valid entry in both field');
      //TODO: Add SnackBar
    }

    const seasonToAdd = {
      id: id,
      name,
      totalNoOfSeason,
      isWatched: false,
    };

    const storedValue = await AsyncStorage.getItem('@season_list');
    const list = await JSON.parse(storedValue);

    list.map(s=>{
        if(s.id===id){
            s.name=name;
            s.totalNoOfSeason = totalNoOfSeason;
        }
        return s;
    })
    await AsyncStorage.setItem('@season_list', JSON.stringify(list));

    setName('');
    setTotalNoOfSeason('');
    navigation.navigate('Home');
    }

    useEffect(()=>{
        const {season}=route.params
        const {id, name, totalNoOfSeason} = season;

        setId(id);
        setName(name)
        setTotalNoOfSeason(totalNoOfSeason);
    },[])

    return (
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <H1 style={styles.heading}>Edit to watach List</H1>
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
            <Button onPress={updateList} rounded block style={styles.formItem}>
              <Text style={{color: '#eee', fontSize: 20}}>UPDATE</Text>
            </Button>
          </Form>
        </ScrollView>
      </Container>
    );
}

export default Edit

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
  },
});