import { useState } from 'react'
import './App.css'
import DessertMain from './Components/DessertMain'
import OrderConfirmModel from './Components/OrderConfirmModel'
import Cart from './Components/Cart'
import CartProvider from './Common/DessertContextProvider'

function App() {
  
  const [showModal,setShowModal] = useState(false);

  const handleModel = () => {
    setShowModal(!showModal);
  }

  const newOrderModalHandler = () => {
    setShowModal(false);
  };


  return (
    <>
      <div className='lg:m-auto'>
        <CartProvider>
          <div className='my-16 lg:flex lg:gap-5 lg:justify-center'>
          <DessertMain /> 
          <Cart orderHandle={handleModel} />
          </div>
          <OrderConfirmModel newOrder={newOrderModalHandler} show={showModal} onClose={handleModel} />
        </CartProvider>
      </div>
    </>
  )
}

export default App
