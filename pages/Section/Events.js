import * as React from 'react';
import { useState, useEffect, createRef, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, TextInput, View, Button, 
  TouchableOpacity, ScrollView, Dimensions
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { mondaysInMonth, addDays, convertDate} from '../../helpers/dateHelpers.js';
import LogoDSTA from '../../assets/Icons/dsta.svg';
import { ListCustom } from '../../components/ListItem';
import LogoMindef from '../../assets/Icons/mindef.svg';
import LogoAstar from '../../assets/Icons/astar.svg';
import LogoPsc from '../../assets/Icons/psc.svg';
import LogoGovtech from '../../assets/Icons/govtech.svg';
import LogoNus from '../../assets/Icons/nus.svg';

//// Viewing Rations ////////////////////////////////////////////////////
function Events({navigation, route}){
    const [date, setDate] = useState();
    
    const [title, setTitle] = useState(route.params.eventName)
    const [Data, setData] = useState([{Logo:LogoDSTA, text:'Hello'}, {Logo:LogoDSTA, text:'Hello'}, {Logo:LogoDSTA, text:'Hello'}]);
    useEffect(()=>{
      switch (route.params.eventName){
        case "Work":
          setData([
            {
              Logo:LogoDSTA,
              title:'DSTA Internship',
              description: `
For Post-JC/Polytechnic students keen on doing internship prior to their undergraduate studies

WHO MAY APPLY

Post-JC and Post Polytechnic Students
INTERNSHIP PERIOD

January - June
(minimum 2 months)
              `,
              link: 'https://www.dsta.gov.sg/join-us/student/internships',
              text: 'DSTA Internship - Apply in August/ September'
            },
            {Logo: LogoGovtech,
  title: 'GovTech Internship',
  description: `For students who are looking to gain exposure to tech industry and strategic national projects with mentorship & networking opportunities. Application period: August to September (Start in Jan - Apr next year)
`,
  link: 'https://www.tech.gov.sg/careers/students-and-graduates/internships',
  text: 'GovTech Internship - Apply in August/ September'
    },

 {Logo: LogoAstar,
  title: 'A*STAR Attachment in Research Institutes',
  description: `Take your passion for science, engineering and research & development to greater heights! In partnership with Singapore’s Institutes of Higher Learning and the Ministry of Education (MOE) A*STAR Research Institutes (RIs) offer scientific attachment opportunities for pre-university, polytechnic, undergraduate and postgraduate students.

Our RIs have established partnerships with local and overseas universities through the A*STAR Graduate Academy (A*GA), better positioning you, as a young and aspiring scientific talent, to pursue your passion and prepare for a rewarding career.

Application period: NIL (Contact the research institute directly through email)
`,
  link: 'https://www.a-star.edu.sg/Scholarships/junior-college-and-polytechnic-and-secondary-school-students/information-on-research-attachments-at-a-star-ris',
  text: 'A*STAR Attachment in Research Institutes'
    },
          ]);
          break;
        case "Study":
          setData([
            {Logo: LogoNus,
  title: 'NUS Internal Blended Learning Online Courses (iBLOCs) for Returning Full-Time National Service (NS) men',
  description: `iBLOCs are mounted from January 2023 to cater to Returning Full-Time National Servicemen (NSmen) who wish to have a head start in university education and more time to transit to academic life. NUS welcomes NSmen who have places reserved for them in NUS and will be matriculating as undergraduates in August 2023 to apply for iBLOCs, if they wish.
Courses Offered: NM1101X, MA1301X, CS1010X, CM1417X

Application period: 17 September - 21 October`,
  link: 'https://www.nus.edu.sg/ibloc/iBLOC.html',
  text: 'NUS iBLOCs - Apply in Sep - Oct'
    },
            {Logo:LogoNus, text: 'NUS Advanced Placement Test (APT) MA1505 - Register in May, Test in end June',  title: 'NUS Internal Blended Learning Online Courses (iBLOCs) for Returning Full-Time National Service (NS) men',
  description: `NUS Advanced Placement Tests allow you to clear some of your MC Requirements before you matriculate. You won't have to do the mod.`,
  link: 'https://www.nus.edu.sg/ibloc/iBLOC.html',
  text: 'NUS iBLOCs - Apply in Sep - Oct'
    },
            {Logo:LogoNus, text: 'NUS Special Term 2 - Register in March, June-July'}
          ]);
          break;
        case "Travel":
          setData([
            {Logo:LogoDSTA, text: 'Japan'},
            {Logo:LogoDSTA, text: 'Korea'}
          ]);
          break;
        case 'Scholarship':
          setData([{Logo: LogoPsc,
  title: 'Public Service Commission Scholarship',
  description: `The Public Service Commission (PSC) Scholarship is the premier government scholarship awarded based on merit. The PSC Scholarships offer varied career pathways in the Public Service that will provide for a broad range of interests. Our scholarship holders are a diverse group of outstanding young talents who are all-rounded and committed to serving Singapore and Singaporeans. They excel in both academic and non-academic pursuits, possess sound character and exemplify the ethos of the Public Service.
  Application period: 01 September - 15 March
`,
  link: 'https://www.psc.gov.sg/scholarships/undergraduate-scholarships/psc-scholarships',
  text: 'Public Service Commission Scholarship - Apply in Sep to Mar'
    },

  {Logo: LogoMindef,
  title: 'Singapore Armed Forces Scholarship',
  description: `Second in prestige only to the President's Scholarship, The SAF Scholarship (formerly known as SAF Overseas Scholarship - SAFOS), is for those who see the honour in service and duty - the noble purpose of being there where it matters most. It provides excellent opportunities for personal and professional growth, as well as grooming for the highest levels of command and management.

The SAF Scholarship offers scholars opportunities to be involved in operations that directly contribute to the peace and security of Singapore. Through a series of command, instructional and staff appointments, scholars will hone their skills as a leader, manager, planner and strategist.

  Application period: 01 September - 15 March
`,
  link: 'https://www.mindef.gov.sg/oms/scholarship/scholarships-safos.html',
  text: 'SAF Scholarship - Apply in Sep to Mar'
    },

   {Logo: LogoAstar,
  title: 'National Science Scholarship - BS',
  description: `The prestigious National Science Scholarship (BS-PhD) nurtures young talent for an exciting and rewarding career in scientific and technological research. The NSS (BS-PhD) is the only through-train scholarship in Singapore which provides for your undergraduate studies and PhD training.

Applicant must gain admission to a top overseas university, in one of A*STAR's research thrusts.
`,
  link: 'https://www.a-star.edu.sg/Scholarships/for-undergraduate-studies/national-science-scholarship-bs',
  text: 'National Science Scholarship - BS - Apply by Mar'
    },]);
      }
    }, [navigation]);
    return (
      <ScrollView>
          <Text style={{marginLeft:20,marginTop:10, fontSize:20, fontWeight: 'bold'}}>
            {title}
          </Text>
          <View style={{alignItems: 'center',
            flex: 1,
            justifyContent: 'center', padding:10}}
          >
            <ListCustom data={Data.map(x => ({
              ...x, 
              callback: ()=> {
                navigation.navigate("Description", {event:x});
              }
            }))}/>
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


export {Events};
