import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import './Edit.css';
// import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
export  function Edit(){

    var usid=localStorage.getItem('usid');
    

const datasubmit = async(event)=>{
         event.preventDefault();
        
         const datastring = new FormData(event.target);
         const config = {headers:{'enctype':'multipart/form-data'}};

         
          await  axios.put('http://localhost:3007/updat',datastring,config)
            .then(function(res){
                if(res.data.status==='updated'){
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Your data has been updated',
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      .then((result) => {
                        if (result) {
                          Swal.fire(
                            window.location.href="/Dashboard"
                          )
                        }
                      })
                }
            })
            .catch(function(err){
                alert(err);
                window.location.reload();
            })
        }


        const [detail,setDetail] = useState([]);
       
        const Param=()=>usid    

        useEffect(()=>{
         axios.get(`http://localhost:3007/editview/${Param()}`)
            .then(function(res){
                setDetail(res.data);
            })     
        })
          
              
    return(
        <div>
         {detail.map((value,index)=>(       
            <div className="container ml-auto mr-auto mt-5 p-5 Edit_back" key={index}>
            <h3>Edit Service Details</h3>
            <form onSubmit={datasubmit}>
            <div className="row mt-5 col-lg-12">
                <div className="col-lg-6">
                <table>
                  <tbody>
                        <tr className="font-weight-bold">
                            
                            <td>Name<input type="hidden" name="usid" id="usid" value={usid}/></td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="cname" id="cname" className="form-control" defaultValue={value.cname} required/></td>   
                        </tr>
                        <tr className="font-weight-bold">
                            <td>Email</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="email" name="email" id="email" className="form-control" defaultValue={value.email} required/></td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td>Complients</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="complients" id="complients" className="form-control" defaultValue={value.complients} required/></td>
                        </tr>
                       
                  </tbody>
                </table>
                
                </div>
                <div className="col-lg-6">
                <table>
                    <tbody>
                        <tr className="font-weight-bold">
                            <td>Bike Name</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="bname" id="bname" className="form-control" defaultValue={value.bname} required/></td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td >DATE</td>
                            <td className="p-3">:</td>
                            <td className="p-3">  <input type="date" name="dat" id="dat" className="form-control" defaultValue={value.dat} required/></td>
                        </tr>
                        <tr className="font-weight-bold">
                            <td>PROCESS</td>
                            <td className="p-3">:</td>
                            <td className="p-3"><input type="text" name="process" id="process" className="form-control" defaultValue={value.process} required/></td>
                         </tr>
                    </tbody>
                </table>
                     
                </div>
                <div className="col-lg-12">
                        {/* <div className='d-flex font-weight-bold'>
                           <div className='pt-3 pr-4'>About</div>
                           <div className='pt-3 pl-4 pr-4'> <p>:</p></div>
                           <div className='col-lg-9 pt-3'><textarea name="about" id="about" className="form-control" defaultValue={value.about} required></textarea></div>
                        </div> */}
                           <div className="p-5 update_btn"><button type="submit" name="submit" className="btn btn-dark">Update</button></div>
                
                </div>
                       
            </div>
            </form> 
                        
                </div>
                ))}
            </div>

        
    );
}