import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Storage from 'expo-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { FieldsToForm } from '../components/FieldsToForm';

const monthMapping = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function BottomNavigation({backCallback, nextCallback}){
  return (<>
    {backCallback?<Button 
      onPress={backCallback} 
      color="#696969" 
      style={{ backgroundColor: "#696969", marginTop:50, padding:10 }} 
      title='Back' 
    />:<></>}
    <Button 
      onPress={nextCallback} 
      color="#696969" 
      style={{ backgroundColor: "#696969", marginTop:50, padding:10 }} 
      title='Next' 
    />
  </>);
  
}
function TypeFormRipoff({navigation, prompt, tip, field}){
    useEffect(() => {
        navigation.setOptions({
            headerShown: false 
            //headerRight: () => <Button onPress={addColor} title="Add"/>,
        });
    });
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize:40, maxWidth:"95%"}}>{prompt}</Text>
          <Text style={{margin:10, maxWidth:"80%", textAlign:'center'}}>{tip}</Text>
          <View style={{padding:5}}></View>
          {field}
      </View>
    );
}


function Start({navigation}){
  const [profileColour, setProfileColour] = useState("");
  const loginThroughNsPortal = async () => {
    //navigation.navigate("Home", {cookie:cookie})
    navigation.navigate("BasicDetails")
  };
  return (
    <TypeFormRipoff 
      navigation={navigation}
      prompt="SUCCess" 
      tip="Unlock your potential"
      field={
        <>
      <Button 
        onPress={()=>{navigation.navigate("Main")}} 
        color="#696969" 
        style={{ backgroundColor: "#696969", marginTop:50}} 
        title='Back' 
      />
      <Button 
        onPress={loginThroughNsPortal} 
        color="#696969" 
        style={{ backgroundColor: "#696969", marginTop:50}} 
        title='Next' 
      />
    </>
      }/>
  );
}

function BasicDetails({navigation}){
  const [profileColour, setProfileColour] = useState("");
  const loginThroughNsPortal = async () => {
    //navigation.navigate("Home", {cookie:cookie})
    const dataFormat = {
      name:fieldVars[0][0],
      ordMonth:fieldVars[1][0],
      interest:fieldVars[2][0],
    }
    navigation.navigate("MonthPlanning", {data:dataFormat})
  };
  const fields = [
    {name:"Name", key:'name'}, 
    {name:"ORD Month", key:'startDate', options:["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]},
    {name:"Interest", key:'interest', options:["Math/Science", "Engineering", "Computing", ]},
    //{name:"Uni  Month", key:'startDate', options:["Oct", "Nov", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]},
  ]
  const fieldVars = [useState(""), useState(""), useState("")];
  
  return (
    <TypeFormRipoff 
      navigation={navigation}
      prompt="Tell me more about yourself" 
      field={
        <>
          <FieldsToForm fields={fields} fieldVars={fieldVars}/>
          <View style={{padding:10}}/>
          <BottomNavigation nextCallback={()=>{loginThroughNsPortal();}}/>
        </>
      }/>
  );
}

function MonthPlanning({navigation, route}){
  const data = route.params.data;
  const next = async () => {
    navigation.navigate("MonthPlanningFeedback", {data: {...data, months:months, preference:preference}})
  };
  const [months, setMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"])
  const [preference, setPreference] = useState({})
  useEffect(() => {
        let newMonth = [];
        let index = monthMapping.indexOf(data.ordMonth);
        while (index !=7){
          newMonth.push(monthMapping[index]);
          index += 1;
          if (index >= 12){
            index = 0;
          }
        }
        setMonths(newMonth);
    }, [navigation]);
  return <TypeFormRipoff 
      navigation={navigation}
      prompt="Month Planning" 
      tip="What would you like to do during these months"
      field={
        <>
        { 
          months.map((element, index) =>
            <View style={{ padding: 10, fontSize: 18, height: 44, flexDirection: "row" }}
              key={index}
            >
                <Text>{element}: </Text>
                  <Dropdown
                    data={[{"label":"Study", "value":"Study"}, {"label":"Work", "value":"Work"}, {"label": "Travel", "value": "Travel"}, {"label":"Break", value:"Break"}]}
                    labelField="label"
                    valueField="value"
                    value={preference[element]}
                    style={{marginLeft: 'auto', minWidth:160}}
                    onChange={item => {
                      let data = { ...preference };
                      data[element] = item
                      setPreference(data);
                    }}
                  />
            </View>)
          }
          <BottomNavigation nextCallback={()=>{next();}}/>
        </>
      }/>
}
 
function algo(data){
  let message = '';
  const impt = [
    { cat: "study", desc: "NUS iBLOC", month: [1, 2, 3, 4, 5, 6] },
    { cat: "work", desc: "DSTA Internship", month: [3, 6, 7] },
    { cat: "study", desc: "NUS Special Term I", month: [6] }
  ];
/*
  const data = [
    {},
    { month: 2, cat: "study" },
    { month: 3, cat: "work" },
    { month: 4, cat: "break" },
    { month: 5, cat: "travel" },
    { month: 6, cat: "break" },
    { month: 7, cat: "study" }
  ];*/

  let clash = false;
  const clash_lst = [];
  
  for (let i=0; i<data.length; i++) {
    let monthData = data[i];
    console.log(monthData);
    
    for (const mo of data) {
      //let clash = false;
      //const clash_lst = [];

      for (const item of impt) {
        if (item.month.includes(mo.month)) {
          if (mo.cat !== item.cat) {
            clash = true;
            clash_lst.push({...item, ogMonth: mo.month, ogCat:mo.cat});
          } else {
            //clash = false;
            //break;
          }
        }
      }
    }
    if (clash) {
      for (const i of clash_lst) {
        message += (`${monthMapping[i.ogMonth-1]}: You chose ${i.ogCat} but there is ${i.desc} (${i.cat})\n`);
      }
      return message;
    }
    //return JSON.stringify(clash)+JSON.stringify(clash_lst)+JSON.stringify(data);
    return "Generally looks good!";
  }
}

function MonthPlanningFeedback({navigation, route}){
  const data = route.params.data;
  const months = route.params.data.months;
  const [message, setMessage] = useState("Loading");
  useEffect(()=>{
    setMessage(
      algo(months.map((month)=>{
        const monthIndex = monthMapping.indexOf(month) + 1;
        if (!data.preference[month])return {}
        return {month:monthIndex, cat:data.preference[month].value.toLowerCase()}
      }))
    )
    }, [navigation])
  function save(){
      Storage.setItem({ key: `userdata`, value: JSON.stringify(data) })
      .then(() => {
        console.log("saved");
        navigation.navigate("Main");
      }, (err) => {console.log(err);})
  }
  
   useEffect(() => {
        navigation.setOptions({
            headerShown: false 
            //headerRight: () => <Button onPress={addColor} title="Add"/>,
        });
    });
    return (
      <ScrollView style={{marginTop:60, "margin":20}}>
          <Text style={{fontSize:40, maxWidth:"95%"}}>{"Month Planning"}</Text>
          <Text style={{margin:10, maxWidth:"80%", textAlign:'center' }}>{message}</Text>
          { 
          months.map((element, index) =>
            <View style={{ padding: 10, fontSize: 18, height: 44, flexDirection: "row" }}
              key={index}
            >
                <Text>{element}: </Text>
                <Text>{data.preference[element] ? data.preference[element].value : "nil"}</Text>
            </View>)
          }
          <BottomNavigation backCallback={()=>navigation.goBack()} nextCallback={save}/>
      </ScrollView>
    );
}
function Setup({navigation}) {
  useEffect(() => {
        navigation.setOptions({
            headerShown: false 
            //headerRight: () => <Button onPress={addColor} title="Add" />,
        });
    });
  const [profileColour, setProfileColour] = useState("");
  const out = async () => {
    //navigation.navigate("Home", {cookie:cookie})
    navigation.navigate("Main")
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={Start}  initialParams={{ topNavigation:navigation }}/>
      <Stack.Screen name="BasicDetails" component={BasicDetails}  initialParams={{ topNavigation:navigation }}/>
      <Stack.Screen name="MonthPlanning" component={MonthPlanning}  initialParams={{ topNavigation:navigation }}/>
      <Stack.Screen name="MonthPlanningFeedback" component={MonthPlanningFeedback}  initialParams={{ topNavigation:navigation }}/>
      {/*<Stack.Screen name="Description" component={EventDescription} initialParams={{ topNavigation:navigation }}/>*/}
    </Stack.Navigator>
  );
}

export {Setup};
