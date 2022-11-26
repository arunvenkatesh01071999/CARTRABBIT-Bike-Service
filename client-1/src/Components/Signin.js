import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css';
import axios from 'axios';

export default function Signin(){
    const handlesubmit=async(event)=>{
        event.preventDefault();
        let datastring = new FormData(event.target);
        let config = {header :{"enctype":"multipart/form-data"}};

        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;

        if(email === '' || email === null){
            
            alert("Please enter your email");
        }
        else if(password === '' || password === null){
            alert("Please enter your password");
        }
        else{
            await axios.post("http://localhost:3007/Signin",datastring,config)
            .then(function(res){
                if(res.data.status === "error"){
                    alert("invalid email");
                    window.location.reload();
                }
                else if(res.data.status === "success"){
                    let nam=res.data.name;
                    alert("hello "+nam);
                    localStorage.setItem('username',nam);
                    window.location.href="./Dashboard";
                }
                else if(res.data.status === "invalid_data"){
                    alert("invalid password");
                    window.location.reload();
                }
            })
            .catch(function(error){
                alert(error);
                window.location.reload();
            })
        }
    }

        return(
            <>
                <div className="container-fluid Signinback">
                    <div className="row">
                        <div className="col-lg-4"></div>
                            <div className="col-lg-4 ">
                            <form onSubmit={handlesubmit}>
                                <div className='signinmain p-5'>
                                    <h1>Signin here</h1>
                                    <input type="email" name="email" id="email"  placeholder="enter email" className="Signininp1"/>
                                    <input type="password" name="password" id="password"  placeholder="enter password" className="Signininp1"/><br></br>
                                   <Link to="/"> <button type="button" name="signup" id="signup" className="btn btn-primary text-light mt-3 ml-5">Signup</button></Link>
                                    <button type="submit" name="signin" id="signin" className="btn btn-success text-light mt-3 ml-5">Signin</button>
                                </div>
                                </form>
                            </div>
                        <div className="col-lg-4"></div>
                    </div>

                </div>
            </>
        );

}