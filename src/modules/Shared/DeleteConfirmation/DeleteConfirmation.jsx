import React from 'react'
import confirmImag from "../../../assets/images/no-data.png"
import { useForm } from 'react-hook-form'

export default function DeleteConfirmation({close,confirmDelete}) {
 
  return (
    <>
    <div className='modal  d-flex align-items-center justify-content-center'>
    <div className=' bg-white rounded-2 position-relative '>
    <i className="fa-regular fa-circle-xmark fs-3 position-absolute end-0 p-3 text-danger" onClick={close}></i>
      <div className="content text-center p-4 my-5">
      <img src={confirmImag}  width={"100"} alt="Confirmation Image" />
      <h2>Delete This Item ? </h2>
      <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
      <button className='position-absolute end-0 bottom-0  m-3 rounded-2 px-3 py-2 btn_delete' onClick={confirmDelete}> Delete this item</button>
    </div>

    </div>

   {/* <div>
   <div className="modal d-block " tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content p-3">
     
      <div className="modal-header">
        <button type="button" className="btn-close text-danger" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <img src={confirmImag} className='w-25' alt="confirm Imag" />
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
   </div> */}
    </>
  )
}
