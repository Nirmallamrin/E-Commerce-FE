import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiDelete } from "react-icons/fi";

const schema = yup.object({
  email: yup.string().email(),
  password: yup.string().min(6),
});

export default function AdminSignin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://e-commerce-be-yi97.onrender.com/admin/signin",
        data,
      ); 
      console.log("Response data:", res.data);
      console.log("token", res.data.token)
      if(res.data.message === "Admin Logged in!") {      
        sessionStorage.setItem('adminToken', res.data.token); 
        console.log("token",res.data.token)       
        toast.success("Successfully Admin Logged in!");
        navigate("/admin");
    }else {
      toast.error("Password is not correct");
    }
   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-md border p-6 bg-white shadow-lg"
      >
        {/* <div className="flex justify-end">
          <Link to="/admin">
            <FiDelete className="text-2xl cursor-pointer font-bold" />
          </Link>
        </div> */}

        <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>
        <input
          {...register("email")}
          placeholder="Enter your email"
          className="border rounded-md p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Enter your password"
          className="border rounded-md p-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          type="submit"
          className="rounded-md bg-black p-2 text-white cursor-pointer"
          value="Sign in"
        />

        {/* <p className="mt-4">
          Create New
          <Link
            to="/admin/signup"
            className="ml-2 rounded-md bg-slate-200 py-1 px-2 text-gray-600"
          >
            Signup
          </Link>
        </p> */}
      </form>
    </div>
  );
}
