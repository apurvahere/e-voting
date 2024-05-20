"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setVoterData } from "../../../redux/slices/voter/voterSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { statesOptions } from "../../../utils/constants";
import { voterRegistrationSchema } from "../../../utils/validations-schema";

const initialValues = {
  name: "",
  identityNumber: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  image: null,
  location: "",
};

const Thumb = ({ file }) => {
  const [loading, setLoading] = React.useState(false);
  const [thumb, setThumb] = React.useState(undefined);

  React.useEffect(() => {
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setThumb(reader.result);
    };

    reader.readAsDataURL(file);
  }, [file]);

  if (!file) return null;

  if (loading) return <p>loading...</p>;

  return (
    <Image
      src={thumb}
      alt={file.name}
      className="mt-2"
      height={50}
      width={50}
    />
  );
};

const VoterRegistration = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { allVotersData } = useSelector((state) => ({
    allVotersData: state.voter.allVotersData,
  }));
  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    const imageDataBlob = await toBase64(values.image);
    const updatedValues = {
      ...values,
      image: imageDataBlob,
    };

    const isUserAlreadyRegistered = allVotersData.some((user) => {
      return user.identityNumber === values?.identityNumber;
    });

    if (isUserAlreadyRegistered) {
      toast.error("User already registered");
    } else {
      dispatch(setVoterData(updatedValues));
      resetForm();
      // setFieldValue("image", null);
      router.push("/voter/login");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-screen">
      <div className="flex flex-col justify-center items-center gap-5 p-10 bg-slate-200 border border-[#D9D9D9] w-max rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold">Voter Registration</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={voterRegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="flex flex-col justify-center items-start">
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.name && touched.name && "border-red-500"
                      )}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Please enter name"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="name"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
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
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
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
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
                  <div className="flex flex-col justify-between items-start relative">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.confirmPassword &&
                          touched.confirmPassword &&
                          "border-red-500"
                      )}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Please confirm password"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="confirmPassword"
                      component="div"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.dateOfBirth &&
                          touched.dateOfBirth &&
                          "border-red-500"
                      )}
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="Please enter date of birth"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="dateOfBirth"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
                  <div className="flex flex-col justify-between items-start w-max">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className={`${
                        touched.image && errors.image
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.image && (
                      <div className="text-red-500 text-sm font-normal">
                        {errors.image}
                      </div>
                    )}
                    <Thumb file={values.image} />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-center items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      as="select"
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.location && touched.location && "border-red-500"
                      )}
                      id="location"
                      name="location"
                    >
                      <option value="">Select location</option>
                      {statesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="location"
                      component="div"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-slate-400"
                    disabled={
                      Object.keys(errors).length > 0 ||
                      Object.keys(touched).length === 0
                    }
                  >
                    Register
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Link href="/voter/login">
          Already e-voter? <span className="text-blue-500">Log in</span>
        </Link>
      </div>
    </div>
  );
};
export default VoterRegistration;
