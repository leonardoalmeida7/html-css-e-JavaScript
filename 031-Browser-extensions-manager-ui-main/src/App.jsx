import { useState, useEffect } from 'react';
import Item from './assets/components/Item';
import Logo from './assets/components/Logo';
import NavBtn from './assets/components/NavBtn';
import './App.css';

function App() {
  const [itens, setItens] = useState([]);
  const [logo, setLogo] = useState("./assets/images/icon-moon.svg");
  const [theme, setTheme] = useState("light");
  const [navBtns, setNavBtns] = useState([
    { btnName: "All", isActive: true },
    { btnName: "Active", isActive: false },
    { btnName: "Inactive", isActive: false }
  ]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const fetchApi = await fetch("/data.json");
        const json = await fetchApi.json();
        setItens(json);
      } catch (erro) {
        console.error("Ocorreu um erro " + erro);
      }
    };
    getInfo();
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(itens));
  }, [itens]);

  const handleClick = () => {
    const isLight = theme === "light";
    setLogo(isLight ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg");
    setTheme(isLight ? "dark" : "light");
    document.documentElement.setAttribute('mode-light-dark', isLight ? "dark" : "light");
  };

  const handleNavClick = (btnName) => {
    setNavBtns(prev =>
      prev.map(btn => ({ ...btn, isActive: btn.btnName === btnName }))
    );
  };

  const activeItens = itens.filter(item => item.isActive);
  const inactiveItens = itens.filter(item => !item.isActive);

  return (
    <div className='main container'>
      <div className='container-logo d-flex justify-content-between align-items-center p-2 px-3 mt-3'>
        <Logo />
        <div className='icon-theme' onClick={handleClick}>
          <img src={logo} alt="icon_theme" />
        </div>
      </div>

      <div className='menu d-flex flex-column flex-lg-row align-items-center justify-content-lg-between my-5 my-lg-4'>
        <h1 className='mb-4 mb-lg-0'>Extensions List</h1>
        <div className="btns">
          {navBtns.map((btn, index) => (
            <NavBtn key={index} {...btn} handleNavClick={handleNavClick} />
          ))}
        </div>
      </div>

      <div className="container-itens row gap-3 justify-content-between">
        {navBtns[0].isActive && itens.map((item, index) => (
          <Item key={index} item={item} id={index} setActive={() => {}} setItens={setItens} itens={itens} />
        ))}
        {navBtns[1].isActive && activeItens.map((item, index) => (
          <Item key={index} item={item} id={index} setActive={() => {}} setItens={setItens} itens={itens} />
        ))}
        {navBtns[2].isActive && inactiveItens.map((item, index) => (
          <Item key={index} item={item} id={index} setActive={() => {}} setItens={setItens} itens={itens} />
        ))}
      </div>
    </div>
  );
}

export default App;
