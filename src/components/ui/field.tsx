type FieldProps = Readonly<{
  label: string;
  name: string;
  placeholder: string;
  type?: "email" | "tel" | "text";
}>;

export function Field({ label, name, placeholder, type = "text" }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-800">
      <span>{label}</span>
      <input
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm transition placeholder:text-slate-500 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}
