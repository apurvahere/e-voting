"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { statesOptions } from "../../../utils/constants";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setPoliticianData } from "../../../redux/slices/politician/politicianSlice";
import { politicianRegistrationSchema } from "../../../utils/validations-schema";

const initialValues = {
  name: "",
  partyName: "",
  politicianImage: "",
  username: "",
  password: "",
  confirmPassword: "",
  partySignImage: "",
  standoutArea: "",
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

const PoliticianRegistration = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const toBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    const politicianImageToDataBlob = await toBase64(values.politicianImage);
    const partySignImageToDataBlob = await toBase64(values.partySignImage);
    const updatedValues = {
      ...values,
      politicianImage: politicianImageToDataBlob,
      partySignImage: partySignImageToDataBlob,
    };
    dispatch(setPoliticianData(updatedValues));
    resetForm();
    router.push("/politician/login");
  };

  return (
    <div className="flex justify-center items-center bg-white h-screen">
      <div className="flex flex-col justify-center items-center gap-5 p-10 bg-slate-200 border border-[#D9D9D9] w-max rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold">Politician Registration</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={politicianRegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="flex flex-col justify-center items-start">
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.name && touched.name && "border-red-500"
                      )}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="name"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.partyName &&
                          touched.partyName &&
                          "border-red-500"
                      )}
                      type="text"
                      id="partyName"
                      name="partyName"
                      placeholder="Party Name"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="partyName"
                      component="div"
                    />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start w-max">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Politician Image <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="politicianImage"
                      name="politicianImage"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        setFieldValue(
                          "politicianImage",
                          event.currentTarget.files[0]
                        );
                      }}
                      className={`${
                        touched.politicianImage && errors.politicianImage
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.politicianImage && (
                      <div className="text-red-500 text-sm font-normal">
                        {errors.politicianImage}
                      </div>
                    )}
                    <Thumb file={values.politicianImage} />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.username && touched.username && "border-red-500"
                      )}
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="username"
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
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start w-max">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Party Sign Image <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="partySignImage"
                      name="partySignImage"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        setFieldValue(
                          "partySignImage",
                          event.currentTarget.files[0]
                        );
                      }}
                      className={`${
                        touched.partySignImage && errors.partySignImage
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.partySignImage && (
                      <div className="text-red-500 text-sm font-normal">
                        {errors.partySignImage}
                      </div>
                    )}
                    <Thumb file={values.partySignImage} />
                  </div>
                </div>
                <div className="mb-4 flex gap-2.5 justify-between items-center w-full">
                  <div className="flex flex-col justify-between items-start">
                    <Field
                      as="select"
                      className={classNames(
                        "border rounded-md min-w-72 px-2 py-1",
                        errors.standoutArea &&
                          touched.standoutArea &&
                          "border-red-500"
                      )}
                      id="standoutArea"
                      name="standoutArea"
                    >
                      <option value="">Select standout area</option>
                      {statesOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className="text-red-500 text-sm font-normal"
                      name="standoutArea"
                      component="div"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-slate-400"
                    disabled={
                      Object.keys(errors).length ||
                      !touched.name ||
                      !touched.partyName ||
                      !touched.username ||
                      !touched.password ||
                      !touched.standoutArea
                    }
                  >
                    Register
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Link href="/politician/register">
          Already politician? <span className="text-blue-500">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default PoliticianRegistration;
