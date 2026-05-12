"use client";

import { useState, type FormEvent } from "react";

type AppointmentFormValues = Readonly<{
  name: string;
  email: string;
  phone: string;
  message: string;
}>;

type AppointmentFormErrors = Partial<Record<keyof AppointmentFormValues, string>>;

const initialValues: AppointmentFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function AppointmentRequestForm() {
  const [values, setValues] = useState<AppointmentFormValues>(initialValues);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateAppointmentRequest(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormStatus("error");
      return;
    }

    setFormStatus("success");
    setValues(initialValues);
  }

  function updateField(name: keyof AppointmentFormValues, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: undefined,
      }));
    }
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
      <TextField
        error={errors.name}
        label="Full name"
        name="name"
        onChange={updateField}
        placeholder="Your name"
        value={values.name}
      />
      <TextField
        error={errors.email}
        label="Email"
        name="email"
        onChange={updateField}
        placeholder="you@example.com"
        type="email"
        value={values.email}
      />
      <TextField
        error={errors.phone}
        label="Phone"
        name="phone"
        onChange={updateField}
        placeholder="(555) 000-0000"
        type="tel"
        value={values.phone}
      />
      <label className="grid gap-2 text-sm font-medium text-slate-800">
        <span>How can we help?</span>
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className="min-h-32 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm transition placeholder:text-slate-500 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Share a short note"
          value={values.message}
        />
        {errors.message ? (
          <span className="text-sm font-medium text-red-700" id="message-error">
            {errors.message}
          </span>
        ) : null}
      </label>

      {formStatus === "success" ? (
        <p
          className="rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900"
          role="status"
        >
          Your request is ready in this demo flow. No information was stored or
          sent.
        </p>
      ) : null}

      {formStatus === "error" ? (
        <p
          className="rounded-md bg-red-50 p-3 text-sm leading-6 text-red-800"
          role="alert"
        >
          Please review the highlighted fields before sending the request.
        </p>
      ) : null}

      <button
        className="min-h-11 rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-teal-700"
        type="submit"
      >
        Send Request
      </button>
    </form>
  );
}

type TextFieldProps = Readonly<{
  error?: string;
  label: string;
  name: keyof AppointmentFormValues;
  onChange: (name: keyof AppointmentFormValues, value: string) => void;
  placeholder: string;
  type?: "email" | "tel" | "text";
  value: string;
}>;

function TextField({
  error,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: TextFieldProps) {
  const errorId = `${name}-error`;

  return (
    <label className="grid gap-2 text-sm font-medium text-slate-800">
      <span>{label}</span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm transition placeholder:text-slate-500 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <span className="text-sm font-medium text-red-700" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

function validateAppointmentRequest(values: AppointmentFormValues) {
  const errors: AppointmentFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a complete phone number or leave this blank.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Share a short note with at least 10 characters.";
  }

  return errors;
}
