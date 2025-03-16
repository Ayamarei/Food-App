import React from 'react'

export default function Pagination({arrayOfPages,PaginationFun}) {
  return (
   <>
    <div>
        <nav aria-label="Page navigation example" >
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true" className='text-black'>Previous</span>
      </a>
    </li>
    {arrayOfPages?.map((page)=>(
         <li  key={page} onClick={()=>{PaginationFun(4,page)}} className="page-item"><a className="page-link text-black" href="#">{page}</a></li>
    ))}
   
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true" className='text-black'>Next</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
   </>
  )
}



