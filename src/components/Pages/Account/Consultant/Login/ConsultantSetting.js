import React from 'react'

const ConsultantSetting = ({setSetting}) => {


    function onBack(){
    setSetting(false)
    }
  return (
    <div style={{height: "400px",width:"400px" ,transition:"2s ease in all"}}>
      <h1>ConsultantSetting </h1>
       <button onClick={onBack}>hello</button>
    </div>
  )
}

export default ConsultantSetting