
import { ChangeEvent } from "react"
import { Link , useNavigate} from "react-router-dom"
import { useState } from "react"
import { SignupInput } from "@jkawa/common"
import axios from "axios"
import { BACKEND_URL } from "../config"



export const Auth=({type}:{type:"signin" | "signup"})=>{

    const [postInputs,setpostInputs] = useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
    const navigate = useNavigate()

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user${type === "signin" ? "/signin" : "/signup"}`,postInputs)
            const jwt = response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }
        catch(e)
        {
            alert("Request not send.")
        }
    }

    return <div className=" h-screen flex justify-center flex-col">
        <div>
            <div className="flex justify-center">
                <div >
                <div className=" text-5xl font-extrabold px-60">
                    {type === "signup" ? "Create an account" : "Login your Account"}
                </div>
                <div className=" text-slate-500 pt-5 px-30 pl-60 ml-20">
                    {type === "signin" ? "Don't have a account ?" : "Already have an account ?"}
                    <Link  className="underline" to={type==="signin" ? "/signup" : "/signin"} > 
                     {type === "signin" ? "  Sign up" : "  Login"}
                    </Link>
                </div>
                <div>
                    { type === "signup" ? <LabelInput label="Name" placeholder="e.g. Jay Kawa " onChange={(e)=>{
                        setpostInputs(c=>({
                            ...c,
                            name:e.target.value
                        }))
                    }}></LabelInput> : null }
                </div>
                <div>
                    <LabelInput label="Username" placeholder="e.g. jkawa@gmail.com" onChange={(e)=>{
                        setpostInputs(c=>({
                            ...c,
                            username:e.target.value
                        }))
                    }}></LabelInput>
                </div>
                <div>
                     <LabelInput label="Password" type={"password"} placeholder="your password" onChange={(e)=>{
                        setpostInputs(c=>({
                            ...c,
                            password:e.target.value
                        }))
                    }}></LabelInput> 
                </div>
                <div className="pl-60 pt-12 ml-10">
                <button type="button" onClick={sendRequest} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none flex justify-center focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 w-80 " >
                {type === "signup" ? "Sign up " : " Sign in"}
                </button>
                </div>
                </div>
                
            </div>
        </div>

    </div>
}

interface LabelInputType{
    label : string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) =>void,
    type?:string 
}

function LabelInput({label,placeholder,onChange,type} : LabelInputType)
{
    return <div>
        <div className="px-60 pt-8 ml-10">
            <label  className="block mb-2 text-sm font-medium text-gray-800 dark:text-grey-700">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:slate-blue-500 focus:border-slate-500 block w-80 p-2.5 dark:bg-slate-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>

    </div>
}