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


function Home({navigation, route}){
    const [date, setDate] = useState();
    
    const [userData, setUserData] = useState({name:'User'})
    const [storedData, setStoredData] = useState([]); 
    
    useEffect(()=>{
        Storage.setItem('data', JSON.stringify([])).catch((err)=>{console.log(err);});
        //Storage.setItem('data', JSON.stringify([{Logo: LogoDSTA, text: 'DSTA Internship - Apply in August/ September'}]));
        Storage.getItem({ key: `data`}).then((value)=>{
          let data = JSON.parse(value);
          console.log(data);
          if (data){
              setStoredData( data );
          }else{
              let stuff = [];
              Storage.setItem('data', JSON.stringify(stuff)).catch((err)=>{console.log(err);});
              setStoredData(stuff);
          }
        }).catch((err)=>{console.log(err);});
        
        Storage.getItem({ key: `userdata`}).then((value)=>{
          let data = JSON.parse(value);
          console.log(data);
          if (data){
              setUserData( data );
          }else{
          }
        }).catch((err)=>{console.log(err);});
    }, [navigation]);
    
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
              <ListCustom data={[]}/>
              <Text>{JSON.stringify(storedData)}</Text>
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
