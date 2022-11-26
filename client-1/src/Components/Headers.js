import React from "react";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Headers.css';
import 'bootstrap/dist/css/bootstrap.min.css';





    export default function Headers(){
        var username = localStorage.getItem('username');
        let [userdata,setUserdata] = useState([]);
    
        useEffect(()=>{
            load_user();
        },[]);
    
        const load_user = () => {
            var datastring = {username:username};
            var config = {headers : {"enctype":"multipart/form-data"}};
            axios.post('http://localhost:3007/userdetails',datastring,config)
            .then(function(res){
                setUserdata(res.data.status);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    
    return(
        <>
        <div className="row borders headermaindiv">
           
            <div className="col-lg-4">&nbsp;</div>
            <div className="col-lg-4">&nbsp;</div>
            <div className="col-lg-4">
                <ul className="list_data">
                    <li><span>Welcome {userdata}</span></li>
                    <li><Link to="/"><button className="btn btn-danger">Logout</button></Link></li>
                </ul>
            </div>
        </div>
        </>
   
    );
}