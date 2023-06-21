import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

function FieldsToForm(props){
    const { fields, fieldVars } = props;
    return (<View>
    {fields.map((item, index) => {
        return <View style={{ padding: 10, fontSize: 18, height: 44, flexDirection: "row" }}>
          <Text style={{fontWeight: item.key ? "" : "bold"}}>{item.name}: </Text>
          {
            item.key ? 
            (item.options ? 
            <Dropdown
                data={item.options.map((item) => {return {"label":item, "value":item}})}
                labelField="label"
                valueField="value"
                value={fieldVars[index][0]}
                style={{marginLeft: 'auto', minWidth:160}}
                onChange={item => {
                  let v = undefined;
                  if (item.value !== ""){
                    v = item.value;
                  }
                  fieldVars[index][1](v);
                }}
            />
            :
            <TextInput 
              style={{marginLeft: 'auto', borderBottomColor: 'lightgray', borderBottomWidth: 1, minWidth:30}} 
              editable
              value={fieldVars[index][0]}
              onChangeText={text => fieldVars[index][1](text)}
            />)
            :
            <View/>
          }
        </View>;
      })
    }
    </View>);
}

export { FieldsToForm };
