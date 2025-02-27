import React from 'react'

export default function Navbar({loginData}) {

console.log(loginData);

  return (
    <>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page">{loginData?.userName}</a>
        </li>
        
       
      </ul>
      
    </div>
  </div>
</nav>
    
    </>
  )
  
}
