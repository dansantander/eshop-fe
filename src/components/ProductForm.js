import React from 'react';

const ProductForm = () => (
  <form>
    <h5>
      Add New Product
    </h5>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Name" />
    </div>
    <div className="form-group">
      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" />
    </div>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Price" />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
);

export default ProductForm;
