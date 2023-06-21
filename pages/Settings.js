import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Dialog from "react-native-dialog";
import Storage from 'expo-storage';
import ColorPicker from 'react-native-wheel-color-picker';

import { FieldsToForm } from '../components/FieldsToForm.js';

const sampleProfile = {NM:0, M:10, VC:0, VI:0};
function Profiles({navigation}){
    // Local Storage Code /////////////////////////////////////////////
    const [localData, setLocalData] = useState();
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            // https://stackoverflow.com/questions/68645892/how-do-i-update-react-native-component-when-click-on-tab-on-bottom-tab-navigato
            //Your refresh code gets here 
            console.log("Focus 1");
            Storage.getItem({ key: `data`}).then((value)=>{
              setLocalData(value);
              let data = JSON.parse(value).profiles;
              console.log(value);
              setPf( data );
            }).catch((err)=>{console.log(err);});
            setProfile(Object.keys(pf)[0]);
            changeProfile(profile);
        });
        return () => {
          unsubscribe();
        };
      }, [navigation]);
    
    const savePf = () => {
        // Generating temp data
        let tempdata = JSON.parse(localData);
        tempdata.profiles = pf;
        for (let field in fields){
          if (fields[field].key === undefined) continue;
          tempdata.profiles[profile][fields[field].key] = parseInt(fieldVars[field][0]);
        }
        //
        tempdata.profiles[profile].colour = profileColour;
        let data = JSON.stringify(tempdata)
        // Uploading
        Storage.setItem({ key: `data`, value: data }).then(()=>{
            console.log("Saved", data, tempdata);
            navigation.goBack(); // Feedback
        }).catch((err)=>{console.log(err);});
    }
    
    
    const [pf, setPf] = useState({ '' : {NM:0, M:0, VC:0, VI:0}});
    function addProfile(profile){
        let tempPf = pf;
        tempPf[profile] = sampleProfile;
        setPf(tempPf);
    }
    function removeProfile(profile){
        let tempPf = pf;
        delete tempPf[profile];
        setPf(tempPf);
    }
    function renameProfile(profile, newProfile){
      let tempPf = pf;
      tempPf[newProfile] = tempPf[profile];
      delete tempPf[profile];
      setPf(tempPf);
    }
    
    
    const fields = [
      {"name":"Normal"},
      {"name":"Non-Muslim", "key":"NM"},
      {"name":"Muslim", "key":"M"},
      {"name":"Vegetarian Chinese", "key":"VC"},
      {"name":"Vegetarian Indian", "key":"VI"},
      {"name":"Special Diet"},
      {"name":"Non-Muslim", "key":"SNM"},
      {"name":"Muslim", "key":"SM"},
      {"name":"Vegetarian Chinese", "key":"SVC"},
      {"name":"Vegetarian Indian", "key":"SVI"},
    ];
    
    const [alertVisible, setAlertVisible] = useState("none"); // none, add, rename
    const [oldProfileName, setOldProfileName] = useState("");
    const [newProfileName, setNewProfileName] = useState("");
    
    const [profile, setProfile] = useState(Object.keys(pf)[0]);
    let fieldVars = []; // Reference
    for (let field in fields){
      let value = "";  fieldVars.push(fields[field].key === undefined ? null : useState(String(value)));
    }
    const [profileColour, setProfileColour] = useState("");
    
    const changeProfile = (newProfile) => {
        //console.log("Change Profile");
        setProfile(newProfile);
        for (let field in fields){
          if (fields[field].key === undefined) continue;
          let value = pf[newProfile][fields[field].key];
          if (value === undefined) { fieldVars[field][1]("0"); continue; }
          fieldVars[field][1](String(value));
        } 
        
        if (pf[newProfile].colour) { setProfileColour(pf[newProfile].colour); }
    };
    
    return (
    <ScrollView>
      <View style={{padding:10, flex: 1}}>
        {/*https://www.npmjs.com/package/react-native-dialog https://stackoverflow.com/questions/52557142/using-react-native-dialog-how-to-get-dialog-input-content*/}
        <Dialog.Container visible={alertVisible==="add"}>
          <Dialog.Title>Add Profile</Dialog.Title>
          {/*<Dialog.Description>Enter the profile name {JSON.stringify(newProfileName)}</Dialog.Description>*/}
          <Dialog.Input label="New Profile Name" value={newProfileName} 
          onChangeText={setNewProfileName}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={()=>{
              setAlertVisible("none");
          }}/>
          <Dialog.Button label="Add" onPress={()=>{
              addProfile(newProfileName);
              changeProfile(newProfileName);
              setAlertVisible("none");
          }}/>
        </Dialog.Container>
        
        <Dialog.Container visible={alertVisible==="rename"}>
          <Dialog.Title>Rename Profile</Dialog.Title>
          {/*<Dialog.Description> </Dialog.Description>*/}
          <Dropdown
            data={Object.keys(pf).map((item) => {return {"label":item, "value":item}})}
            labelField="label"
            valueField="value"
            value={oldProfileName}
            style={{marginBottom:10}}
            onChange={item => {
              setOldProfileName(item.value);
            }}
        />
          <Dialog.Input label="New Profile Name" value={newProfileName} 
            onChangeText={setNewProfileName}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={()=>{
              setAlertVisible("none");
          }}/>
          <Dialog.Button label="Rename" onPress={()=>{
              renameProfile(oldProfileName, newProfileName);
              changeProfile(newProfileName);
              setAlertVisible("none");
          }}/>
        </Dialog.Container>
      <Dropdown
            data={Object.keys(pf).map((item) => {return {"label":item, "value":item}})}
            labelField="label"
            valueField="value"
            value={profile}
            style={{}}
            onChange={item => {
              let v = undefined;
              if (item.value !== ""){
                v = item.value;
              }
              changeProfile(v);
            }}
        />
        <View style={{ margin:"auto", flexDirection: "row", padding:10, }}>
          <Button style={{marginLeft:"100"}} onPress={()=>{
              setAlertVisible("add");
          }} title="Add" />   
          <View style={{padding:10}}></View>
          <Button onPress={()=>{
              if (Object.keys(pf).length <= 1) return;
              removeProfile(profile);
              changeProfile(Object.keys(pf)[0]);
          }} style={{marginRight:50, color:"red"}} title="Remove" />
          <View style={{padding:10}}></View>
          <Button onPress={()=>{
              setAlertVisible("rename");
          }} style={{marginRight:50, color:"red"}} title="Rename" />
        </View>
        
        <ColorPicker
					color={profileColour}
					onColorChange={setProfileColour}
					thumbSize={40}
					sliderSize={40}
					noSnap={true}
					row={false}
				/>
        <FieldsToForm fields={fields} fieldVars={fieldVars}/>
        <Button style={{marginLeft:"100"}} onPress={()=>{
              savePf();
          }} title="Save" />   
      </View>
      </ScrollView>
    );
}

export { Profiles };
