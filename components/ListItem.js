import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, TextInput, View, Button, 
  TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { mondaysInMonth, addDays, convertDate} from '../helpers/dateHelpers.js';
import Storage from 'expo-storage';

import LogoDSTA from '../assets/Icons/dsta.svg';
import LogoMindef from '../assets/Icons/mindef.svg';
import LogoAstar from '../assets/Icons/astar.svg';
import LogoPsc from '../assets/Icons/psc.svg';
import LogoGovtech from '../assets/Icons/govtech.svg';
import LogoNus from '../assets/Icons/nus.svg';

function ListCustom(props){
  const data = props.data;
  //if (!data){return <Text>Loading</Text>;}
  console.log("List Custom", data);
  return <>
    {/*<Text>{JSON.stringify(data)}</Text>*/}
    {data.map ? data.map((Objective, index)=>{
      let test = {'DSTA Internship':LogoDSTA, 'GovTech Internship': LogoGovtech, 'A*STAR Attachment in Research Institutes': LogoAstar, 'NUS Internal Blended Learning Online Course (iBLOCs) for Returning Full-time National Service (NS) men': LogoNus, "Public Service Commission Scholarship": LogoPsc, 'Singapore Armed Forces Scholarship': LogoMindef, 'National Science Scholarship - BS': LogoAstar};
      let Logo = Objective.Logo ? Objective.Logo: (test[Objective.title]? test[Objective.title]: LogoDSTA);
      return <TouchableOpacity key={index} style={styles.element} onPress={Objective.callback ? Objective.callback : ()=>{console.log(Objective);}}>
        <Logo height={100} width={50}/>
        <View style={{width: 10, height: 20}} />
        <Text style={{width: "60%"}}>{Objective.text}</Text>
      </TouchableOpacity>
    }) : <></>}
    </>;
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


export { ListCustom };
