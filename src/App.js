import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          const modifiedQuantity = eachProduct.quantity + 1
          return {...eachProduct, quantity: modifiedQuantity}
        }
        return eachProduct
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const availableProduct = cartList.find(eachProduct => eachProduct.id === id)

    if (availableProduct.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (eachProduct.id === id) {
            const updatedQuantity = eachProduct.quantity - 1
            return {...eachProduct, quantity: updatedQuantity}
          }
          return eachProduct
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const checkProductId = cartList.find(eachObj => eachObj.id === product.id)

    if (checkProductId) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObj => {
          if (eachObj.id === product.id) {
            const updatedQuantity = eachObj.quantity + product.quantity
            return {...eachObj, quantity: updatedQuantity}
          }
          return eachObj
        }),
      }))
    } else {
      const modifiedCartList = [...cartList, product]
      this.setState({cartList: modifiedCartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
