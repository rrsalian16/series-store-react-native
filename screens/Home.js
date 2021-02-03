import React,{useState,useEffect} from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import { Fab,Text, Icon,List,ListItem,Left, Button,Body,Right,CheckBox,Title,H1, Container,Spinner } from "native-base";

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {

    const isFocused=useIsFocused();

    const [seasonList, setSeasonList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getSeasonList = async ()=>{
        setLoading(true)
        const sList=await AsyncStorage.getItem("@season_list")
        if(sList){
            setSeasonList(JSON.parse(sList))
        }
        setLoading(false)
    }

    const deleteSeason=async(id)=>{
        setLoading(true);
        const newList = await seasonList.filter(s=>s.id!==id);

        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        setSeasonList(newList);
        setLoading(false);
    }

    const markComplete=async(id)=>{
        setLoading(true)
        const newList= await seasonList.map(season=>{
            if(season.id===id){
                season.isWatched = !season.isWatched;
            }
            return season;
        })

        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
        setSeasonList(newList)
        setLoading(false)
    }

    useEffect(() => {
      getSeasonList();
    }, [isFocused]);

    if(loading){
        return(
            <Container style={styles.container}>
                <Spinner color="#00b7c2">
                </Spinner>
            </Container>
        )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {seasonList.length === 0 ? (
          <Container style={styles.container}>
            <H1 style={styles.heading}>
              Watch List is Empty, Please add a season
            </H1>
          </Container>
        ) : (
          <>
            <H1 style={styles.heading}>Next series to watch</H1>
            <List style={styles.listItem} nobar>
              {seasonList.map((season) => (
                <ListItem key={season.id}>
                  <Left>
                    <Button
                      onPress={() => deleteSeason(season.id)}
                      style={styles.actionButton}
                      danger>
                      <Icon name="trash" active />
                    </Button>
                    <Button style={styles.actionButton}
                    onPress={()=>navigation.navigate("Edit",{season})}
                    >
                      <Icon active name="edit" type="Feather" />
                    </Button>
                  </Left>
                  <Body>
                    <Title style={styles.seasonName}>{season.name}</Title>
                    <Text note>{season.totalNoOfSeason}</Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={season.isWatched}
                      onPress={() => markComplete(season.id)}></CheckBox>
                  </Right>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Fab
          style={{backgroundColor: '#5067ff'}}
          position="bottomRight"
          onPress={() => navigation.navigate('Add')}>
          <Icon name="add"></Icon>
        </Fab>
      </ScrollView>
    );
}

export default Home

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
