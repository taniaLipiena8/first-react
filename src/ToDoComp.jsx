import React, { useState } from "react"
import './ToDoComp.css';

const AppComponent = ()=> {

    const [activity, setActivity] = useState('');
    const [activityList, setActivityList] = useState([]);

    function handleSubmit(e){
        e.preventDefault();
        if(activity.trim().length === 0){
            alert("activity name is empty!")
        } else{
            setActivityList(list=>[...list, 
                {activityName: activity,
                isDone: false}])
            setActivity("")
        }
        
        
    }

    const removeActivity =(selected) =>{
        setActivityList((updatedList)=>{
            return updatedList.filter((item)=>item!==selected)
        })
    }

    const completeActivity = (selected)=>{
        const updatedList = activityList.map((activity)=>{
            if(activity===selected){
                const updatedActivity={
                    ...activity, isDone:!activity.isDone
                }
                return updatedActivity
            }
            return activity
        })
        setActivityList(updatedList)
    }
    
    return (
        <>
        <div className="App" id="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Your Activity" name="activity" value={activity} onChange={e => setActivity(e.target.value)}/>
                    <button className="submitButton" type="submit">Submit</button>
                    </div>
            </form>
            {activityList.length>0? 
                <div className="activityList" >
                    <ViewList 
                        activityList={activityList}
                        onRemove={removeActivity}
                        onDone = {completeActivity}
                    />
                </div> : 
                <div>
                    <h2>The list is empty</h2>
                </div>
            }
        </div>
        </>
    )
}

const ViewList = ({activityList, onDone, onRemove}) => (
    <ul>
        {activityList.map((item)=> (
            <li key={item.activityName} style={{backgroundColor: item.isDone? 'lightgray':'antiquewhite'}}>
                <span className="indexNo" style={{textDecoration: item.isDone? 'line-through' : 'none'}}>{activityList.indexOf(item) +1}</span>
                <span className="activityName" style={{textDecoration: item.isDone? 'line-through' : 'none'}}>{item.activityName}</span>
                <span className="act">
                    <button className="donebutton" onClick={()=>onDone(item)}>{item.isDone? 'Undo' : 'Done'}</button>
                    <button className="deletebutton" onClick={()=> onRemove(item)}>Delete</button>
                </span>
            </li>
        ) )}
    </ul>
)

export default AppComponent

