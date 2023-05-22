import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../store/UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    useEffect(() => {
        if(redirect) {
            navigate('/account');
        }
    }, [redirect, navigate]);

    const loginHandler = async (ev) => {
        ev.preventDefault();

        try {
            const {data} = await axios.post("/login", {
                email,
                password,
            });

            setUser(data);
            
            alert("Login Successful");
            setRedirect(true);
        }
        catch(e) {
            alert("Login Failed");
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <p className="text-4xl text-center mb-4">Login</p>
                <form className="mx-auto max-w-md" onSubmit={loginHandler}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="your@email.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
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
