import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../../../context/authContext';
import { useParams } from 'react-router-dom';

const AddProduct = () => {
  const { id } = useParams();
  const [newProduct, setNewProduct] = useState({
    id: id,
    name: '',
    description: '',
    sellingPrice: '',
    metaData: '',
    quantity: '',
  });

  const authCtx = useContext(Auth);
  const token = authCtx.token;

  const [productImage, setProductImage] = useState(null);

  const newProductHandler = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append('product_image', productImage);
    formData.append('product_name', newProduct.name);
    formData.append('product_quantity', newProduct.quantity);
    formData.append('product_description', newProduct.description);
    formData.append('product_meta_data', newProduct.metaData);
    formData.append('product_selling_price', newProduct.sellingPrice);
    formData.append('restaurant_id', newProduct.id);

    const response = await axios.post(
      'https://achievexsolutions.in/current_work/eatiano/api/admin/add_product',
      formData,
      config
    );

    setNewProduct({
      id: id,
      name: '',
      metaData: '',
      sellingPrice: '',
      description: '',
      quantity: '',
    });
    setProductImage(null);

    const resData = await response.data;
    console.log(resData);
  };

  return (
    <div className='container my-24 md:my-32 lg:my-44 font-rubik'>
      <h1 className='mb-10 text-center text-gray-100 md:text-2xl lg:text-3xl md:mb-16'>
        Add New Product
      </h1>

      <div className='max-w-4xl p-5 mx-auto rounded-lg shadow-lg md:p-10 bg-secondary'>
        <form onSubmit={addNewProduct}>
          <div className='grid gap-8 md:grid-cols-2'>
            <div className='col-span-2 md:col-span-1'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Restaurant Id*</label>
              </h6>
              <input
                type='number'
                required
                name='id'
                value={newProduct.id}
                onChange={newProductHandler}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Product Name*</label>
              </h6>
              <input
                type='text'
                required
                name='name'
                value={newProduct.name}
                onChange={newProductHandler}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Product Selling Price*</label>
              </h6>
              <input
                type='number'
                name='sellingPrice'
                value={newProduct.sellingPrice}
                onChange={newProductHandler}
                required
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Product Quantity*</label>
              </h6>
              <input
                type='number'
                name='quantity'
                value={newProduct.quantity}
                onChange={newProductHandler}
                required
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Product Meta Data*</label>
              </h6>
              <input
                type='text'
                required
                name='metaData'
                value={newProduct.metaData}
                onChange={newProductHandler}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Product Image*</label>
              </h6>
              <input
                type='file'
                required
                accept='image/*'
                name='product_image'
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setProductImage(e.target.files[0]);
                }}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='col-span-2'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Product Description*</label>
              </h6>
              <textarea
                cols='30'
                rows='3'
                name='description'
                onChange={newProductHandler}
                value={newProduct.description}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              ></textarea>
            </div>
          </div>

          <button
            type='submit'
            className='w-full px-8 py-2 mt-10 text-lg font-medium text-gray-900 transition-all duration-300 rounded-lg hover:text bg-cta md:text-xl hover:bg-cta-dark hover:-translate-y-3 focus:ring-2 ring-offset-2 ring-cta-dark'
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
