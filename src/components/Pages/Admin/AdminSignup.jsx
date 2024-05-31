import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const adminSchema = yup.object({
  userName: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().min(6),
});

export default function AdminSignup() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/v1/admin/signup", data);
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
        <input
          {...register("userName")}
          placeholder="Enter your username"
          className="border rounded-md p-2"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName.message}</p>
        )}

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
          value="Sign Up"
        />


        <p className="mt-4">
          User already exists?
          <Link
            to="/admin/signin"
            className="ml-2 rounded-md bg-slate-200 py-1 px-2 text-gray-600"
          >
            Signin
          </Link>
        </p>
      </form>
    </div>
  );
}
