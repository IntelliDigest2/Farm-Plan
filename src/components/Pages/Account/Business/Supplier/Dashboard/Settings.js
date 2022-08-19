import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { DataGrid } from '@mui/x-data-grid';

import { ImLocation2 } from 'react-icons/im';
import { FaToolbox } from 'react-icons/fa';
import { HiOutlineUpload } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import Dropzone from 'react-dropzone';
import { rowsl } from './Components/Data/locations';
import { rowse } from './Components/Data/equipment';

import './dashboard.css';
function DashboardSettings() {
  const [data, setData] = useState(rowsl);

  const deleteProduct = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columnsl = [
    { field: 'id', headerName: 'ID', width: 60, sortable: false },
    { field: 'country', headerName: 'Country', width: 140, sortable: false },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button
              className='productDelete'
              onClick={() => deleteProduct(params.row.id)}
            >
              <MdDelete />
              Delete
            </button>
          </>
        );
      },
    },
  ];
  const columnse = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'equipment', headerName: 'Equipment', width: 140 },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <button
              className='productDelete'
              onClick={() => deleteProduct(params.row.id)}
            >
              <MdDelete />
              Delete
            </button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Navbar />
      <div className='dashboard-content'>
        <Sidebar className5='active' />
        <div className='main-content settings'>
          <h1>Settings</h1>
          <div className='settings-main'>
            <div className='overview-container settings'>
              <div className='overview-heading settings'>
                <div className='details-image-container'>
                  <img
                    className='details-image'
                    src='https://media.istockphoto.com/vectors/letter-m-logo-template-unique-modern-creative-elegant-logotype-vector-vector-id1194258524?k=20&m=1194258524&s=170667a&w=0&h=mmK3sgdaFcoSWSgU1RPMhm0AedcY2W30MoCVBrEkGxo='
                    alt='profile image'
                  />
                </div>
                <div className='details-title'>
                  <h4 className='details-title-header'>Green Machineries</h4>
                  <p className='details-title-subtext'>
                    Intellidigest Supplier
                  </p>
                </div>
              </div>
              <div className='settings-details-main'>
                <h4 className='settings-details-header'>Supplier Details</h4>
                <hr />
                <h4>Ship-To Locations</h4>
                <ul>
                  <li>
                    <span>
                      <ImLocation2 />
                    </span>
                    United Kingdom
                  </li>
                  <li>
                    <span>
                      <ImLocation2 />
                    </span>
                    United States
                  </li>
                  <li>
                    <span>
                      <ImLocation2 />
                    </span>
                    Nigeria
                  </li>
                </ul>
                <h4>Equipment supplied</h4>
                <ul className='location-tool-info'>
                  <li>
                    <span>
                      <FaToolbox />
                    </span>{' '}
                    Irrigation systems
                  </li>
                </ul>
                <p className='other-settings'>
                  To edit other account settings,{' '}
                  <span>
                    <a href='/settings'>click me!</a>
                  </span>
                </p>
              </div>
            </div>
            <div className='orders-overview settings'>
              <div className='orders-heading'>
                <h4>Update Data</h4>
              </div>
              <div className='settings-table-image'>
                <div className='settings-table-container'>
                  <div
                    style={{
                      marginLeft: '15px',
                      height: 285,
                      width: '90%',
                      marginTop: '20px',
                    }}
                  >
                    <div className='table-add'>
                      <h5>Modify locations</h5>

                      <span>
                        <button>
                          Add <BsFillPlusCircleFill />
                        </button>
                      </span>
                    </div>
                    <DataGrid
                      rows={rowsl}
                      columns={columnsl}
                      pageSize={3}
                      rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: '15px',
                      height: 170,
                      width: '90%',
                      marginTop: '45px',
                    }}
                  >
                    <div className='table-add'>
                      <h5>Modify equipment</h5>

                      <span>
                        <button>
                          Add <BsFillPlusCircleFill />
                        </button>
                      </span>
                    </div>
                    <DataGrid
                      rows={rowse}
                      columns={columnse}
                      pageSize={3}
                      rowsPerPageOptions={[5]}
                      disableSelectionOnClick
                    />
                  </div>
                </div>
                <div className='image-update-container'>
                  <div className='image-settings-container'>
                    <img
                      src='https://media.istockphoto.com/vectors/letter-m-logo-template-unique-modern-creative-elegant-logotype-vector-vector-id1194258524?k=20&m=1194258524&s=170667a&w=0&h=mmK3sgdaFcoSWSgU1RPMhm0AedcY2W30MoCVBrEkGxo='
                      alt='profile image'
                    />
                  </div>
                  <div className='update-image-container'>
                    <p>
                      <Dropzone
                        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <HiOutlineUpload
                              style={{
                                color: '#969696',
                                width: '40px',
                                height: '40px',
                                marginTop: '5px',
                                cursor: 'pointer',
                              }} 
                            />
                          </div>
                        )}
                      </Dropzone>
                    </p>
                  </div>
                  <button type='submit' className='payout-btn'>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardSettings;
