import { useState } from "react"

const AddTask = ({onAdd})=>{
    const[text, setText] = useState('')
    const[day, setDay] = useState('')
    const[reminder, setReminder] = useState(false)

    //when submit call onSubmit, and call onAdd
    const onSubmit=(e)=>{
        e.preventDefault()
        if(!text){
            alert('Please add a task')
            return
        }
        onAdd({text, day, reminder})
        // set a default value
        setText('')
        setDay('')
        setReminder(false)
 
    }
    return(
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type='text' placeholder='Add Tasks' value ={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label>Day and Time</label>
                <input type='text' placeholder='Add Day and Time' value ={day} onChange={(e)=>setDay(e.target.value)}/>
            </div>
            <div className="form-control form-control-check" >
                <label>Set Reminder</label>
                <input type='checkbox' 
                       value ={reminder} 
                       onChange={(e)=>setReminder(e.currentTarget.checked)}
                       checked={reminder}
                />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>
        </form>
    )
}


export default AddTask