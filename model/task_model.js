const mongoose= require('mongoose');
const taskSchema = mongoose.Schema(
    {
    task:{
        type:String,
        required:[true,"Please enter the task name"]
    },
    index:{
        type:Number,
        required:[true,"Please enter the number"]
    }
},
{
    timestamps:true
}
);

const Task=mongoose.model("Task",taskSchema);
module.exports=Task;
