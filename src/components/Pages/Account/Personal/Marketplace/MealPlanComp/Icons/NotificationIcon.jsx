import React, { useState,useEffect,useRef } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationIcon from '@mui/icons-material/Notifications';
import { AppNotifications } from "./appNotifications";
import { connect } from "react-redux";
import {getNotificationData} from './notificationData.js';
import {setNotificationBulbStatus} from './notificationData.js';
const { subMilliseconds,format, parseJSON ,isAfter} = require('date-fns');





function Notification(props) {
  const [show, setShow] = useState(false);


  useEffect(() => {
    if(props.profile.isLoaded){
      
      let date
      const lastNotif = localStorage.getItem('lastCheckedNotification')
      if (lastNotif){

        const notif = JSON.parse(lastNotif).created_at;
       const jsDate=   new Date(notif.seconds * 1000 + notif.nanoseconds / 1e6)
        const adjustedDate = subMilliseconds(jsDate, 1);

        // console.log(jsDate,`this is the normal date`)
        // console.log(adjustedDate,`this is the adjusted date`)
        // console.log(notif,`this is the last notif`)
        date= jsDate
      }
     

   const lastDate = lastNotif ? date : null



      props.getUserNotifications(lastDate)
    }
    
  }, [props.profile.isLoaded])

  useEffect(() => {
    
  }, [props.notificationStatus])
  

  useEffect(() => {
   
     


      if( props.notifications !== null){
      let lastCheckedNotification = localStorage.getItem('lastCheckedNotification');
      if(lastCheckedNotification){
        const notif = JSON.parse(lastCheckedNotification);
        if(props.notifications.length > 0){
          const newNotifTime = props.notifications[0].created_at
          const oldNotif = new Date(notif.created_at.seconds * 1000 + notif.created_at.nanoseconds / 1e6)
          const newNotif = new Date(newNotifTime.seconds * 1000 + newNotifTime.nanoseconds / 1e6)
       
          if(isAfter(newNotif, oldNotif) ){
              props.setNotificationStat(true)
            }
        }
     
      }else{
        props.setNotificationStat(true)
      }

      

   }
    
   
  }, [props.notifications])

  
  






  



  

  const notificationNotif = useRef(null)


  const turnOffNotification =()=>{
    props.setNotificationStat(false)
    if(props.notifications !== null || props.notification.length > 0){
      const latestNotificationJSON = JSON.stringify(props.notifications[0])
    localStorage.setItem('lastCheckedNotification', latestNotificationJSON);

    }

  }

  const notificationBulb = props.notificationStatus ?  <div ref={notificationNotif} style={{position: 'absolute', width: '8px',height: '8px',backgroundColor: 'green',borderRadius: '50%',right: '2px',bottom: '2px'}}></div>
   : '';


  

  return (
    <>
      <Tooltip title="View Notifications">
        <div  style={{position: 'relative',margin: '0 8px'}} >
        <IconButton
          className="edit"
          aria-label="Edit"
          sx={{ ml: 2 }}
          onClick={() => {
            turnOffNotification();
            setShow(true);
          }}
        >
          <NotificationIcon fontSize="inherit" />
        </IconButton>
        {notificationBulb}
        </div>
        
      </Tooltip>
      <AppNotifications
        show={show} 
        setShow={setShow}
        cart={props.cart}
        id={props.id}
        uid={props.uid}
        forceUpdate={props.forceUpdate}
      />
    </>
  );
}

const mapStateToProps = (state) => {
	return {

    profile: state.firebase.profile,
    notifications: state.notificationState.notifications,
    notificationStatus: state.notificationState.notificationStatus
    

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	
     getUserNotifications: (date)=>dispatch(getNotificationData(date)),
     setNotificationStat:(status)=>dispatch(setNotificationBulbStatus(status))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

