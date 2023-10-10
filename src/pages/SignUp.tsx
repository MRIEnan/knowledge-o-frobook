import { toast } from "@/components/ui/use-toast";
import { useCreateUserMutation } from "@/redux/features/user/userApi";
import { setUserInfo } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  IApiResponse,
  IErrorResponse,
  IUser,
} from "@/types/Book/globalBookType";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleSuccess = (data: IApiResponse<IUser>) => {
    toast({
      duration: 3000,
      description: data.message,
      title: "User Created",
    });
    dispatch(setUserInfo(data.data!));
  };
  const handleError = (error: IErrorResponse) => {
    toast({
      duration: 3000,
      description: error.message,
      title: "Sign Up Failed",
    });
  };

  useEffect(() => {
    if (isLoading) {
      toast({
        duration: 5000,
        description: "Please wait. Creating the user",
        title: "Please wait",
      });
    }
  }, [isLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        duration: 3000,
        description: "password doesn't match",
        title: "Invalid password",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        duration: 3000,
        description: "password can't be less than 6 characters",
        title: "Invalid password",
      });
      return;
    }
    // todo: Add your signup logic here
    const myObj = {
      email: email,
      userName: name,
      password: password,
    };
    const options = {
      data: myObj,
    };

    createUser(options).then((data) => {
      const dataType = Object.keys(data)[0];
      if (dataType === "error") {
        handleError(Object.entries(data)[0][1]["data"]);
      } else {
        handleSuccess(Object.entries(data)[0][1]);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-navy-blue-900 via-navy-blue-800 to-navy-blue-900 select-none">
      <div className="bg-opacity-75 bg-white rounded-lg p-8 backdrop-blur-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-navy-blue-900">
          Sign in
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-navy-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-navy-blue-500 text-white rounded-md hover:bg-navy-blue-600 focus:outline-none focus:bg-navy-blue-600 bg-blue-900 text-center shadow:2xl  hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center text-blue-600">
          have an account{"? "}
          <Link className="font-bold text-orange-700" to="/login">
            login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
