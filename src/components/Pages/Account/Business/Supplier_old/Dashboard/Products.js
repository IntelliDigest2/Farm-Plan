import React, { useState } from 'react';
import { ImCloudUpload } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Dropzone from 'react-dropzone';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { rows } from './Components/myproducts.js';
import { DataGrid } from '@mui/x-data-grid';
import './dashboard.css';
import { Link } from 'react-router-dom';

function DashboardProducts() {
  const [data, setData] = useState(rows);

  const deleteProduct = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'productName', headerName: 'Name', width: 140 },
    { field: 'category', headerName: 'Category', width: 120 },

    {
      field: 'description',
      headerName: 'Description',
      width: 140,
    },
    {
      field: 'price',
      headerName: 'Price ($)',
      type: 'number',
      width: 120,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 140,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row.id}>
              <button className='productEdit'>
                Edit <FaEdit />{' '}
              </button>
            </Link>
            <button
              className='productDelete'
              onClick={() => deleteProduct(params.row.id)}
            >
              Delete <MdDelete />
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
        <Sidebar className2='active' />
        <div className='main-content'>
          <h1>Manage products</h1>
          <div className='overview-revenue-products'>
            <div className='overview-revenue'>
              <div className='overview-container products'>
                <div className='overview-heading'>
                  <h4>Add products</h4>
                  <span>
                    <button>Import CSV</button>
                    <button>Import XLSX</button>
                    <button>Integrate API</button>
                  </span>
                </div>
                <div className='fileupload-container'>
                  <Dropzone
                    onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section className=''>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            <IconContext.Provider
                              value={{ size: '100px', color: '#969696' }}
                            >
                              <ImCloudUpload />
                            </IconContext.Provider>
                            <br />{' '}
                            <span>
                              Drag & Drop to Upload Files <br /> OR
                            </span>{' '}
                            <br />
                            <span>
                              <button
                                style={{
                                  border: '1px solid black',
                                  padding: '0 3px',
                                  backgroundColor: 'transparent',
                                }}
                              >
                                Browse Files
                              </button>
                            </span>
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                <form className='addproducts-form'>
                  <div className='form-group products'>
                    <div className='form-row products'>
                      <label htmlFor='product-name'>Name</label>
                      <div className='form-input-container'>
                        <input
                          className='form-input'
                          type='text'
                          name='name'
                          size={30}
                        />
                      </div>
                    </div>
                    <div className='form-row products'>
                      <label htmlFor='product-category'>Category</label>
                      <div className='form-input-container'>
                        <input
                          className='form-input'
                          type='text'
                          name='category'
                          size={30}
                        />
                      </div>
                    </div>
                    <div className='form-row products'>
                      <label htmlFor='product-description'>Description</label>
                      <div className='form-input-container'>
                        <input
                          className='form-input'
                          type='text'
                          name='description'
                          size={30}
                        />
                      </div>
                    </div>
                    <div className='form-row products'>
                      <label htmlFor='product-price'>Price</label>
                      <div className='form-input-container'>
                        <input
                          className='form-input'
                          type='number'
                          name='price'
                        />
                      </div>
                    </div>
                    <div className='form-submit'>
                      <button type='submit' className='add-product-btn'>
                        Add product
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='products-overview'>
              <div className='products-heading'>
                <h4>My products</h4>
              </div>
            </div>
          </div>
          <div className='orders-overview products'>
            <div className='orders-heading'>
              <h4>Modify products</h4>
            </div>
            <div style={{ height: 270, width: '100%' }}>
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={3}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardProducts;
