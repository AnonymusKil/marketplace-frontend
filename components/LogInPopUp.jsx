'use client'

import { useState } from 'react'
import Image from "next/image";

import { assets } from '../assets/assets'

function LogInPopUp({ setShowLogin }) {
    const [currentState, setCurrentState] = useState("sign up")

    return (
        <div className="fixed inset-0 z-50 grid bg-black/60">
            
            <form className="place-self-center w-[min(90vw,330px)] bg-white text-gray-500 flex flex-col gap-6 p-6 rounded-lg text-sm animate-fadeIn">

                {/* Title */}
                <div className="flex justify-between items-center text-black">
                    <h2 className="text-lg font-semibold capitalize">
                        {currentState}
                    </h2>

                    <Image
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt="close"
                        className="w-4 cursor-pointer"
                    />
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-5">
                    {currentState === "Login" ? null : (
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            className="border border-gray-300 p-2 rounded outline-none"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Your email"
                        required
                        className="border border-gray-300 p-2 rounded outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password Required"
                        required
                        className="border border-gray-300 p-2 rounded outline-none"
                    />
                </div>

                {/* Button */}
                <button className="bg-orange-500 text-white p-2 rounded cursor-pointer text-[15px] hover:bg-orange-600 transition">
                    {currentState === "sign up" ? "create account" : "Login"}
                </button>

                {/* Terms */}
                <div className="flex items-start gap-2 -mt-2 text-xs">
                    <input type="checkbox" className="mt-1" required />
                    <p>
                        By continuing I agree to the terms of use & privacy policy
                    </p>
                </div>

                {/* Toggle */}
                {currentState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span
                            onClick={() => setCurrentState("sign up")}
                            className="text-orange-500 font-medium cursor-pointer"
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span
                            onClick={() => setCurrentState("Login")}
                            className="text-orange-500 font-medium cursor-pointer"
                        >
                            Login here
                        </span>
                    </p>
                )}

            </form>
        </div>
    )
}

export default LogInPopUp