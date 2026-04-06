import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';



import { CalendarMonthOutlined, Close } from '@mui/icons-material';
import { IconButton as IconButtonMui, InputAdornment, TextField, TextFieldProps, useMediaQuery } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { DatePicker, DatePickerProps, DateTimePicker, DateTimePickerProps, TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import IconButton from './../IconButton/IconButton';





dayjs.extend(weekday);
dayjs.extend(localeData);

dayjs.locale('en'); 

type CustomInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'date'
  | 'datetime'
  | 'time';

interface CustomInputProps {
  type: CustomInputType;
  placeholder?:string,
  name: string;
  label?: string;
  value?: string | Dayjs | null | number;
  maxDate?: Dayjs | undefined;
  onChange: (name: string, value: string | Dayjs | null | number) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  margin?: TextFieldProps['margin'];
  variant?: TextFieldProps['variant'];
  disabled?: boolean;
  sx?: SxProps<Theme>;
  multiline?: boolean;
  rows?: number;
  textFieldProps?: Omit<
    TextFieldProps,
    | 'type' | 'name' | 'label' | 'value' | 'onChange' | 'error' | 'helperText'
    | 'required' | 'fullWidth' | 'margin' | 'variant' | 'disabled' | 'sx' | 'onFieldBlur'
  >;
  datePickerProps?: Omit<
    DatePickerProps<Dayjs>,
    | 'value' | 'onChange' | 'label' | 'disabled' | 'slotProps' | 'sx' | 'maxDate'
  >;
  dateTimePickerProps?: Omit<
    DateTimePickerProps<Dayjs>,
    | 'value' | 'onChange' | 'label' | 'disabled' | 'slotProps' | 'sx' 
  >;
  timePickerProps?: Omit<
    TimePickerProps<Dayjs>, | 'value' | 'onChange' | 'label' | 'disabled' | 'slotProps' | 'sx'
  >;
  onlyPositiveNumber?: boolean;
  from?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  mt?: any
}

const InputText: React.FC<CustomInputProps> = ({
  type,
  name,
  label,
  value,
  placeholder = 'Nhập thông tin',
  onChange,
  error = false,
  helperText,
  required = false,
  fullWidth = true,
  margin = 'none',
  variant = 'outlined',
  disabled = false,
  sx = {},
  multiline = false,
  rows,
  textFieldProps = {},
  datePickerProps = {},
  dateTimePickerProps = {},
  timePickerProps = {},
  onlyPositiveNumber = false,
  maxDate,
  from,
  startAdornment,
  endAdornment,
  mt
}) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const commonSlotTextFieldProps = {
    name, label, required, error, helperText, fullWidth, margin, variant, disabled,
  };

  const directTextFieldBaseProps = {
    name, label, required, error, helperText, fullWidth, margin, variant, disabled,
  };


  const hasValue = value !== null && value !== undefined && !(typeof value === 'string' && value.trim() === '');

  const handleClear = () => {
    if (type === 'date' || type === 'datetime' || type === 'time') {
      onChange(name, null);
    } else {
      onChange(name, '');
    }
  };

  if (type === 'date') {
    return (
      <DatePicker
        label={label}
        value={value as Dayjs | null}
        onChange={(newValue: Dayjs | null) => onChange(name, newValue)}
        disabled={disabled}
        maxDate={maxDate}
        sx={sx}
        slotProps={{
          textField: (params) => ({
            ...params,
            sx: {
              mt: mt,
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgb(53, 50, 50)',
                borderRadius: '8px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgb(53, 50, 50)',
              },
            },
            InputProps: {
              ...params.InputProps,
              placeholder: placeholder,
              endAdornment: (
                <>
                  {hasValue && (
                    <InputAdornment position='end'>
                      <IconButtonMui
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClear();
                        }}
                      >
                        <Close />
                      </IconButtonMui>
                    </InputAdornment>
                  )}
                  {params.InputProps?.endAdornment}
                </>
              )
            },
            ...commonSlotTextFieldProps,
          }),
          //  popper: {
          //     modifiers: [
          //       {
          //         name: 'offset',
          //         options: {
          //           offset: [0, 10],
          //         },
          //       },
          //       {
          //         name: 'sameWidth',
          //         enabled:  true,
          //         phase: 'beforeWrite',
          //         requires: ['commonSlotTextFieldProps'],
          //         fn({ state }){
          //           state.styles.popper.width = `${state.rects.reference.width}px`;
          //         }
          //       }
          //     ],
          //   },
          //   layout: {
          //     sx: {
          //       borderRadius: 2,
          //     },
          //   },
          //   day: {
          //     sx: {
          //       borderRadius: '6px',
          //       fontSize: '14px',
          //       '&.Mui-selected': {
          //         backgroundColor: '#1976d2',
          //       },
          //     },
          //   },
          //   calendarHeader: {
          //     sx: {
          //       '& .MuiPickersCalendarHeader-label': {
          //         fontWeight: 500,
          //         textTransform: 'capitalize',
          //       },
          //     },
          //   },
        }}
        format='DD/MM/YYYY'
        {...datePickerProps}
      />
    );
  }

  if (type === 'datetime') {
    return (
      <DateTimePicker
        label={label}
        value={value as Dayjs | null}
        onChange={(newValue: Dayjs | null) => onChange(name, newValue)}
        disabled={disabled}
        sx={sx}
        slotProps={{
          textField: { ...commonSlotTextFieldProps },
        }}
        ampm={false}
        format="DD/MM/YYYY HH:mm"
        {...dateTimePickerProps}
      />
    );
  }

  if(type === 'time'){
    return(
      <TimePicker
        label={label}
        value={value as Dayjs | null}
        onChange={(newValue: Dayjs | null) => onChange(name, newValue)}
        disabled={disabled}
        sx={sx}
        ampm // bật AM/PM
        views={['hours', 'minutes']}
        // hiện nut OK/ Cancel
        slotProps={{
          actionBar: {
            actions: ['cancel', 'accept'],    
          },
          textField: (params) => ({
            ...params,
            sx: {
              mt: mt,
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgb(53, 50, 50)',
                borderRadius: '8px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgb(53, 50, 50)',
              },
              
            },
            InputProps: {
              ...params.InputProps,
              placeholder: placeholder,
              endAdornment: (
                <>
                  {hasValue && (
                    <InputAdornment position='end'>
                      <IconButtonMui
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClear();
                        }}
                      >
                          <Close />
                        </IconButtonMui>
                      </InputAdornment>
                  )}
                  {params.InputProps?.endAdornment}
                </>
              )
            },
            ...commonSlotTextFieldProps,
          }),
        }}
        {...timePickerProps}
      />
    )
  }

  const finalTextFieldProps: TextFieldProps = {
    ...textFieldProps,
    type: (type === 'text' && multiline) ? undefined : type,
    value: value as string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value
      if(onlyPositiveNumber){
        //Cho phép xóa trắng
        if(val.trim() === ''){
          onChange(name, val);
          return;
        }

        // Kiểm tra số dương hợp lệ (số thực hoặc số nguyên dương)
        const numVal = Number(val);
        const regex = /^[1-9]\d*$/;
        if(!isNaN(numVal) && regex.test(val)){
          onChange(name,val);
        }
        // Nếu không hợp lệ thì bỏ qua, không gọi onChange => không update value
      }else{
        onChange(name, val)
      }
    },
    name,
    label,
    required,
    placeholder,
    error,
    helperText,
    fullWidth,
    margin,
    variant,
    disabled,
    sx,
    multiline: multiline,
    rows: multiline ? rows : undefined, 
  };


  return (
    <TextField
        InputProps={{
            sx:{
                "& .MuiOutlinedInput-notchedOutline":{
                    border: from ? "none" : "1px solid rgb(53, 50, 50)",
                    borderRadius:"8px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: from ? "none" : "1px solid rgb(53, 50, 50)",
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: from ? "none" : "1px solid rgb(53, 50, 50)",
                },
                color: 'black'
            },
            startAdornment: startAdornment,
            endAdornment: (hasValue && !disabled) ? (
              <InputAdornment position='end'>
                <IconButton
                  handleFunt={handleClear}
                  icon={<Close/>}
                />
              </InputAdornment>
            ) : endAdornment
        }}
        InputLabelProps={{
          sx: {
            fontSize: "14px",
            color: '#aaa'
          }
        }}
        sx={{
          ...sx,
        }}
      {...finalTextFieldProps}
    />
  );
};

export default InputText;