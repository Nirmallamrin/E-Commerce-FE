import axios from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";

const userSchema = yup.object ({
    userName:yup.string().required(),
    email: yup.string().email(),
    password: yup.string().min(6),
});

export default function UserSignup() {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm({
    resolver : yupResolver(userSchema),
  });

  const onSubmit = async (data) => {

    try {
      const res = await axios.post("https://e-commerce-be-yi97.onrender.com/users/signup",
       data,
      {
        withCredentials: true,
      });
      if(res.data.message === "Signed Successfully!"){
      
       sessionStorage.setItem('userToken', res.data.token);
       console.log(res.data)
       toast.success("Successfully signed in");
       navigate("/")
      }else{
        toast.error("Password is not correct");
      }
    } catch (error) {
      console.error("Error occurred while signing in:", error);
    }       
  };
 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-md border p-6 bg-white shadow-lg">
      <div className="flex justify-end">
          <Link to="/">
          <FiDelete className="text-2xl cursor-pointer font-bold"/> 
          </Link> 
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <input
          {...register("userName")}
          placeholder="Enter your username"
          className="border rounded-md p-2"
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}

        <input
          {...register("email")}
          placeholder="Enter your email"
          className="border rounded-md p-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="border rounded-md p-2"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <input type="submit" className="rounded-md bg-black p-2 text-white cursor-pointer" value="Sign Up" />

        <p className="mt-4">
          User already exists? {" "}
          <Link to="/users/signin" className="ml-2 rounded-md bg-slate-200 py-1 px-2 text-gray-600">
            Signin
          </Link>
        </p>
      </form>
    </div>
  )
}