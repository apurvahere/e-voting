"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import classNames from "classnames";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setVoterData,
  setCurrentVoterData,
  setVoterAuthenticated,
} from "../../../redux/slices/voter/voterSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { voterLoginSchema } from "../../../utils/validations-schema";

const initialValues = {
  identityNumber: "",
  password: "",
};

const VoterLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { allVotersData } = useSelector((state) => ({
    allVotersData: state.voter.allVotersData,
  }));

  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (values) => {
    const isUser = allVotersData.find((user) => {
      return (
        user.identityNumber === values.identityNumber &&
        user.password === values.password
      );
    });

    if (isUser) {
      dispatch(setVoterAuthenticated(true));
      dispatch(setCurrentVoterData(isUser));
      router.push("/voter");
    } else {
      toast.error("Wrong identity number or password");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-screen">
      <div className="flex flex-col justify-center items-center gap-5 p-10 bg-slate-200 border border-[#D9D9D9] w-max rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-5">Voter Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={voterLoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col justify-center items-start">
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.identityNumber &&
                          touched.identityNumber &&
                          "border-red-500"
                      )}
                      type="text"
                      id="identityNumber"
                      name="identityNumber"
                      placeholder="Please enter identity number"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="identityNumber"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start relative">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.password && touched.password && "border-red-500"
                      )}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Please enter password"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="password"
                      component="div"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2"
                      onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible /> // Show hide icon when password is visible
                      ) : (
                        <AiFillEye /> // Show eye icon when password is hidden
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-slate-400"
                    disabled={
                      Object.keys(errors).length ||
                      !touched.identityNumber ||
                      !touched.password
                    }
                  >
                    Login
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Link href="/voter/register">
          New voter? <span className="text-blue-500">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default VoterLogin;
