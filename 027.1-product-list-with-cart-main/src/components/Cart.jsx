import { IoIosCloseCircleOutline } from "react-icons/io";

const Cart = ({item, count}) => {
    const {name, price, qntd} = item
    //console.log(qtnd)
  return (
    <div >
        <div className="cart">
            <div>
                <div className="name-product">
                    <span>{name}</span>
                </div>
                <div>
                    <span className='qntd-x'>{qntd}x</span>
                    <span className='product-price'>@{price && price.toFixed(2)}</span>
                    <span className='qntd-price'>$13.00</span>
                </div>
            </div>
            <IoIosCloseCircleOutline className="icon-close"/>
        </div>
    </div>
  )
}

export default Cart