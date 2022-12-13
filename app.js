const path=require('path');
const express=require('express')
const ejs=require('ejs')
const BodyParser=require('body-parser')
const mysql=require('mysql');
const bodyParser = require('body-parser');
const app=express();
const port=4000
const tablename = "Event_details"
const connection=mysql.createConnection(
    {
        host:'miniproject.crqa9qnfogfe.us-east-1.rds.amazonaws.com',
        user:'ashwin',
        password:'ashwin123',
        database:'miniproject',
        port:'3306',
        connectionLimit:15,
        queueLimit:30,
        acquireTimeout:100000
    }
)
connection.connect(function(error)
{
    if(!!error) console.log(error);
    else console.log('database established');
})

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
     res.render('index',{
        
    });
});

app.get('/setter', (req, res) => {
    // res.send({
    //     title:"starting node server"
    // })
    
    // let createquery = "CREATE TABLE IF NOT EXISTS ?? (ID int NOT NULL AUTO_INCREMENT,name VARCHAR(255),college VARCHAR(255),event VARCHAR(255),participant VARCHAR(255),PRIMARY KEY (ID))"

    // let insertQuery = "Insert into ?? (name, college, event,participant) values ('ashwin','CU','Hackathon','3')";
    // let insquery = connection.query(createquery,tablename,(err,rows)=>{
    //     if(err) throw err;
    //     else console.log("insert query executed")
    // });
    let sql = "SELECT * FROM ??";
    let query = connection.query(sql,[tablename],(err,rows,res1)=>{
        if(err) throw err;
        else console.log(rows)
    });
    
});

app.get('/add',(req,res)=>{
    
    res.render('form',{
        title:"adduser"
    })

})

app.get('/display',(req,res)=>{
    let sql = "SELECT * FROM ??";
    let query = connection.query(sql,[tablename],(err,rows,res1)=>{
        if(err) throw err;
        res.render('display',{
            title:"GATEWAYS Details",
            Event_details : rows
        });
});
})


app.post('/save',(req,res)=>{
    let data={
        name:req.body.name,
        college:req.body.college,
        event:req.body.event,
        participant:req.body.participant
    }
    let sql="INSERT INTO Event_details SET ?"
    let query=connection.query(sql,[data],(error,results)=>{
        if(error)throw error;
        else console.log('insert successful')
    })  
    res.redirect('/display')  
})

app.listen(port,()=>{
    console.log('listening on port:',port);
    
})