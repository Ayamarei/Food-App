import React from 'react'
import image from '../../../assets/images/no-data.png'

export default function NoData() {
  return (
    <>
     <div className='text-center'>
      <img src={image} alt="" />
      <h3>No Data !</h3>
      <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>
     </div>
    </>
  )
}
