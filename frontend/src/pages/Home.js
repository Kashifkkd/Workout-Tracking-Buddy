import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {

    const { workouts, dispatch } = useWorkoutContext()
    const [count,setCount] = useState(0)
    const [isPending, setIsPending] =useState(true)
    let i = 1;

    const countWorkouts = (workouts) => {
        if(workouts)
            setCount(workouts.length)
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            
            if(response.ok){
                dispatch({type:'SET_WORKOUTS', payload: json })
                setIsPending(false)
            }
        }   
        console.log('called')
        fetchWorkouts()
    }, [dispatch])

    useEffect(() => {
        countWorkouts(workouts)

        return () => {
            countWorkouts(workouts)
        }
    },[workouts])

    return ( 
        <div className="home">
            <div className="workouts">
                {isPending && <div>Loading...</div> }
                {!isPending && count===0 && <h2>No Workouts to Dispaly. Add Workout !</h2>}
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails i={i++} key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
     );
}
 
export default Home;