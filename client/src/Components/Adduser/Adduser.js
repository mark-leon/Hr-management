import React from 'react';
import { useRef } from "react";
import axios from "axios";

const Adduser = () => {
    const firstname = useRef();
    const lastname = useRef();
    const email = useRef();
    const handleClick = async (e) => {
        e.preventDefault();
        const user = {
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            email: email.current.value,
          };
          try {
            await axios.post("/users", user);
            alert("Successfully Added")
          } catch (err) {
            console.log(err);
          }
        }
    return (
        <div className='container'>
           <form onSubmit={handleClick}>  
                <div className="row mb-4">
                    <div className="col">
                    <div className="form-outline">
                        <input ref={firstname} type="text" id="form3Example1" required className="form-control" />
                        <label className="form-label" for="form3Example1">First name</label>
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-outline">
                        <input ref={lastname} type="text" id="form3Example2" required className="form-control" />
                        <label className="form-label" for="form3Example2">Last name</label>
                    </div>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <input ref={email} type="email" id="form3Example3" required className="form-control" />
                    <label className="form-label" for="form3Example3">Email address</label>
                </div> 
                <button type="submit" className="btn btn-primary btn-block mb-4">Add HR</button>
            </form>
        </div>
    )
}

export default Adduser



