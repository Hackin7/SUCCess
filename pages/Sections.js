import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, TextInput, View, Button, 
  TouchableOpacity, ScrollView, Dimensions, Image
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { mondaysInMonth, addDays, convertDate} from '../helpers/dateHelpers.js';

import LogoCal from '../assets/Icons/calendar.svg';
import LogoWork from '../assets/Icons/work.svg';
import LogoStudy from '../assets/Icons/study.svg';
import LogoTravel from '../assets/Icons/travel.svg';
//// Viewing Rations ////////////////////////////////////////////////////
function Sections({navigation, route}){
    const [date, setDate] = useState();
    
    return (
      <ScrollView style={{"margin":"auto", padding: 20}}>
          <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
              <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <LogoWork width={70} height={70}/>
                <Text>Work/ Internships</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.button} onPress={()=>{}}>
                <LogoStudy width={70} height={70}/>
                <Text>Study/ Prepatory Courses</Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
              <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <LogoTravel width={70} height={70}/>
                <Text>Travel Plans</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.button} onPress={()=>{}}>
                {/*<Image source={Camera} style={styles.image} />*/}
                <LogoStudy width={70} height={70}/>
                <Text>Scholarship</Text>
              </TouchableOpacity>
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
    padding: 10,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    height: 70,
    width: 70
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


export {Sections};
