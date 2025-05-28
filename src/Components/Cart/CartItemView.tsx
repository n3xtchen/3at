import { useContext, useState } from 'react'
import { CartItem, cartContext } from '../../Context/CartContext/CartContext'

export default function CartItemView(cartItem: CartItem) {

  const [product, setProduct] = useState<CartItem>(cartItem);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);

  let {deleteItem, updateItem} = useContext(cartContext) ;

  async function updateProduct(num: number) {
    setIsUpdated(false)
    let response = await updateItem(product.id, num)
    if (response?.data.status == 200) {
      // todo: 如何优雅地部分更新 state
      let newProduct: CartProduct = {...product, num}
      setProduct(newProduct)
      setIsUpdated(true)
    }
    // 如果数量减到 0，删除他
    if (num === 0) {
      deleteProduct()
    }
  }

  async function deleteProduct() {
    setIsDeleting(true)
    await deleteItem(product.id)
    // todo: 处理删除失败的情况
    setIsDeleting(false)
  }

  return <div className='row justify-content-around  my-2 px-0 py-4 cart-item align-items-center py-2 border-bottom'>
     <div className="col-lg-10 col-md-8 col-6 d-flex align-items-center">
       <img src={product.img_path} className='cart-img mx-2' alt="" />
       <div>
         <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
         <h6 className='text-main'>price : {product.price}</h6>
         {isDeleting ? 
           <button className='delete-btn'>
             <i className='fas fa-spinner fa-spin p-0 m-0'></i>
             <span className='px-1'>Removing...</span>
           </button> :
           <button className='delete-btn' onClick={deleteProduct}>
             <i className='fa-regular  fa-trash-can  p-0 m-0'></i>
             <span className='px-1'>Remove</span>
           </button>}
       </div>
     </div>
     <div className='col-lg-2 col-md-4 col-6'>
       {isUpdated ? <button onClick={() => updateProduct(product.num+1)} className='btn update-btn border-main btn-sm'>+</button> :
         <button className='btn update-btn border-main btn-sm'><i className='fas fa-spinner fa-spin text-center'></i></button>}
       <span className='px-2'>{product.num}</span>
       {isUpdated ? <button onClick={() => updateProduct(product.num-1)} className='btn update-btn border-main btn-sm'>-</button> :
         <button className='btn update-btn border-main btn-sm'><i className='fas fa-spinner fa-spin'></i></button>}
     </div>
   </div>
}
