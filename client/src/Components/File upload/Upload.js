// import React from 'react'
// import "./upload.css";

// const Upload = () => {
//     return (
    // <div className="container">
	// <div className="row">
	//    <div className="col-md-6">
	//       <form method="POST" action="/upload" id="#" enctype="multipart/form-data">           
    //           <div className="form-group files color">
    //             <label>Upload Your File </label>
    //             <input type="file" className="form-control" name="myFile"/>
    //           </div>      
    //       </form> 
    //       <form action="/uploadfile" enctype="multipart/form-data" method="POST"> 
    //         <input type="file" name="myFile" />
    //         <input type="submit" value="Upload a file"/>
    //      </form>          
	//   </div>
	// </div>
    // </div>
//     )
// }

// export default Upload




import React, { useState } from "react";
import axios from "axios";
import "./upload.css";

  const Upload = () => {
    const [fileData, setFileData] = useState("");
    const getFile = (e) => {
        setFileData(e.target.files[0]);
    };
    const uploadFile = (e) => { 
        e.preventDefault();   
        const data = new FormData();
        data.append("file", fileData);
        axios({
          method: "POST",
          url: "http://localhost:5000/upload",
          data: data,
        }).then((res) => {       
            alert(res.data.message);
        });
    };
      return (
        //   <div>
        //       <form onSubmit={uploadFile}>
        //       <input type="file" name="file" onChange={getFile} required />
        //       <input type="submit" name="upload" value="Upload" />
        //       </form>
        //   </div>
          <div className="container">
          <div className="row">
             <div className="col-md-6">
                <form onSubmit={uploadFile} enctype="multipart/form-data">           
                    <div className="form-group files color">
                      <label>Upload Your File </label>
                      <input type="file" className="form-control" onChange={getFile} name="file" required/>
                      <input type="submit" value="Upload"/>
                    </div>      
                </form> 
            </div>
          </div>
          </div>


      )
  }
  
  export default Upload
  