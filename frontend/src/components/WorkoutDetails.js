import { useWorkoutContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow  from "date-fns/formatDistanceToNow"
import UpdateWorkout from "../components/UpdateWorkout";


const WorkoutDetails = ({ workout, i }) => {

    const { dispatch } = useWorkoutContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if(response.ok){
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return ( 
        <div className="workout-details">
            <h4>{i}){" "}{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined delete-icon" onClick={handleClick}>delete</span>
            <UpdateWorkout workout={workout} />
        </div>
    );
}
 
export default WorkoutDetails;