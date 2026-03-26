/* 
 create a server
*/


const express = require("express")
const noteModel = require("./models/notes.model")
const cors = require("cors")
const path = require("path")


const app = express()
// midleware 
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

console.log(__dirname);


app.post("/api/create",async(req,res) =>{
    const {title,description , age} = req.body

    const note = await noteModel.create( {
            title,description,age
        }
    )

    res.status(200).json({
        message : "All data get successfully",
        note
    })
})

app.get("/api/notes", async(req,res) =>{
    const note = await noteModel.find()
    res.status(200).json({
        message:"notes fetched successfully.",
        note
    })

})
app.delete("/api/notes/:id", async (req,res) =>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: " deleted successfully"
    })
})
app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"Updated successfully.."
    })
})

app.use('*name',(req,res)=>{
       res.sendFile(path.join(__dirname,"/public/index.html"))
})

module.exports = app