import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'
import CartSummary from '../CartSummary'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      // TODO: Update the functionality to remove all the items in the cart
      const onRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <>
                <div className="cart-content-container">
                  <div className="cart-top-section">
                    <h1 className="cart-heading">My Cart</h1>
                    <button
                      type="button"
                      className="remove-all-button"
                      onClick={onRemoveAll}
                    >
                      Remove all
                    </button>
                  </div>
                  <CartListView />
                  <CartSummary />

                  {/* TODO: Add your code for Cart Summary here */}
                </div>
              </>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
