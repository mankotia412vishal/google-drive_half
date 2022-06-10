import React,{useState} from 'react'
import "./CSS/sidebar.css"
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from '@mui/material';
import { db, storage } from './firebase';
import firebase  from 'firebase';


export const Sidebar = () => {
  const[open,setOpen]=useState(false);
  const[uploading,setUploading]=useState(false);
  const[file,setFile]=useState(null);

  const handleClose=()=>{
    setOpen(false);
  }
  const handleOpen=()=>{
    setOpen(true);
  }
  const handleChange=(e)=>{
    if(e.target.files[0]){
      setFile(e.target.files[0])
    }
  }
  const handleUpload=(event)=>{
    event.preventDefault();
    setUploading(true);

    storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
      storage.ref("files").child(file.name).getDownloadURL().then(url=>{
        db.collection("myfiles").add({
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          filename:file.name,
          fileURL:url,
          size:snapshot._delegate.bytesTransferred
        })
        setUploading(false);
        setFile(null)
        setOpen(false);
      })
    })
  }
  return (
    <>
    <Modal open={open} onClose={handleClose}>
    <div className='modal_pop'>
      <form>
        <div className='modalHeading'>
          <h3>Select file you want to upload📁</h3>

        </div>
        <div className='modalBody'>
          {
            uploading ?(<p className='uploading'>Uploading</p>):(
            <>
              <input type="file" onChange={handleChange}/>
              <input type="submit" className='post_submit' onClick={handleUpload}/>
              </>
            )
          }
         
        </div>
      </form>
    </div>
    </Modal>
    <div className='sidebar'>
<div className='sidebar_btn'>
<button onClick={handleOpen}>
    <img src='data:image/png;base64,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'/>
    <span>New</span>
</button>

<div className='sidebar_options'>
  <div className='sidebar_option sidebar_option-Active'>
    <MobileScreenShareIcon/>
    <span><b>My Drive</b></span>
  </div>
  <div className='sidebar_option'>
    <DevicesIcon/>
    <span>Computers</span>
  </div>
  <div className='sidebar_option'>
    <PeopleAltIcon/>
    <span>Shared with me</span>
  </div>
  <div className='sidebar_option'>
    <QueryBuilderIcon/>
    <span>Recent</span>
  </div>
  <div className='sidebar_option'>
    <StarBorderIcon/>
    <span>Stared</span>
  </div>
  
  {/* <div className='sidebar_option'>
    <CloudQueueIcon/>
    <span>Stared</span>
  </div> */}
  <div className='sidebar_option'>
    <DeleteOutlineIcon/>
    <span>Trash</span>
  </div>
</div>
</div>
<hr/>
<div className='sidebar_options'></div>
<div className='sidebar_option'>
    <CloudQueueIcon/>
    <span>Storage</span>
  </div>

  <div className='progress_bar'>
    <progress size="tiny" value='50' max='100'/>
    <span>6.45 GB of 15 GB used</span>
  </div>

    </div>
    </>
  )
}
