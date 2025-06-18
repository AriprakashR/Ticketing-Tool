import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "@mui/material";

const OpenPickerIconButton = () => {
  const theme = useTheme();
  return (
    <Icon
      icon="solar:calendar-mark-bold-duotone"
      fontSize={22}
      color={theme.palette.mode === "dark" ? "#919EAB" : "#637381"}
    />
  );
};

const DatePicker = ({ label, value, onChange, slotProps, readOnly = false, disabled = false, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <MUIDatePicker
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
        slots={{ openPickerIcon: OpenPickerIconButton }}
        slotProps={slotProps}
      />
    </LocalizationProvider>
  );
};
export default DatePicker;
