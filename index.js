const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

const data =[
    {
        id:1,
        titulo:"la mano",
        categoria:"terror",
    },
    {
        id:2,
        titulo:"mi familia",
        categoria:"drama",
    },
    {
        id:3,
        titulo:"Resta y suma",
        categoria:"educativo",
    },
    {
        id:4,
        titulo:"pizza y pasto",
        categoria:"terror",
    }
]

app.get("/",(req,res)=>{
    res.send("Hola mundo")
})
app.get("/data/all",(req,res)=>{
    res.status(200).json(data)
})
app.get("/data",(req,res)=>{
    const query_titulo=req.query.titulo
    const query_categoria=req.query.categoria
    if(query_titulo&&query_categoria){
        const filtro= data.filter(item=>item.titulo==query_titulo&&item.categoria==query_categoria)
        if(filtro.length>0){
            res.status(200).json(filtro)
        }else{
            res.status(404).json({message:"No se encontró"})
        }
    }else{
        res.status(302).redirect("/data/all")
    }
})
app.get("/data/:id",(req,res)=>{
    const id_user=req.params.id
    const encontrado = data.find(item=>item.id==id_user)
    if(encontrado){
        res.status(200).json(encontrado)
    }
    else{
        res.status(404).json({message:"No se encontró"})
    }
})

app.post("/data",(req,res)=>{
    const user_body=req.body
    data.push(user_body)
    res.status(201).json(data)
})

app.put("/data/:id",(req,res)=>{
    const user_body= req.body
    const param=req.params.id
    const encontrado=data.findIndex(item=>item.id==param)
    if(encontrado!=-1){
        data[encontrado]=user_body
        res.status(201).json(data)
    }else{
        res.status(404).json({message:"No se encontró"})
    }
})

app.listen(port,()=>{
    console.log("Servicio escuchando el puerto: ",port)
})