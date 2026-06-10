export const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#181d30",
    borderColor: state.isFocused ? "#8b5cf6" : "#262c45",
    borderRadius: "0.5rem",
    minHeight: "38px",
    boxShadow: state.isFocused ? "0 0 0 1px #8b5cf6" : "none",
    "&:hover": { borderColor: "#8b5cf6" },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#111524",
    border: "1px solid #262c45",
    zIndex: 50,
  }),
  menuList: (base) => ({ ...base, maxHeight: "220px" }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.85rem",
    backgroundColor: state.isSelected
      ? "#8b5cf6"
      : state.isFocused
      ? "#232a44"
      : "transparent",
    color: state.isSelected ? "#ffffff" : "#e2e8f0",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#232a44",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({ ...base, color: "#e2e8f0", fontSize: "0.75rem" }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#94a3b8",
    "&:hover": { backgroundColor: "#f472b6", color: "#ffffff" },
  }),
  placeholder: (base) => ({ ...base, color: "#64748b", fontSize: "0.85rem" }),
  input: (base) => ({ ...base, color: "#e2e8f0", fontSize: "0.85rem" }),
  singleValue: (base) => ({ ...base, color: "#e2e8f0" }),
  indicatorSeparator: (base) => ({ ...base, backgroundColor: "#262c45" }),
  dropdownIndicator: (base) => ({ ...base, color: "#64748b", "&:hover": { color: "#94a3b8" } }),
  clearIndicator: (base) => ({ ...base, color: "#64748b", "&:hover": { color: "#f472b6" } }),
};
