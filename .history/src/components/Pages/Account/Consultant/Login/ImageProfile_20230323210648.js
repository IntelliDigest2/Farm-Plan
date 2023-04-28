import React, { useState } from "react";

import { AiOutlineCamera, AiOutlinePicture } from "react-icons/ai";

import "../ConsultantAuth/login.css";
import { storage } from "../../../../../config/fbConfig";

const ImageProfile = ({ setShow }) => {
	//  const[profile, setProfile] =useState("")
	//  const [current,setCurrent] = useState("https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg")

	return (
		<>
			{/* <input 
          // style={{display:"none"}}
          type='file' 
          accept='image/*'
          onChange={handleChange} 
           /> */}

			{/* <div className='profile-main'>
           <img  className='profile-contanier'  src ={current} />
           </div>
           <div  className='profile-update'>
            <AiOutlineCamera  style={{marginTop:"10px",textAlign:"center"}}
              />
            </div>  */}

			{/* the contanier displays on clicking the camera button */}
			<div className="overlay-contanier" onClick={() => setShow(false)}></div>

			<section className="modal-contanier" onClick={() => setShow(false)}>
				<h4>Profile photo</h4>
				<div className="modal-icons-contanier">
					<div className="bottom-icon1">
						<AiOutlineCamera
							style={{ fontSize: "20px", color: "#0c0847", marginTop: "10px" }}
						/>
						<p style={{ marginTop: "20px" }}>Camera</p>
					</div>
					<div className="bottom-icon1">
						<AiOutlinePicture
							style={{ fontSize: "20px", color: "#0c0847", marginTop: "10px" }}
						/>
						<p style={{ marginTop: "20px" }}>Gallery</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default ImageProfile;

{
	/* <Form.Group className='form-group'>
           <Form.Label className='form-label1'> 7. Upload Profile Photo <span style={{color:"red"}}>*</span></Form.Label>
          <div >
            <img src ={current} style={{objectFit:"contain",height:}}></img>
            </div>
          <Form.Control type="file"  
             id="profileImage"
             accept='image/*'
             onChange ={handleChange} required>
             </Form.Control>
          <button style={{ width: "20%" ,outline:"none"}} onClick={imageChange}>upload</button>
           <p>{success}</p>
            </Form.Group> */
}

// for image profile
// const uploadFiles = (profile) => {
//uploads document to firebase storage and gives feedback to the user
// const uploadTask = storage.ref(`consultant/${profile.name}`).put(profile);

//    uploadTask.on(
//     "state_changed",
//     (error) => console.log(error),
//      () => {
//     storage
//       .ref("consultant")
//       .child(profile.name)
//       .getDownloadURL()
//       .then((url) => console.log(url))
//       .catch ((err)=>console.log(err));
//   }
// )}
// updates images and send them to the store
// const  imageChange = (e) =>{
//   if(profile){
//     e.preventDefault();
//     uploadFiles(profile);
//     setSuccess("image successfully uploaded")
//   }
//   else{
//     e.preventDefault();
//     setSuccess("oops,there has been an error,try uploading again")
//   };
// };

// display th image in our form for preview
// function handleChange(e){
//   const file = e.target.files[0]
//   if(file){
//     setProfile(file)
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload=(e) => {
//       const data = e.target.result
//       setCurrent(data)
//     }
//   }
//    }
