const cors=require('cors');
const express=require('express');
const mydbms=require('mysql');
const bodyparser=require('body-parser');
const fileupload=require('express-fileupload');

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(fileupload());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

const c=mydbms.createConnection({
        host:"localhost",
        user:"root",
        password:"arun9629",
        database:"bikeservice"
})
c.connect(function(error){
    if(error){
        console.log("error");
    }
    else{
        console.log("hi database connected successfully");
    }
})
   
app.post('/Page1',(req,res)=>{
    let name=req.body.name;
    let number=req.body.number;
    let email=req.body.email;
    let password=req.body.password;

    let sql='insert into bikeservice.bikes(name,ph_number,email,password )values(?,?,?,?)';

    c.query(sql,[name,number,email,password],(error,result)=>{
        if(error){
            let s={"status":"error"};
            res.send(s);
        }
        else{
            let s={"status":"inserted"};
            res.send(s);
        }

    })

})
app.post('/Signin',(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let sql='select * from bikeservice.bikes where email=?';
    c.query(sql,[email],(error,result)=>{
        if(error){
            let s={"status":"error"};
            res.send(s);
        }
        else if(result.length>0){
            let email2=result[0].email;
            let password2=result[0].password;
            let name2=result[0].name;
            if(email === email2 && password === password2){
                let s={"status":"success","name":name2};
                res.send(s);
            }
            else{
                let s={"status":"invalid_data"};
                res.send(s);
            }
        }
        else{
            let s={"status" :"error"};
            res.send(s);
        }
    })
})

app.post('/Details',(request,response)=>{
    

    const cname=request.body.cname;
    const bname=request.body.bname;
    const complients=request.body.complients;
    const email=request.body.email;
    const dat=request.body.dat;
    const process=request.body.process;

    const sql='insert into bikeservice.servicedetail(cname,bname,complients,email,dat,process)values(?,?,?,?,?,?)';

    c.query(sql,[cname,bname,complients,email,dat,process],(err,res)=>{
        if(err){
            let s = {'status':'Error'}
            response.send(s);
        }else{
            let s = {'status':'insert'}
            response.send(s);
        }
    })
})

app.get('/view',(request,response)=>{
    const sql='select * from bikeservice.servicedetail'
    c.query(sql,(err,res)=>{
        if(err){
          console.log(err);
        }
        else{
            response.send(res);
        } 
    });
})

app.delete('/delet/:id',(request,response)=>{

    let id = request.params.id;

    let sql = 'DELETE from bikeservice.servicedetail where id=?';

    c.query(sql,id,(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            let s = {'status':'deleted'}
            response.send(s);
        }
    });
})

app.put('/updat',(request,response)=>{

    const cname=request.body.cname;
    const bname=request.body.bname;
    const complients=request.body.complients;
    const email=request.body.email;
    const dat=request.body.dat;
    const process=request.body.process;
    const id=request.body.usid;

        let sql = `update bikeservice.servicedetail set cname=?,bname=?,complients=?,email=?,dat=?,process=? where id=${id}`;
    
        c.query(sql,[cname,bname,complients,email,dat,,process],(err,res)=>{
            if(err){
                let s={"status":"err"}
                response.send(s);
            }
            else{
                let s={"status":"updated"};
                response.send(s);
            }
        })
    })

    app.get('/editview/:usd',(request,response)=>{     
        let id = request.params.usd;
        let sql=`select * from bikeservice.servicedetail where id=${id}`;

        c.query(sql,(err,res)=>{
            if(err){
              console.log(err);
            }
            else{
                response.send(res);
            } 
        });
    })








app.listen(3007);