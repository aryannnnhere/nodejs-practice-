const express = require('express');
const app = express(); 
const PORT = 8000;



app.get('/cluster' , (req,res)=>{
    console.log(`worker ${process.pid} is running`);

    return res.json({
        message :   `Hello from express server ${process.pid}`
})
});

app.listen(PORT , ()=>{console.log(`server is running on port ${PORT}`)});
