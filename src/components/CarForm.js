import React from 'react';
import { useForm } from 'react-hook-form';

const CarForm = ({ onSubmit, initialData = {} }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="condition">Used/New:</label>
        <select id="condition" {...register('condition', { required: true })}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" {...register('make', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" {...register('model', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="variant">Variant:</label>
        <input type="text" id="variant" {...register('variant')} />
      </div>

      <div className="form-group">
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" {...register('year', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="stockNo">Stock No:</label>
        <input type="text" id="stockNo" {...register('stockNo')} />
      </div>

      <div className="form-group">
        <label htmlFor="vin">VIN:</label>
        <input type="text" id="vin" {...register('vin')} />
      </div>

      <div className="form-group">
        <label htmlFor="mmCode">MM Code:</label>
        <input type="text" id="mmCode" {...register('mmCode')} />
      </div>

      <div className="form-group">
        <label htmlFor="demoCar">Demo Car?</label>
        <select id="demoCar" {...register('demoCar')}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mileage">Mileage:</label>
        <input type="number" id="mileage" {...register('mileage')} />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" {...register('description')}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="colour">Colour:</label>
        <input type="text" id="colour" {...register('colour')} />
      </div>

      <div className="form-group">
        <label htmlFor="serviceHistory">Service History:</label>
        <textarea id="serviceHistory" {...register('serviceHistory')}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="motorPlan">Motor Plan:</label>
        <input type="text" id="motorPlan" {...register('motorPlan')} />
      </div>

      <div className="form-group">
        <label htmlFor="warranty">Warranty:</label>
        <input type="text" id="warranty" {...register('warranty')} />
      </div>

      <div className="form-group">
        <label htmlFor="extras">Extras:</label>
        <textarea id="extras" {...register('extras')}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" {...register('price', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="region">Region:</label>
        <input type="text" id="region" {...register('region')} />
      </div>

      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" id="city" {...register('city')} />
      </div>
    </form>
  );
};

export default CarForm;