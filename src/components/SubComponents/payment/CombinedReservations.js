import React from 'react';
import { Reservations } from './Reservations'; // Import the Reservations component
import { ReservationsOther } from './ReservationsOther'; // Import the ReservationsOther component
import { connect } from "react-redux";
import { PageWrap } from '../PageWrap';
import './CombinedReservations.css';


const CombinedReservations = (props) => {

const uid = props.profile

  return (
    <PageWrap goTo="/account" header="Wallet">

    <div className="combined-reservations">
      <Reservations profile={uid} /> {/* Render the Reservations component */}
      <hr /> {/* Horizontal line separator */}
      <ReservationsOther profile={uid} /> {/* Render the ReservationsOther component */}
    </div>
    </PageWrap>
  );
};

const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
    };
  };

export default connect(mapStateToProps)(CombinedReservations);
