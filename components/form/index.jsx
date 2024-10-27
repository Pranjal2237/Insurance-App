"use client";

import React, { useRef } from "react";
import { useFormik } from "formik";
import { FormSchema } from "./schema";
import emailjs from "@emailjs/browser";

const initialValues = {
  firstName: "",
  email: "",
  lastName: "",
  message: "",
  subject: "",
};

const Form = () => {
  const form=useRef();

  let { values, handleBlur, handleChange, handleSubmit, touched, errors,resetForm } =
    useFormik({
      initialValues,
      validationSchema: FormSchema,
      onSubmit: (values, { resetForm }) => {
        emailjs
            .sendForm('service_rg6gc1f','template_g5blu5j',form.current,{
              publicKey:'FdugQZ34OI5H-4ony'
            })
            .then(
              () => {
                resetForm();
              },
              (error) => {
                console.log("FAILED...", error.text);
              }
            );
      },
    });


  return (
    <div className="bg-white p-4 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.16)] rounded-2xl lg:p-14">
        <h1 className="text-2xl font-bold mb-4">Send A Message</h1>
        <form id="enquiry" className="enquiryForm" onSubmit={handleSubmit} ref={form}>
      <div className="inputBlock">
        <label htmlFor="name">
          First Name <span>*</span>
        </label>
        <input
          type="text"
          autoComplete="off"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.firstName && touched.firstName ? <p>{errors.firstName}</p> : null}
      </div>
      <div className="inputBlock">
        <label htmlFor="name">
          Last Name <span>*</span>
        </label>
        <input
          type="text"
          autoComplete="off"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastName && touched.lastName ? <p>{errors.lastName}</p> : null}
      </div>
      <div className="inputBlock">
        <label htmlFor="email">
          Email <span>*</span>
        </label>
        <input
          type="text"
          autoComplete="off"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? <p>{errors.email}</p> : null}
      </div>
      <div className="inputBlock">
        <label htmlFor="name">
          Subject <span>*</span>
        </label>
        <input
          type="text"
          autoComplete="off"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.subject && touched.subject ? <p>{errors.subject}</p> : null}
      </div>
      <div className="inputBlock">
        <label htmlFor="name">
          Message <span>*</span>
        </label>
        <textarea
          autoComplete="off"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
        {/* <button onClick={resetForm} type="button" className="btn">RESET</button> */}
        <button type="submit" className="btn bg-[--btn-color] text-white rounded-lg">SUBMIT</button>
    </form>
    </div>
  );
};

export default Form;
