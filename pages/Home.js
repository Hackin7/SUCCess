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
import Storage from 'expo-storage';
import { ListCustom } from '../components/ListItem';
//// Viewing Rations ////////////////////////////////////////////////////

import { useIsFocused } from "@react-navigation/native";

function Home({navigation, route}){
    const [date, setDate] = useState();
    
    const isFocused = useIsFocused();
    
    const [eventData, setEventData] = useState([]); 
    useEffect(()=>{
        if (!isFocused){return;}
        Storage.getItem({ key: `eventdata`}).then((value)=>{
          let data = JSON.parse(value);
          console.log("LoadingEventData", data);
          if (data){
              setEventData( data );
              console.log("loaded", data);
          }else{
              Storage.setItem({key:'eventdata', value: "[]"}).catch((err)=>{
                console.log(err);
                console.log("Cannot Save Event Data");
              });
          }
        }).catch((err)=>{
            console.log(err);
            console.log('Updating Event Data');
            Storage.setItem({key:'eventdata', value: "[]"}).catch((err)=>{
              console.log(err);
              console.log("Cannot Save Event Data");
            });
        });
      }, [isFocused]);
      
      
    const [userData, setUserData] = useState({name:'User'})
    useEffect(()=>{
        if (!isFocused){return;}
        Storage.getItem({ key: `userdata`}).then((value)=>{
          let data = JSON.parse(value);
          console.log("userdata", data);
          if (data){
              setUserData( data );
          }else{
          }
        }).catch((err)=>{
          console.log(err);
          console.log('UserDataIssue');
        });
    }, [isFocused]); //[navigation]);
    
    return (
      <ScrollView>
      <Text style={{marginLeft:20,marginTop:10, fontSize:20, fontWeight: 'bold'}}>
        Welcome, {userData.name}{/*`Select ${date ? convertDate(new Date(date)): "null"} to ${date ? convertDate(addDays(new Date(date), 6)): "null"}`*/}
      </Text>
      <View style={{padding:10}}/>
      <CalendarPicker
          weekdays={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
          onDateChange={setDate}
          startFromMonday={true}
          disabledDates={date => {
            let [year, month, day] = JSON.stringify(date).slice(1,11).split('-');
            //let mondays = mondaysInMonth(parseInt(month), parseInt(year));
            //if (mondays.includes(parseInt(day))) return false;
            return false;
          }}
        />
          
          <Text style={{marginLeft:20,marginTop:10, fontSize:20, fontWeight: 'bold'}}>Upcoming Events</Text>
          <View style={{alignItems: 'center',
            flex: 1,
            justifyContent: 'center', padding:10}}
          >
              <ListCustom data={eventData}/>
              {/*JSON.parse(JSON.stringify(eventData)).map((Objective, index)=><TouchableOpacity key={index} style={styles.element} onPress={Objective.callback ? Objective.callback : ()=>{console.log(Objective);}}>
      <Objective.Logo height={100} width={50}/>
      <View style={{width: 10, height: 20}} />
      <Text style={{width: "60%"}}>{Objective.text}</Text>
    </TouchableOpacity>)*/}
              {/*<Text>{JSON.stringify(eventData)}{JSON.stringify(userData)}</Text>*/}
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


export {Home};
