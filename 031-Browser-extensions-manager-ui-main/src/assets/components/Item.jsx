import { useState, useEffect } from 'react';


const Item = ({item}) => {
    const {description, isActive, logo, name} = item;

    const [image, setImage] = useState(null);

    return (
    <div className="item p-3 d-flex flex-column justify-content-between">
        <div className='d-flex justify-content-between align-items-start mb-3'>
          <img src={logo} alt="img-item" />
          <div className='col-9'>
            <span className="name-item">{name}</span>
            <p>{description}</p>
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
          <button type="button" className='btn-remove rounded-pill'>Remove</button>
          <div className='btn-active'>
            <div className="circle"></div>
          </div>
        </div>
    </div>
  )
}

export default Item;