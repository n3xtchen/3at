import React from 'react'

export default function Footer() {
  return <>
  <footer className='p-5 fixed-bottom bg-light '>
    <h2>Get The FreshCart App</h2>
    <p className='text-muted'>we will send you a link , open it in your phone to download the app</p>
  <div className=''>
    <input type="email" name="email" id="email" className=' w-75 mb-2 py-2 px-2 me-5' placeholder='Email...' />
    <button className='btn bg-main py-2  text-white'>Share App Link</button>
  </div>
  </footer>
  </>
}
