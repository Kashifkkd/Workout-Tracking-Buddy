import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { signup,error,isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email,password)
        await signup(email,password)
    }
    
    return ( 
        <form onSubmit={handleSubmit} className="signup">
            <h3>Signup</h3>

            <label htmlFor="Email">Email</label>
            <input type="email" onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <label htmlFor="Password">Password</label>
            <input type="password" onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            <button disabled={isLoading}>Signup</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
}
 
export default Signup;