import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from '../hooks/useAuthContext'

const UpdateWorkout = ({ workout }) => {

    const {dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    const [updatedTitle,setUpdatedTitle] = useState(workout.title)
    const [updatedLoad,setUpdatedLoad] = useState(workout.load)
    const [updatedReps,setUpdatedReps] = useState(workout.reps)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)

    const sendUpdatedWorkoutData = async (e) => {
        e.preventDefault()
        const updatedWorkoutData = { _id: workout._id, title: updatedTitle, load: updatedLoad, reps: updatedReps }

        if(!user){
            return 
        }

        const response = await fetch('/api/workouts/' + workout._id,{
            method: 'PATCH',
            body: JSON.stringify(updatedWorkoutData),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(json)

        if(response.ok){
            dispatch({ type: 'UPDATE_WORKOUT', payload: updatedWorkoutData })
            setIsPendingUpdate(false)
        }
    }

    return ( 
        <div>
            <span className="material-symbols-outlined edit-icon" onClick={() => setIsPendingUpdate(true)}>edit</span>
            {isPendingUpdate && <div className="edit-container">
                    <form className='update-form' onSubmit={sendUpdatedWorkoutData}>
                        <input type="text" onChange={e => setUpdatedTitle(e.target.value)} defaultValue={workout.title} required/>
                        <input type="number" onChange={e => setUpdatedLoad(e.target.value)} defaultValue={workout.load} required/>
                        <input type="number" onChange={e => setUpdatedReps(e.target.value)} defaultValue={workout.reps} required/>
                        <button className='update-button'>Update</button>
                    </form>
                </div>}
        </div>
    );
}
 
export default UpdateWorkout;