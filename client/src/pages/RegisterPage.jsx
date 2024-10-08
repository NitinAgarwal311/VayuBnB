import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name,setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitRegistration = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/users/register", {
                name,
                email,
                password
            });
            alert("Registration successful. Now you can log in.")
        }
        catch (e) {
            alert("Registration Failed. Please try again")
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <p className="text-4xl text-center mb-4">Register</p>
                <form className="mx-auto max-w-md" onSubmit={submitRegistration}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    <button className="primary">Register</button>
                </form>
                <p className="text-center text-gray-400">
                    Already a member?{" "}
                    <Link to="/login" className="underline text-black">
                        Login Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
