import React from 'react'

export default function Header({title,description,img}) {
  return (
    <>
    <div className="container-fluid header">
      <div className="row ">
        <div className="col-md-8 ">
          <div className="content text-white">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-4 ">
          <div className="img">
           <img className='w-50' src= {img} alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
