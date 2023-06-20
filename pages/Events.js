import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, TextInput, View, Button, 
  TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { mondaysInMonth, addDays, convertDate} from '../helpers/dateHelpers.js';
import LogoDSTA from '../assets/Icons/dsta.svg';
//// Viewing Rations ////////////////////////////////////////////////////
function Events({navigation, route}){
    const [date, setDate] = useState();
    
    const [title, setTitle] = useState(route.params.eventName)
    const [Data, setData] = useState([{Logo:LogoDSTA, text:'Hello'}, {Logo:LogoDSTA, text:'Hello'}, {Logo:LogoDSTA, text:'Hello'}]);
    useEffect(()=>{
      switch (route.params.eventName){
        case "Work":
          setData([
            {Logo:LogoDSTA, text: 'DSTA Internship - Apply in August/ September'},
            {Logo:LogoDSTA, text: 'GovTech Internship - Apply in November'}
          ]);
          break;
        case "Study":
          setData([
            {Logo:LogoDSTA, text: 'NUS iBLOCS CS1010X - Register in October'},
            {Logo:LogoDSTA, text: 'NUS Advanced Placement Test (APT) MA1505 - Register in May, Test in end June'},
            {Logo:LogoDSTA, text: 'NUS Special Term 2 - Register in March, June-July'}
          ]);
          break;
        case "Travel":
          setData([
            {Logo:LogoDSTA, text: 'Japan'},
            {Logo:LogoDSTA, text: 'Korea'}
          ]);
          break;
      }
    }, [navigation]);
    return (
      <ScrollView>
          <Text style={{marginLeft:20,marginTop:10, fontSize:20, fontWeight: 'bold'}}>
            {title}
          </Text>
          <View style={{alignItems: 'center',
            flex: 1,
            justifyContent: 'center', padding:10}}
          >
            
              {Data.map((Objective)=><TouchableOpacity style={styles.element} onPress={()=>{}}>
                {/*<Image source={Gallery} style={styles.image} />*/}
                <Objective.Logo height={100}/>
                <View style={{width: 10, height: 20}} />
                <Text>{Objective.text}</Text>
              </TouchableOpacity>)}
          </View>
          
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: '35%',
    marginVertical: 20,
    height: 150,
    elevation: 10,
    padding: 20,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10
  },
  element: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '95%',
    marginVertical: 5,
    height: 80,
    elevation: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    height: 30,
    width: 30
  },
  card: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    padding: 30,
    borderRadius: 10,
    width: '95%',
    margin: "auto"
  },
  imageContainer: {
    width: '95%',
    height: 300,
    elevation: 10,
    padding: 30,
    borderRadius: 10
  },
});


export {Events};
