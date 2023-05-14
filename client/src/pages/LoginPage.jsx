import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <p className="text-4xl text-center mb-4">Login</p>
                <form className="mx-auto max-w-md">
                    <input
                        type="email"
                        name="email"
                        id=""
                        value={email}
                        placeholder="your@email.com"
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <input
                        type="password"
                        name="password"
                        id=""
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <button className="primary">Login</button>
                </form>
                <p className="text-center text-gray-400">
                    Don&apos;t have an account yet?{" "}
                    <Link to="/register" className="underline text-black">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
