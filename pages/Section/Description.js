import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, TextInput, View, Button, 
  TouchableOpacity, ScrollView, Dimensions, Linking
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { mondaysInMonth, addDays, convertDate} from '../../helpers/dateHelpers.js';
import LogoDSTA from '../../assets/Icons/dsta.svg';
import { ListCustom } from '../../components/ListItem';

import Storage from 'expo-storage';

function findObject(arr, obj){
  for (let i=0; i<arr.length; i++){
    if (arr[i].text == obj.text){
      return i;
    }
  }
  return -1;
}
//// Viewing Rations ////////////////////////////////////////////////////
function EventDescription({navigation, route}){
    const event = route.params.event;
    const [date, setDate] = useState();
    
    const [title, setTitle] = useState(event.text)
    const [Data, setData] = useState([{Logo:LogoDSTA, text:'Hello'}, {Logo:LogoDSTA, text:'Hello'}, {Logo:LogoDSTA, text:'Hello'}]);
    const [status, setStatus] = useState(false);
    
    const [eventData, setEventData] = useState([])
    useEffect(()=>{
        Storage.getItem({ key: `eventdata`}).then((value)=>{
          let data = JSON.parse(value);
          console.log(data);
          if (data){
              console.log("LoadingEventData");
              setEventData( data );
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
      }, [navigation]);
      useEffect(()=>{
        const index = findObject(eventData, event);
        console.log("Event Status");
        console.log(eventData, index);
        setStatus(index !== -1);
      }, [eventData]);
    
    const handleClick = () => {
      Linking.canOpenURL(event.link).then(supported => {
        if (supported) {
          Linking.openURL(event.link);
        } else {
          console.log("Don't know how to open URI: " + event.link);
        }
      });
    };
    const updateEventData = (x)=>{
      setEventData(x);
     Storage.setItem({key:'eventdata', value: JSON.stringify(x)}).then(()=>{
       console.log("Success");
       console.log(x);
      }).catch((err)=>{
        console.log(err);
        console.log("Cannot Save Event Data");
      });
    }
    const addRemove = () =>{
      if (status){ // Remove
        const eventDataCopy = [...eventData]
        const index = findObject(eventDataCopy, event);
        if (index > -1) {
          eventDataCopy.splice(index, 1);
        }
        updateEventData(eventDataCopy);
      }else{
        const eventDataCopy = [...eventData]
        eventDataCopy.push(event);
        updateEventData(eventDataCopy);
      }
      setStatus(!status);
      
    }
    return (
      <ScrollView>
          <Text style={{marginLeft:20,marginTop:10, fontSize:20, fontWeight: 'bold'}}>
            {event.title}
          </Text>
          <View style={{padding:20, paddingTop:0, paddingBottom:0}}
          >
            <Text>{event.description}</Text>
          </View>
          {/*<View style={{alignItems: 'center',
            flex: 1,
            justifyContent: 'center', padding:10}}
          >
          </View>*/}
          <View style={{paddingLeft:10, paddingRight:10}} >
            <Button onPress={handleClick} title={"Read More"} />   
            <View style={{padding:5}}/>
            <Button style={{paddingTop:10}} onPress={addRemove} title={status ? "Remove" : "Add"} />   
          </View>
          {/*<Text>{JSON.stringify(eventData)}</Text>*/}
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


export {EventDescription};
