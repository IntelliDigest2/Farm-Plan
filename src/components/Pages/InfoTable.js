import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import '../../index.css'

class InfoTable extends Component {
  renderTableData() {
    return this.props.users && this.props.users.map((student, index) => {
       const { id, email, firstName, lastName, address, city, country, postcode, buildingFunction } = student //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{firstName} {lastName}</td>
             <td>{email}</td>
             <td>{buildingFunction}</td>
             <td>{address}, {city}, {country}, {postcode}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
     return 
}
  render() {
    if (!this.props.auth.uid) return <Redirect to= '/login'/>
    if ("user" === this.props.profile.type) return <Redirect to= '/'/>
    return ( 
      <div style={{paddingBottom: "50px", paddingTop: "70px"}}>
            <h1 id='title'>The People who have signed in - {this.props.users ? this.props.users.length : 0}</h1>
            <table id='students'>
               <tbody>
                  <tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>BUILDING FUNTION</th><th>ADDRESS</th></tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
    )
  }
}

const mapStateToProps = (state) => { 
  // console.log(state);
  return{
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      users: state.firestore.ordered.users

  }
}

export default compose(connect(mapStateToProps),firestoreConnect([{ collection: "users" }]))(InfoTable);
