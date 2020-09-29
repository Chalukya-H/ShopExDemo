import React from 'react';
import {BrowserRouter, Switch,Route, Redirect} from 'react-router-dom'
import './App.css';
import TopMenu from './components/home/topMenu'
import Login from './components/home/login' 
import ProductBanner from './components/items/ProductBanner'
import CustomerInfo from './components/customer/customerAccount'
import Cart from './components/cart/carview'
import OrderSummary from './components/orders/orderSummary'
import AddProduct from './components/items/addItems'
import ShowSingleProduct from './components/items/singleItemShow'
import ProductsSummary from './components/items/productList'
import ProductShowByCategory from './components/items/productsDisplay'
import CategoriesSummary from './components/categories/cartegoriesList'
import CategoryUpdate from './components/categories/categoriesUpdate'
import ProductSeachbyName from './components/items/productsBySearch'
import UpdateProduct from './components/items/updateProducts'
import OrderCreate from './components/orders/orderCreate'
import OrdersDisplay from './components/orders/orderShow'
import Footer from './components/home/footer'  

function App() {
  return (
    <BrowserRouter>
      
      <Switch>
          <Route path ='/'  exact = {true} >   
            <TopMenu/>  
            <ProductBanner/> 
            <Footer/>
          </Route>

          <Route path ='/ShopEx'  exact ={true} >   
            <TopMenu/> 
            <ProductBanner/> 
            <Footer/>
          </Route>
         
          <Route path ='/login'   exact ={true} >
            {localStorage.getItem('token')  ? <Redirect to ='/' /> : <Login/> }
            <Footer/>
          </Route>
 
          <Route path ='/account' exact ={true}>
              <TopMenu/> 
              <CustomerInfo/>
              <Footer/>
          </Route>

          <Route path ='/cart' exact ={true}>
            <TopMenu/> 
            <Cart/>
            <Footer/>
          </Route>
 
          <Route path ='/orders' component ={OrderSummary} exact ={true}>
              <TopMenu/> 
              <OrderSummary/>
              <Footer/>
          </Route>

          <Route path ='/orders/add'  exact ={true} >
              <TopMenu/> 
              <OrderCreate/>
              <Footer/>
          </Route>

          <Route path ='/orders/summary'  exact ={true} >
              <TopMenu/> 
              <OrdersDisplay/>
              <Footer/>
          </Route>


          <Route path ='/categories/list'  exact ={true}>
              <TopMenu/>
              <CategoriesSummary/>
              <Footer/>
          </Route>

          <Route path ='/categories/update' exact ={true}>
              <TopMenu/>
              <CategoryUpdate/>
              <Footer/>
          </Route>

          <Route path ='/products/list' exact ={true} >
              <TopMenu/>
              <ProductsSummary/>
              <Footer/>
          </Route>

          <Route path ='/products/add' exact ={true} > 
              <TopMenu/>
              <AddProduct/>
              <Footer/>
          </Route>

          <Route path ='/search/:text'  exact ={true} render = { (props) => 
                <div>
                    <TopMenu />
                    <ProductSeachbyName {...props} />
                    <Footer/>
                </div> 
              } 
          />                 
               
          <Route path ='/products/query/:id' exact ={true} render = { (props) => 
                <div>
                    <TopMenu />
                    <ProductShowByCategory {...props} />
                    <Footer/>
                </div> 
              }           
          />  

          <Route path ='/products/update/:id'  exact ={true} render = { (props) => 
                <div>
                    <TopMenu />
                    <UpdateProduct {...props} />
                    <Footer/>
                </div> 
              }          
          />      

          <Route path ='/products/:id'  render = { (props) => 
                <div>
                    <TopMenu />
                    <ShowSingleProduct {...props} />
                    <Footer/>
                </div> 
              } 
          /> 
      </Switch>
      
    </BrowserRouter>
   
  );
}

export default App;
