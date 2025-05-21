import axios from 'axios'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext/CartContext.jsx';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishListContext/WishListContext.jsx';

export default function CategoryProducts() {
  

    const [categoryProducts, setCategoryProducts] = useState(null);
    const [addedProduct, setAddedProduct] = useState(null)
    const [likedItem, setLikedItem] = useState(null)
const [likedProducts, setLikedProducts] = useState([]);
const [wishlist, setWishList] = useState(null);
let {getLoggedUserWishList,addToWishList,deleteFromWishList} = useContext(wishlistContext);



let {addToCart,setNumOfCartItems} = useContext(cartContext);

useLayoutEffect(()=>{
  document.documentElement.scrollTop = 0;
},[])
    let {id}= useParams();

    async function getLikedProducts(){
      let {data} =  await getLoggedUserWishList();
      setWishList(data.data);
    setLikedProducts(data.data.map((product)=> product.id))  
      }
  
      async function addProductToWishList(productId){
        setLikedItem(productId)
      let {data} = await  addToWishList(productId);
      if(data.status == "success"){
        setLikedItem(null)
        toast.success(data.message)
        setLikedProducts(data.data)
      }
  
      }
      async function removeProductFromWishList(productId){
        setLikedItem(productId)
      let {data} = await  deleteFromWishList(productId);
      if(data?.status == "success"){
        setLikedItem(null)
        toast.success("product removed successfully from your wishlist")
        setLikedProducts(data.data)
      }
  
      }
   async function getCategoryProducts(){

    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products?category=${id}`) ; 
    setCategoryProducts(data.data);

    }
    async function addProduct(productId){
        setAddedProduct(productId);
          let response =  await addToCart(productId);
          if(response?.data?.status === "success"){
            setNumOfCartItems(response.data.numOfCartItems)
            setAddedProduct(null)
            toast.success(response.data.message)
          }else{
            setAddedProduct(null)
            toast.error(response.message);
          }
        
      }
      useEffect(() => {
        getLikedProducts()
        getCategoryProducts();
      
       
      }, [])
      
  return <>
    <div className="row justify-content-center mt-5 ">
   
   {categoryProducts?    
   categoryProducts.length>0?
   categoryProducts.map((product,i)=><div key={i} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12'>
 <div className='product py-3 position-relative px-3'>
{product.id==likedItem?<i className='fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1' ></i>:""}

{likedProducts.includes(product.id)&&product.id != likedItem?<i onClick={()=>removeProductFromWishList(product.id)} className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "><i cl></i></i>:""}
{likedProducts.includes(product.id)==false&&product.id != likedItem?<i onClick={()=>addProductToWishList(product.id)} className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "></i>:""}
   <Link to={`/productDetails/${product.id}`}>
   <img src={product.imageCover} alt="" className='w-100 p-2' />
    <span className='text-main font-sm fw-bold'>{product.category.name}</span>

    <h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
    <div className='d-flex justify-content-between'>
        <span className='text-muted'>{product.price} EGP</span>
        <span><i className='fas fa-star rating-color'></i>
        {product.ratingsAverage}
        </span>
    </div>
   </Link>
    {addedProduct == product._id ? <button className='btn bg-main text-white w-100 my-2'><i className='fas fa-spinner fa-spin'></i> Adding... </button>:<button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100 my-2'>Add to Cart + </button>}
</div>
 </div>):<div className=' d-flex justify-content-center align-items-center text-main '>

<div className='text-center not-availbale'>
    <h2>No Products Available Now </h2>
    <i class="fa-solid fa-ban fa-5x"></i>
</div>

 </div>
   
   
   
   
   :<div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>}
   </div>
 
  
  </>

}
