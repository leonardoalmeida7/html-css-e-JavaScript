import Item from './assets/components/Item';

import { useState, useEffect } from 'react';

//import logo from './assets/images/logo.svg';
//import moon from './assets/images/icon-moon.svg';
//import imgItem from './assets/images/logo-devlens.svg';

import './App.css';

function App() {
  const [itens, setItens] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try{
          const fetchApi = await fetch("/data.json");
          const json = await fetchApi.json();
          setItens(json);
      }catch(erro) {;
        console.error("Ocorreu um erro " + erro);
      }
    }

    getInfo()
  },[]);

  const logo = itens.map((item) => item.logo);

  return (
    <div className='main container'>
      <div className='container-logo d-flex justify-content-between align-items-center p-2 px-3 mt-3'>
        <img src="./assets/images/logo.svg" alt="Logo" />
        <div className='icon-theme'>
          <img src="./assets/images/icon-moon.svg" alt="icon_moon" />
        </div>
      </div>
      <div className='menu d-flex flex-column flex-lg-row align-items-center justify-content-lg-between my-5 my-lg-4'>
        <h1 className='mb-4 mb-lg-0'>Extensions List</h1>
        <div className="btns">
          <button type="button" className='btn-control rounded-pill'>All</button>
          <button type='button' className='btn-control mx-3 rounded-pill'>Active</button>
          <button type='button' className='btn-control rounded-pill'>Inactive</button>
        </div>
      </div>
      <div className="container-itens row gap-3 justify-content-between">
        {itens.map((item, index) => (
          <Item key={index} item={item} logo={logo}/>
        ))}
      </div>

      {/* <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. 
        Coded by <a href="#">Your Name Here</a>.
      </div> */}
    </div>
  )
}

export default App
