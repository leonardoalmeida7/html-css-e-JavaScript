import { useState, useEffect } from 'react';

const Item = ({ item, id, setActive, setItens, itens }) => {
  const { description, isActive, logo, name } = item;

  const [itemActive, setItemActive] = useState({
    position: isActive ? "50%" : "10%",
    styleActive: isActive ? "btn-active" : "btn-inactive"
  });

  const updateItems = (isActiveStatus) => {
    const updatedItems = [...itens];
    updatedItems[id] = {
      ...updatedItems[id],
      isActive: isActiveStatus,
    };
    setItens(updatedItems);
  };

  const toggleActive = (active) => {
    if (active) {
      setActive((prev) => {
        const exists = prev.some((e) => e.id === item.id);
        if (!exists) return [...prev, item];
        return prev;
      });
      setItemActive({ position: "50%", styleActive: "btn-active" });
    } else {
      setActive((prev) => prev.filter((e) => e.id !== item.id));
      setItemActive({ position: "10%", styleActive: "btn-inactive" });
    }
    updateItems(active);
  };

  const handleAction = () => {
    toggleActive(!isActive);
  };

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
        <div className={`btn-action ${itemActive.styleActive}`} onClick={handleAction}>
          <div className="circle" style={{ left: itemActive.position }}></div>
        </div>
      </div>
    </div>
  );
};

export default Item;
