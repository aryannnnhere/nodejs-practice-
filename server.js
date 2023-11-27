const cluster = require('node:cluster');
const express = require('express');
const os = require('os');
const totalCpus = os.cpus().length;
const PORT = 8000;

// console.log(totalCpus);

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < totalCpus; i++) {
      cluster.fork(); 
}
}else{
    const app = express(); 
    app.get('/cluster' , (req,res)=>{
        console.log(`worker ${process.pid} is running`);
  
        return res.json({
            message :   `Hello from express server ${process.pid}`
        });
    })

    app.listen(PORT , ()=>{console.log(`server is running on port ${PORT}`)});



}