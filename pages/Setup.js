import * as React from "react";
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";

import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Storage from "expo-storage";
import { Dropdown } from "react-native-element-dropdown";
import { FieldsToForm } from "../components/FieldsToForm";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-reanimated-table";

const monthMapping = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function BottomNavigation({ backCallback, nextCallback }) {
  return (
    <>
      {backCallback ? (
        <Button
          onPress={backCallback}
          color="#696969"
          style={{
            backgroundColor: "#fca311",
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 24,
            alignSelf: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 3,
          }}
          title="Back"
        />
      ) : (
        <></>
      )}
      <Button
        onPress={nextCallback}
        color="#696969"
        style={{
          backgroundColor: "#fca311",
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 24,
          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 3,
        }}
        title="Proceed"
      />
    </>
  );
}
function TypeFormRipoff({ navigation, prompt, tip, field }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      //headerRight: () => <Button onPress={addColor} title="Add"/>,
    });
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, maxWidth: "95%" }}>{prompt}</Text>
      <Text style={{ margin: 10, maxWidth: "80%", textAlign: "center" }}>
        {tip}
      </Text>
      <View style={{ padding: 5 }}></View>
      {field}
    </View>
  );
}

function Start({ navigation }) {
  const [profileColour, setProfileColour] = useState("");
  const loginThroughNsPortal = async () => {
    //navigation.navigate("Home", {cookie:cookie})
    navigation.navigate("BasicDetails");
  };
  return (
    <TypeFormRipoff
      navigation={navigation}
      prompt="SUCCess"
      tip="Unlock your potential"
      field={
        <>
          <Button
            onPress={() => {
              navigation.navigate("Main");
            }}
            color="#696969"
            style={{ backgroundColor: "#696969", marginTop: 50 }}
            title="To Main Page"
          />
          <Button
            onPress={loginThroughNsPortal}
            color="#696969"
            style={{ backgroundColor: "#696969", marginTop: 50 }}
            title="Proceed to Profile Curation"
          />
        </>
      }
    />
  );
}

function BasicDetails({ navigation }) {
  const [profileColour, setProfileColour] = useState("");
  const loginThroughNsPortal = async () => {
    //navigation.navigate("Home", {cookie:cookie})
    const dataFormat = {
      name: fieldVars[0][0],
      ordMonth: fieldVars[1][0],
      interest: fieldVars[2][0],
    };
    navigation.navigate("MonthPlanning", { data: dataFormat });
  };
  const fields = [
    { name: "Name", key: "name" },
    {
      name: "ORD Month",
      key: "startDate",
      options: [
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    {
      name: "Interest",
      key: "interest",
      options: ["Math/Science", "Engineering", "Computing"],
    },
    //{name:"Uni  Month", key:'startDate', options:["Oct", "Nov", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]},
  ];
  const fieldVars = [useState(""), useState(""), useState("")];

  return (
    <TypeFormRipoff
      navigation={navigation}
      prompt="Tell me more about yourself"
      field={
        <>
          <FieldsToForm fields={fields} fieldVars={fieldVars} />
          <View style={{ padding: 10 }} />
          <BottomNavigation
            nextCallback={() => {
              loginThroughNsPortal();
            }}
          />
        </>
      }
    />
  );
}

function MonthPlanning({ navigation, route }) {
  const data = route.params.data;
  const next = async () => {
    navigation.navigate("MonthPlanningFeedback", {
      data: { ...data, months: months, preference: preference },
    });
  };
  const [months, setMonths] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ]);
  const [preference, setPreference] = useState({});
  useEffect(() => {
    let newMonth = [];
    let index = monthMapping.indexOf(data.ordMonth);
    while (index != 7) {
      newMonth.push(monthMapping[index]);
      index += 1;
      if (index >= 12) {
        index = 0;
      }
    }
    setMonths(newMonth);
  }, [navigation]);
  return (
    <TypeFormRipoff
      navigation={navigation}
      prompt="Month Planning"
      tip="What would you like to do during these months"
      field={
        <>
          {months.map((element, index) => (
            <View
              style={{
                padding: 10,
                fontSize: 18,
                height: 44,
                flexDirection: "row",
              }}
              key={index}
            >
              <Text style={styles.monthText}>{element}:</Text>
              <View style={styles.dropDownContainer}>
                <Dropdown
                  data={[
                    { label: "Study", value: "Study" },
                    { label: "Work", value: "Work" },
                    { label: "Travel", value: "Travel" },
                    { label: "Break", value: "Break" },
                  ]}
                  labelField="label"
                  valueField="value"
                  value={preference[element]}
                  style={[
                    styles.monthDropdown,
                    { marginLeft: "auto", minWidth: 160, color: "#333" },
                  ]}
                  onChange={(item) => {
                    let data = { ...preference };
                    data[element] = item;
                    setPreference(data);
                  }}
                />
              </View>
            </View>
          ))}
          <BottomNavigation
            nextCallback={() => {
              next();
            }}
          />
        </>
      }
    />
  );
}

function algo(data) {
  let message = "";
  const impt = [
    { cat: "study", desc: "NUS iBLOC", month: [1, 2, 3, 4, 5, 6] },
    { cat: "work", desc: "DSTA Internship", month: [3, 6, 7] },
    { cat: "study", desc: "NUS Special Term I", month: [6] },
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

  for (let i = 0; i < data.length; i++) {
    let monthData = data[i];
    console.log(monthData);

    for (const mo of data) {
      //let clash = false;
      //const clash_lst = [];

      for (const item of impt) {
        if (item.month.includes(mo.month)) {
          if (mo.cat !== item.cat) {
            clash = true;
            clash_lst.push({ ...item, ogMonth: mo.month, ogCat: mo.cat });
          } else {
            //clash = false;
            //break;
          }
        }
      }
    }
    if (clash) {
      for (const i of clash_lst) {
        message += `${monthMapping[i.ogMonth - 1]}: You chose ${
          i.ogCat
        } but there is ${i.desc} (${i.cat})\n`;
      }
      return message;
    }
    //return JSON.stringify(clash)+JSON.stringify(clash_lst)+JSON.stringify(data);
    return "Generally looks good!";
  }
}

function MonthPlanningFeedback({ navigation, route }) {
  const data = route.params.data;
  const months = route.params.data.months;
  const tableHead = ["Month", "Activity"];
  const [message, setMessage] = useState("Loading");
  useEffect(() => {
    setMessage(
      algo(
        months.map((month) => {
          const monthIndex = monthMapping.indexOf(month) + 1;
          if (!data.preference[month]) return {};
          return {
            month: monthIndex,
            cat: data.preference[month].value.toLowerCase(),
          };
        })
      )
    );
  }, [navigation]);
  function save() {
    Storage.setItem({ key: `userdata`, value: JSON.stringify(data) }).then(
      () => {
        console.log("saved");
        navigation.navigate("Main");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      //headerRight: () => <Button onPress={addColor} title="Add"/>,
    });
  });
  return (
    <ScrollView style={{ marginTop: 60, margin: 20 }}>
      <Text style={{ fontSize: 40, maxWidth: "95%", textAlign: "center" }}>
        {"Month Planning"}
      </Text>
      <View style={styles.error}>
        <Text
          style={{
            fontSize: 24,
            margin: 10,
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 0.5, borderColor: "grey" }}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.text}
            flexArr={[1, 2]}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={months.slice(1, months.length).map((element, index) => {
                return element;
              })}
              style={[styles.col, { flex: 1 }]}
              textStyle={styles.text}
            />
            <Col
              data={months.slice(1, months.length).map((element, index) => {
                return data.preference[element]
                  ? data.preference[element].value
                  : "nil";
              })}
              style={[styles.col, { flex: 2 }]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
      <BottomNavigation
        backCallback={() => navigation.goBack()}
        nextCallback={save}
      />
    </ScrollView>
  );
}
function Setup({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      //headerRight: () => <Button onPress={addColor} title="Add" />,
    });
  });
  const [profileColour, setProfileColour] = useState("");
  const out = async () => {
    //navigation.navigate("Home", {cookie:cookie})
    navigation.navigate("Main");
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={Start}
        initialParams={{ topNavigation: navigation }}
      />
      <Stack.Screen
        name="BasicDetails"
        component={BasicDetails}
        initialParams={{ topNavigation: navigation }}
      />
      <Stack.Screen
        name="MonthPlanning"
        component={MonthPlanning}
        initialParams={{ topNavigation: navigation }}
      />
      <Stack.Screen
        name="MonthPlanningFeedback"
        component={MonthPlanningFeedback}
        initialParams={{ topNavigation: navigation }}
      />
      {/*<Stack.Screen name="Description" component={EventDescription} initialParams={{ topNavigation:navigation }}/>*/}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 20, backgroundColor: "#fff" },
  head: { height: 50, backgroundColor: "#ffe0f0" },
  text: { textAlign: "center" },
  wrapper: { flexDirection: "row" },
  col: { flex: 1 },
  row: { height: 50 },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  dropDownContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingLeft: 5,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  error: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export { Setup };
