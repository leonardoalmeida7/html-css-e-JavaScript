import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";


const Products = ({ products, windowWidth, productAdd, items, setitems, setCartCount, cartCount}) => {
    const [image, setImage] = useState(null)
    const [btnControl, setBtnControl] = useState(false)
    const [count, setCount] = useState(1)
    const [totalItem, setTotalItem]= useState([])

    useEffect(() => {
        if(!products || !products.image) return;
        const {mobile, tablet, desktop} = products.image
        if(windowWidth <= 768) {
            setImage(mobile)
        }else if(windowWidth < 1200){
            setImage(tablet)
        }else {
            setImage(desktop)
        }
    },[windowWidth, products])

    const {category, name, price} = products

    const addToCart = () => {
        setBtnControl(true)
        products.qntd= count
        setitems((prevState) => [...prevState, products])
        productAdd(products)
        setCartCount(count)
    }
    
    const handleClickMinus = () => {
        if(count <= 1) {
            const filtro = items.filter(x => x.id !== products.id)
            setitems(filtro)
            setBtnControl(false)
            return;
        }
        setCount(count - 1)
        products.qntd= count -1 
        //setCartCount(count)
        const totalQntd = items.map(item => item.qntd).reduce((t, v) => t - v)
        setCartCount(totalQntd)
    }

    const handleClickPlus = () => {
        setCount(count + 1)
        products.qntd= count + 1
        setitems(items)
//        setCartCount(count)
        const totalQntd = items.map(item => item.qntd).reduce((t, v) => t + v)
        setCartCount(totalQntd)
        //console.log(totalQntd)
    }

    useEffect(() => {
        products.qntd= count
    },[cartCount])

  return (
    <div>
        <div className='container-product' style={{backgroundImage: `url(${image})`}}>
            <button type="button" className='btn-addCart' onClick={addToCart} ><MdAddShoppingCart className='icon-cart'/> Add to Cart</button>
            {btnControl && <button type="button" className="btn-control"><AiOutlineMinusCircle className="icon-control" onClick={handleClickMinus}/>
            <span className="qntd">{count}</span> <AiOutlinePlusCircle  className="icon-control" onClick={handleClickPlus}/>
            </button>}
        </div>
        <div className="info-product">
            <span className="category">{category}</span>
            <span className="name-product">{name}</span>
            <span className="price">${price.toFixed(2)}</span>
        </div>
    </div>
  )
}

export default Products