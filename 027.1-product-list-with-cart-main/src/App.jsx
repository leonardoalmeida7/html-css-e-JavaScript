import { useState, useEffect } from 'react'
import './App.css'
import Products from './components/Products';
import EmptyCart from './components/EmptyCart';
import Cart from './components/Cart';

function App() {

  const [products, setProducts] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [productAdd, setProductAdd]= useState("")
  const [items, setitems] = useState([])
  const [cartCount, setCartCount] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('../public/data.json')
      const json = await response.json()
      setProducts(json)
    }
    getData()
  },[])

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  console.log(cartCount)
  
  return (
    <>
      <h1>Desserts</h1>
      <div className='main'>
        {products.map((product, index) => (
          <Products 
          key={index}  
          products={product} 
          windowWidth={windowWidth} 
          productAdd={setProductAdd}
          items={items}
          setitems={setitems}
          setCartCount={setCartCount}
          cartCount={cartCount}/>
        ))}
      </div>
      <div className="area-cart">
        <div className="your-cart">
          <span>Your Cart (<span className='qntd-items'>{cartCount}</span>)</span>
        </div>
        {items.length ? items.map((item, index)=> (<Cart key={index} item={item} />))   : <EmptyCart /> }
      </div>
    </>
  )
}

export default App
