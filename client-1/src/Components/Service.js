// import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Service.css';
import {Link} from 'react-router-dom';

export default function Service(){
    
    const [detail,setDetail] = useState([]);
    

    useEffect(()=>{
            axios.get('http://localhost:3007/view')
            .then(function(res){
                setDetail(res.data);
            })     
        })
      

        const Delet = (id) =>{
             axios.delete(`http://localhost:3007/delet/${id}`)
             .then(function(res){
                 if(res.data.status==='deleted'){
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                        }
                      })
                     //window.location.reload();
                 }
             })
        //   .catch(function(err){
        //         alert(err);
        //         //window.location.reload();
        //     })
          }

       
         const Updat = (id) =>{                       
                        localStorage.setItem('usid',id);
                        window.location.href='/Edit'                     
                    }
          

    return(
        <>
        <div className="container-fluid service_back">
           
           <div className="ml-auto mr-auto col-lg-12">
           <h3 className='mt-5'>Bike Service  Management System</h3>
           <div className="row mt-5">
              <div className='col-lg-3'><input type="search" name="search" id="search" placeholder="Search" className='form-control'/></div>
              <div className='col-lg-8'>&nbsp;</div>
              <div className='col-lg-1'><Link to="/Details"><button type="button" className="btn btn-dark pr-3 pl-3 add_btn">ADD</button></Link></div>
           </div>
           </div>
            <div className='col-lg-12 ml-auto mr-auto mt-5'>
            <div className="table-responsive table-bordered">
                <table className="container">
                    <thead>
                        <tr>
                        <th className='p-3'>ID</th>
                            <th className='p-3'>CUCTOMER NAME</th>
                            <th className='p-3'>BIKE NAME</th>
                            <th className='p-3'>COMPLIENTS</th>
                            <th className='p-3'>EMAIL</th>
                            <th className='p-3'>DATE</th>
                            <th className='p-3'>PROCESS</th>
                            <th className='p-3'>ACTION</th>
                            <th className='p-3'>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                    {detail.map((value,index)=>(       
                        <tr key={index}>
                             <td className='p-3'>{value.id}</td>
                            <td className='p-3'>{value.cname}</td>
                            <td className='p-3'>{value.bname}</td>
                            <td className='p-3'>{value.complients}</td>
                            <td className='p-3'>{value.email}</td>
                            <td className='p-3'>{value.dat}</td>
                            <td className='p-3'>{value.process}</td>
                            <td className='p-3'><button onClick={()=>{Updat(value.id)}} className='btn btn-primary'>Edit</button></td>
                            <td className='p-3'><button onClick={()=>{Delet(value.id)}} className='btn btn-danger'>Delete</button></td> 
                          
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    );
}