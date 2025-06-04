import { useEffect, useState } from "react";

const NavBtn = ({btnName, isActive, handleNavClick}) => {
    const [btnActive, setBtnActive] = useState("");

    useEffect(() => {
        setBtnActive(isActive ? "btn-active" : "");
        
    },[isActive])

  return (
    <>
        <button type='button' className='btn-control mx-3 rounded-pill' id={btnActive} onClick={() => handleNavClick(btnName)}>{btnName}</button>
    </>
  )
}

export default NavBtn;