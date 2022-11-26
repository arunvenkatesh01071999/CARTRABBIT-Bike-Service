import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

import './Page1.css';

export default function Page1(){

    const singlesubmit=async(event)=>{
            event.preventDefault();
            const datastring=new FormData(event.target);
            const config={headers:{"enctype":"multipart/formdata"}};

            let name=document.getElementById("name").value;
            let number=document.getElementById("number").value;
            let email=document.getElementById("email").value;
            let password=document.getElementById("password").value;

            if(name === '' || name === null){
                alert("please enter name");
            }
            else if(number === '' || number === null){
                alert("please enter phone number");
            }
            else if(email === '' || email === null){
                alert("please enter email id");
            }
            else if(password === '' || password === null){
                alert("please enter password");
            }
            else{
                
                await axios.post("http://localhost:3007/Page1",datastring,config)
                .then(function(res){
                        if(res.data.status === "error"){
                            alert("error");
                            window.location.reload();
                        }
                        else if(res.data.status === "inserted")
                        {
                            alert("inserted")
                            window.location.href="./";
                        }
                })
                .catch(function(error){
                    alert("error");
                    window.location.reload();
                })
           
            }
    }
    return(
        <>
;            <div className="container-fluid Page1rdivmain ">
                    <div className="row Page1divhead">
                        {/* <div className="Page1divhead"> */}
                            <div className="col-lg-10">&nbsp;</div>
                            <div className="col-lg-2">
                            <Link to="/Signin">  <button type="button" name="signin" id="signin" className="btn btn-dark text-light mt-3 ml-5">Signin</button></Link>
                            </div>
                        {/* </div> */}

                    </div>
                <div className="row">

                    <div className="col-lg-7 m-3">
                    <Carousel variant="dark">
                            <Carousel.Item>
                                <img
                                className="d-block  Page1carouselimg"
                                src="https://static.gobumpr.com/new_carousel_webp/bike-general-service/img_2"
                                alt="First slide"
                                />
                                {/* <Carousel.Caption>
                                <h5>First slide label</h5>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block Page1carouselimg "
                                src="https://static.gobumpr.com/new_carousel_webp/bike-general-service/img_1"
                                alt="Second slide"
                                />
                                {/* <Carousel.Caption>
                                <h5>Second slide label</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            {/* <Carousel.Item>
                                <img
                                className="d-block Page1carouselimg "
                                src="https://autozang.com/images/coverimg1.jpg"
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                                </Carousel.Caption>
                            </Carousel.Item> */}
                     </Carousel>
                    </div>
                    
                        <div className="col-lg-4" >
                        <form onSubmit={singlesubmit}>
                            <div className="Page1rdiv m-3">
                                    <h1>Book a Bike service</h1>
                                    <input type="text" name="name" id="name" placeholder="enter name" className="form-control m-2"/>
                                    <input type="number" name="number" id="number" placeholder="enter phone number" className="form-control m-2" />
                                    <input type="email" name="email" id="email" placeholder="enter email" className="form-control m-2"/>
                                    <input type="password" name="password" id="password"  placeholder="enter password" className="form-control m-2"/>
                                    <input type="checkbox" name="checkbox" id="checkbox" />
                                    <lable> are u ready for bike service</lable><br></br>
                                    <button type="submit" name="signup" id="signup" className="btn btn-primary text-light mt-3">Signup</button>
                                <Link to="/Signin"> <button type="button" name="signin" id="signin" className="btn btn-dark text-light mt-3 ml-5">Signin</button></Link>
                                </div>
                           </form>
                        </div>
                        
                        <div className="col-lg-1">&nbsp;</div>
                </div>

            </div>
   
        </>
        
    );
}