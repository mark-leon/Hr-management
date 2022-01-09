import React from 'react'
import axios from 'axios';
import {useState,useEffect}  from 'react';
import Pagination from '../Pagination/Pagination';
const Getuser = () => {
    const [user,setUser] = useState([]);
    const [search, setSearch] = useState('');
    const [currentpage,setCurrentpage] = useState(1)
    const [postsPerPage] = useState(5);


    useEffect(() => {
        axios.get(`/users`)
        .then(res => {
          setUser(res.data)
        })
        .catch(error => console.log(error));
    }, []);
    
    

    const handleChange = e => {
      setSearch(e.target.value);
    };
  
    const filteredUser = user.filter(user =>
      user.firstname.toLowerCase().includes(search.toLowerCase() ) 
      ||user.lastname.toLowerCase().includes(search.toLowerCase() )
      );
    
    const indexOfLastPost = currentpage*postsPerPage;
    const indexOfFirstPost  = indexOfLastPost - postsPerPage;
    const result = (filteredUser.length > 0)? filteredUser.slice(indexOfFirstPost,indexOfLastPost) :user.slice(indexOfFirstPost,indexOfLastPost) 
    
    const paginate = pageNumber => setCurrentpage(pageNumber);
     return (
        <div className="container">
          <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" onChange={handleChange} type="search" placeholder="Search Name" aria-label="Search"/>
          </form>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">first name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Address</th>
              </tr>
            </thead>
            <tbody>
            {result.map((c)=>{
            return<tr>
              <th scope="row"></th>
              <td>{c.firstname}</td>
              <td>{c.lastname}</td>
              <td>{c.email}</td>
            </tr>
            })}
            </tbody>
          </table>
          <Pagination postsPerPage = {postsPerPage} totalPosts = {filteredUser.length > 0 ? filteredUser.length :user.length} paginate = {paginate}></Pagination>
        </div>
    )
}

export default Getuser


