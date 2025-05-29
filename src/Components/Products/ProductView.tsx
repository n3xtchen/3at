import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import { cartContext } from '../../Context/CartContext/CartContext'
import { wishlistContext } from '../../Context/WishListContext/WishListContext'
import { Product } from '../../Context/ProductContext/ProductContext'

export default function ProductView(prod: Product) {

  const [product, setProduct] = useState<Product>({
    id: 0,
    boss_id: 0,
    category_id: 0,
    category: {
      id: 0,
      category_name: ""
    },
    name: "",
    title: "",
    price: 0.0,
    img_path: "",
    ratingsAverage: 0
  })
  const [addedProduct, setAddedProduct] = useState(null)
  const [likedItem, setLikedItem] = useState(0)

  let { addToCart } = useContext(cartContext);
  let { likedProducts, addToWishList, deleteFromWishList } = useContext(wishlistContext);

  async function addProductToCart(bossId, productId, num){
    setAddedProduct(productId);
    let response =  await addToCart(bossId, productId, num);
    if (response?.status === 200) {
      setAddedProduct(null)
      toast.success(response.statusText)
    } else {
      setAddedProduct(null)
      toast.error(response.statusText)
    }
  }

  async function addProductToWishList(productId: number, bossId: number){
    setLikedItem(productId)
    let { data }  = await addToWishList(productId, bossId);
    if(data.status == 200) {
      toast.success(data.msg)
    }
    setLikedItem(0)
  }

  async function removeProductFromWishList(productId: number, bossId: number){
    setLikedItem(productId)
    let {data} = await  deleteFromWishList(productId, bossId);
    if (data?.status == 200) {
      toast.success("product removed successfully from your wishlist")
    }
    setLikedItem(0)
  }

  useEffect(() => {
    setProduct(prod)
  })

  return <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12  h-25 '>
    <div className='product py-3 position-relative px-3'>
      {/* 喜欢按钮的过度阶段  */}
      {product.id == likedItem ? <i className='fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1' ></i>:""}
      {/* 是否喜欢 */}
      { likedProducts.includes(product.id) && likedItem == 0 ? 
        <i onClick={()=>removeProductFromWishList(product.id, product.boss_id)} className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "></i> :
        <i onClick={()=>addProductToWishList(product.id, product.boss_id)} className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "></i>
      }
      <Link to={`/productDetails/${product.id}`}>
        <img src={product.img_path} alt="" className='w-100 p-2' />
        <span className='text-main font-sm fw-bold'>{product.category?.category_name}</span>
        <h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='d-flex justify-content-between'>
          <span className='text-muted'>$ {product.price}</span>
          <span>
            <i className='fas fa-star rating-color'></i>
            {product.ratingsAverage}
          </span>
        </div>
      </Link>
      {addedProduct == product.id ? <button className='btn bg-main text-white w-100 my-2'><i className='fas fa-spinner fa-spin'></i> Adding... </button>:<button onClick={()=>addProductToCart(product.boss_id, product.id, 1)} className='btn bg-main text-white w-100 my-2'>Add to Cart + </button>}
    </div>
  </div>
}


