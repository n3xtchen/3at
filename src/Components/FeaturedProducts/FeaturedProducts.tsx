import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext/CartContext'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../Context/WishListContext/WishListContext'
import { productContext, ThemeContext } from '../../Context/ProductContext/ProductContext'

export default function FeaturedProducts() {
  const [addedProduct, setAddedProduct] = useState(null)
  const [likedItem, setLikedItem] = useState(null)
  const [likedProducts, setLikedProducts] = useState([]);
  const [wishlist, setWishList] = useState(null);

  let {products, setProducts, getProducts} = useContext(productContext)
  let {addToCart,setNumOfCartItems} = useContext(cartContext);
  let {getLoggedUserWishList, addToWishList, deleteFromWishList, setNumOfWishListItems} = useContext(wishlistContext);

  async function addProduct(productId){
    setAddedProduct(productId);
    let response =  await addToCart(productId);
    if (response?.data?.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems)
      setAddedProduct(null)
      toast.success(response.data.message)
    } else {
      setAddedProduct(null)
      toast.error(response.message);
    }
  }

  async function getLikedProducts(){
    // let {data} =  await getLoggedUserWishList();
    // setWishList(data.data);
    // setLikedProducts(data.data.map((product)=> product.id))  
  }

  useEffect(()=>{
    getProducts()
    getLikedProducts()
  },[])

  async function addProductToWishList(productId){
    setLikedItem(productId)
    let {data} = await  addToWishList(productId);
    if(data.status == "success"){
      setNumOfWishListItems(data.data.length)
      setLikedItem(null)
      toast.success(data.message)
      setLikedProducts(data.data)
    }
  }

  async function removeProductFromWishList(productId){
    setLikedItem(productId)
    let {data} = await  deleteFromWishList(productId);
    if (data?.status == "success") {
      setNumOfWishListItems(data.data.length)
      setLikedItem(null)
      toast.success("product removed successfully from your wishlist")
      setLikedProducts(data.data)
    }
  }

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  return <>
    <div className="row justify-content-center ">
      {products?products.map((product,i)=><div key={i} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12  h-25 '>
        <div className='product py-3 position-relative px-3'>
          {product.id ==likedItem ? <i className='fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1' ></i>:""}
          {likedProducts.includes(product.id)&&product.id != likedItem?<i onClick={()=>removeProductFromWishList(product.id)} className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "></i>:""}
          {likedProducts.includes(product.id)==false&&product.id != likedItem?<i onClick={()=>addProductToWishList(product.id)} className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "></i>:""}
          <Link to={`/productDetails/${product.id}`}>
            <img src={product.img_path} alt="" className='w-100 p-2' />
            <span className='text-main font-sm fw-bold'>{product.category_id}</span>
            <h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
            <div className='d-flex justify-content-between'>
              <span className='text-muted'>{product.price} EGP</span>
              <span>
                <i className='fas fa-star rating-color'></i>
                {product.ratingsAverage}
              </span>
            </div>
          </Link>
          {addedProduct == product._id ? <button className='btn bg-main text-white w-100 my-2'><i className='fas fa-spinner fa-spin'></i> Adding... </button>:<button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100 my-2'>Add to Cart + </button>}
        </div>
      </div>) : <div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>}
      </div>
   </>
}


