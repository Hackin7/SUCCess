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
function Home({navigation, route}){
    const [date, setDate] = useState();
    
    return (
      <ScrollView>
      <Text style={{padding:10}}>{`Select ${date ? convertDate(new Date(date)): "null"} to ${date ? convertDate(addDays(new Date(date), 6)): "null"}`}
      </Text>
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
            
              {[1, 2, 3, 4, 5].map(()=><TouchableOpacity style={styles.element} onPress={()=>{}}>
                {/*<Image source={Gallery} style={styles.image} />*/}
                <LogoDSTA height={100}/>
                <View style={{width: 10, height: 20}} />
                <Text>Open Gallery</Text>
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


export {Home};
