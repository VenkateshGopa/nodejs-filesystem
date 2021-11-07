const express = require('express');
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000

app.get('/',async (req, res)=>{
    const today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var dateTime = (date+'_'+time ).toString();
    let  filename = dateTime + '.txt'
    try{
        fs.writeFileSync(`./myfiles/${filename}`,dateTime)
        res.status(201).send(dateTime)
    }
    catch(e){
        res.status(400).send(e)
    }
})
app.get('/files',async (req, res)=>{
    try{
        const data = fs.readdirSync('./myfiles').map(file => file)
        res.status(201).send(data)
    }
    catch(e){
        res.status(400).send(e)
    }
})
app.get('/:datetime',async (req, res)=>{
    try{
        const buffer = fs.readFileSync(`./myfiles/${req.params.datetime}.txt`)
        res.status(201).send(buffer.toString())
    }
    catch(e){
        res.status(400).send(e)
    }
})

app.listen(port , ()=>{
    console.log('server is up on ' + port);
})