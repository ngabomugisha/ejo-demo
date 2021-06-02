import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import './style.css'

// import TimeTable from 'react-timetable-events'
import TimeTable from '../../../components/react-timetable-events'

export function App(props) {
  let school = null
  let role = null
  if (props.state.auth != undefined){if(props.state.auth.user != undefined) {school = props.state.auth.user.school; role = props.state.auth.user.role}}



  const renderHour = (hour, defaultAttributes, styles) => {
    return (
      <div {...defaultAttributes}
           key={hour}>
        {hour}h
      </div>
    );
  }

  const renderEvent = (event, defaultAttributes, styles) => {
    const name = event.name
    const id = event._id

    return (
      <div {...defaultAttributes}
           title={name}
           key={event.id} onClick= {() => {
             props.onChange && props.onChange(event._id)
             props.getDetails && props.getDetails(event)
             }}>
        <span className={styles.event_info}>
           {name.includes('&')? name.substring(0,name.indexOf('&')):name}<br/>{name.includes('&')? name.substring(name.indexOf('&')+1):""} 
        </span>
        <span className={styles.event_info}>
          { event.startTime.format('HH:mm') } - { event.endTime.format('HH:mm') }
        </span>
      </div>
    )
  }


    return (
      <div>
        <TimeTable
          events={props.data.events}
          renderHour={renderHour}
          renderEvent={renderEvent}
          hoursInterval={[ 8, 17 ]}
          timeLabel="Time table"
        />
      </div>
    )
  }


const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// import "./styles.css";
// import { useState, useEffect } from "react";

// export default function App() {
//   const [mon, setMon] = useState([]);
//   const events = {
//     events: {
//       monday: [...mon]
//     }
//   };
//   const data = [
//     {
//       time: {
//         dayOfWeek: 1,
//         starts: "0830",
//         ends: "0930"
//       },
//       _id: "60315b1c3efc22191447e2b7",
//       school: "602b9ef1aab3f92010a7a4e0",
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-02-20T18:55:24.805Z",
//       updatedAt: "2021-02-20T18:55:24.805Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 2,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "6031682812eea133f07f6848",
//       school: "602b9ef1aab3f92010a7a4e0",
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-02-20T19:51:04.596Z",
//       updatedAt: "2021-02-20T19:51:04.596Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 3,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "6046259676aae40401d30ee0",
//       school: null,
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-03-08T13:24:38.529Z",
//       updatedAt: "2021-03-08T13:24:38.529Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 4,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "6050620980c8b209acf7f490",
//       school: "602b9ef1aab3f92010a7a4e0",
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-03-16T07:45:13.848Z",
//       updatedAt: "2021-03-16T07:45:13.848Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 5,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "60506d49d98bbd3f7c7d13b2",
//       school: "602b9ef1aab3f92010a7a4e0",
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-03-16T08:33:13.539Z",
//       updatedAt: "2021-03-16T08:33:13.539Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 5,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "60506d8a5f28d00036a40683",
//       school: "602b9ef1aab3f92010a7a4e0",
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-03-16T08:34:18.887Z",
//       updatedAt: "2021-03-16T08:34:18.887Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 2,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "6050db8dc3a51c00366190cb",
//       school: null,
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-03-16T16:23:41.893Z",
//       updatedAt: "2021-03-16T16:23:41.893Z",
//       __v: 0
//     },
//     {
//       time: {
//         dayOfWeek: 3,
//         starts: "0930",
//         ends: "1030"
//       },
//       _id: "60506e8f5f28d00036a40684",
//       school: null,
//       class: "602c20e5eeb9ae2820b62123",
//       teacher: "602b9cfc49ce7a0be4a35fc7",
//       subject: "602c349dfd1613203834880d",
//       term: "602c2806c13abd23f06cb84b",
//       createdAt: "2021-03-16T08:38:39.978Z",
//       updatedAt: "2021-03-16T08:38:39.978Z",
//       __v: 0
//     }
//   ];
//   setMon(
//     data.reduce(function (fit, opt) {
//       if (opt.time.dayOfWeek == 3) {
//         var sm = {
//           id: 3,
//           name: opt.subject,
//           type: "custom",
//           startTime:
//             "2018-02-23T" +
//             opt.time.starts.substring(0, 2) +
//             ":" +
//             opt.time.starts.substring(2, 4) +
//             ":00",
//           endTime:
//             "2018-02-23T" +
//             opt.time.ends.substring(0, 2) +
//             ":" +
//             opt.time.ends.substring(2, 4) +
//             ":00"
//         };
//         fit.push(sm);
//       }
//       return fit;
//     }, [])
//   );
//   console.log(events);

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }
