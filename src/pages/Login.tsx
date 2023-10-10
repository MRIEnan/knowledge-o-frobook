import { toast } from "@/components/ui/use-toast";
import {
  useGetProfileMutation,
  useLoginUserMutation,
} from "@/redux/features/user/userApi";
import {
  IApiResponse,
  IUser,
  IErrorResponse,
  ILoginResponse,
} from "@/types/Book/globalBookType";
import { setUserInfo } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setCookie } from "@/utils/getCookie";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [getProfile] = useGetProfileMutation();

  const handleSetUserData = (data: IUser) => {
    dispatch(setUserInfo(data));
  };

  const handleSuccess = (data: IApiResponse<ILoginResponse>) => {
    if (!data || !data.data) {
      return;
    }
    const myAuth = data.data.accessToken;
    if (myAuth) {
      setCookie("accessToken", myAuth, 5);
      const options = { authorization: myAuth };

      getProfile(options)
        .then((data) => {
          const dataType = Object.keys(data)[0];
          if (dataType === "error") {
            handleError(Object.entries(data)[0][1]["data"]);
          } else {
            handleSetUserData(Object.entries(data)[0][1]["data"]);
            toast({
              duration: 3000,
              description: Object.entries(data)[0][1]["message"],
              title: "Login Info",
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    }
    // dispatch(setUserInfo(data.data!));
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
        duration: 2000,
        description: "Please wait. login user",
        title: "Please wait",
      });
    }
  }, [isLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // todo: Add your login logic here
    const myObj = {
      email: email,
      password: password,
    };
    const options = {
      data: myObj,
    };

    loginUser(options).then((data) => {
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
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
            <button
              type="submit"
              className="w-full py-2 bg-navy-blue-500 text-white rounded-md hover:bg-navy-blue-600 focus:outline-none focus:bg-navy-blue-600 bg-blue-900 hover:bg-blue-700 text-center shadow:2xl transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center text-blue-600">
          Doesn't have an account{"? "}
          <Link className="font-bold text-orange-700" to="/signup">
            Sign here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
