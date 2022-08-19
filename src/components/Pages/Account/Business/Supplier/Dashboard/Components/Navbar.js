import React from 'react';
import { IconContext } from 'react-icons';
import { BsGearFill } from 'react-icons/bs';
import { RiQuestionLine } from 'react-icons/ri';
import { FaUserTie } from 'react-icons/fa';

import './navbar.css';

function Navbar() {
  return (
    <>
      <nav className='dash-nav'>
        <div className='float-left'>
          <img src='/White.png' alt="Logo-Suppliers'" />
          <div className='dash-navtag'>Supplier Account</div>
        </div>
        <div className='float-right'>
          <IconContext.Provider value={{ className: 'navbar-icons' }}>
            <BsGearFill />
            <RiQuestionLine />
            <FaUserTie />
          </IconContext.Provider>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
