import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <p className="text-4xl text-center mb-4">Register</p>
                <form className="mx-auto max-w-md">
                    <input
                        type="text"
                        name="name"
                        id=""
                        placeholder="John Doe"
                    />
                    <input
                        type="email"
                        name="email"
                        id=""
                        placeholder="your@email.com"
                    />
                    <input
                        type="password"
                        name="password"
                        id=""
                        placeholder="Password"
                    />
                    <button className="primary">Login</button>
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
