import React from 'react';
import { IconContext } from 'react-icons';
import {
  FaHome,
  FaTags,
  FaDollarSign,
  FaChartLine,
  FaWrench,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sidebar.css';

function Sidebar(props) {
  return (
    <>
      <div className='sidebar'>
        <div className='sidebar-content'>
          <IconContext.Provider value={{ className: 'sidebar-icons' }}>
            <a>
              {' '}
              <Link to='/supplier/home' style={{ textDecoration: 'none' }}>
                <p className={props.className1}>
                  <FaHome />
                  Home
                </p>
              </Link>
            </a>
            <a>
              <Link to='/supplier/products' style={{ textDecoration: 'none' }}>
                <p className={props.className2}>
                  <FaTags />
                  Products
                </p>
              </Link>
            </a>
            <a>
              <Link to='/supplier/orders' style={{ textDecoration: 'none' }}>
                <p className={props.className3}>
                  <FaChartLine />
                  Orders
                </p>
              </Link>
            </a>
            <a>
              <Link to='/supplier/revenue' style={{ textDecoration: 'none' }}>
                <p className={props.className4}>
                  <FaDollarSign />
                  Revenue
                </p>
              </Link>
            </a>
            <a>
              <Link to='/supplier/settings' style={{ textDecoration: 'none' }}>
                <p className={props.className5}>
                  <FaWrench />
                  Settings
                </p>
              </Link>
            </a>
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
