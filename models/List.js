import mongoose from "mongoose";

const ListSchema=new mongoose.Schema({
    domain:{
        type:String,
        required:true,
        unique:true
    },
    sheet_id:{
        type:String,
        required:true
    }
},{timestamps:true})

const List=mongoose.models.List || mongoose.model("List",ListSchema)

export default List;