import React from 'react'
import "./login.css"
import ImageProfile from './ImageProfile'
import {BsPeople,BsChatDots} from "react-icons/bs"
import {FaRegAddressBook} from "react-icons/fa"
import {AiOutlineCalendar} from "react-icons/ai"


const SecondPage = () => {
  

  return (
    <div className='login-contanier'>
        <main className='login-main'>
        {/* edit profile image */}
        <ImageProfile/>
        {/* end of avatar image */}

        <section className='login-text'>
        <h3>Dorathy Williams</h3>
        <p>Nutritionist</p>
        </section>
        
        <section className='feature-buttons'>
            <div style={{backgroundColor:"#afba15"}}>
              <BsPeople className ="icons-style"/>
            <p style={{padding:"9px"}}>Potential Customers</p></div>

            <div style={{backgroundColor:"#0c0847"}}><AiOutlineCalendar className ="icons-style"/>
            <p style={{padding:"9px"}}>Confirm Meetings</p>
            </div>

            <div style={{backgroundColor:"#afba15"}}><FaRegAddressBook className ="icons-style"/>
              <p style={{padding:"9px"}}>Customer Records</p>
              </div>

            <div style={{backgroundColor:"#0c0847"}}><BsChatDots className ="icons-style"/>
            <p style={{padding:"9px"}}>Connect</p>
            </div>
        
        </section>

        </main>
        </div>
  )
}

export default SecondPage

