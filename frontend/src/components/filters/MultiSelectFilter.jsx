import Select from "react-select";
import { selectStyles } from "./selectStyles";

export default function MultiSelectFilter({ label, options, value, onChange, placeholder }) {
  const selectOptions = options.map((opt) => ({ value: opt, label: String(opt) }));
  const selectValue = selectOptions.filter((opt) => value.includes(opt.value));

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <Select
        styles={selectStyles}
        isMulti
        options={selectOptions}
        value={selectValue}
        onChange={(selected) => onChange((selected || []).map((opt) => opt.value))}
        placeholder={placeholder || "All"}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        noOptionsMessage={() => "No options"}
      />
    </div>
  );
}
