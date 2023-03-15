export const renderDropdownLabel = ({ list, selectedValue }) => {
  const dropdown = list?.find((dropdown) => dropdown.value === selectedValue);
  return dropdown?.label;
};
