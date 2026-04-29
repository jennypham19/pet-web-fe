import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { Email, Lock, Notifications, PasswordOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { loginSchema } from '@/schemas/auth-schema';
import { signIn } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';
import { setIsAuth } from '@/slices/auth';
import { setProfile } from '@/slices/user';
import { useAppDispatch } from '@/store';
import { setAccessToken } from '@/utils/AuthHelper';
import Logger from '@/utils/Logger';
import { COLORS } from '@/constants/colors';
import { ERROR_TYPE } from '@/constants/errorMessage';
import { ApiError } from '@/types/errors';

export const ID_USER = 'user_id'

interface LoginFormInputs {
  account: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { t } = useTranslation('auth');
  const [_loading, setLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotification();
  const [_error, setError] = useState<ApiError | null>(null);
  const [showPassword, setShowPassword] = useBoolean(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setFocus('account');
  }, [setFocus]);

  const onSubmit = async (values: LoginFormInputs) => {
    setLoading.on();
    try {
      const respAuth = await signIn({
        account: values.account,
        password: values.password,
      });
      const accessToken = respAuth.data?.accessToken;
      const userProfile = respAuth.data?.user;
      if (accessToken && userProfile) {
        setAccessToken(accessToken);
        // Cập nhật state của Redux/Context
        // Thông tin user đã có sẵn từ response login, không cần gọi /me nữa
        dispatch(setProfile(userProfile));
        dispatch(setIsAuth(true));
        // Thông báo và chuyển hướng
        notify({
          message: t('login_success'),
          severity: 'success',
        });

        navigate('/' + ROUTE_PATH.MANAGE, { replace: true });  
        // // Xét trường is_reset
        // if(userProfile.isReset){
        //   localStorage.setItem(ID_USER, String(userProfile.id));
        //   navigate('/' + ROUTE_PATH.CHANGE_PASSWORD)
        // }else{
        //   // 3. Cập nhật state của Redux/Context
        //   // Thông tin user đã có sẵn từ response login, không cần gọi /me nữa
        //   dispatch(setProfile(userProfile));
        //   dispatch(setIsAuth(true));
        //   // 4. Thông báo và chuyển hướng
        //   notify({
        //     message: t('login_success'),
        //     severity: 'success',
        //   });

        //   navigate('/' + ROUTE_PATH.MANAGE, { replace: true });   
        // }
      } else {
        notify({
          message: respAuth.message || 'Login failed, no access token returned.',
          severity: 'error'
        });
      }
    } catch (error: any) {
      console.log("error", error);
      
      setError(error)
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='Pet- Đăng nhập'>
      <Box display='flex' justifyContent='space-between'>
        <Typography
          component='h1'
          variant='h4'
          fontWeight={500}
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Welcome to PET!
        </Typography>
        {/* {_error && (_error.type === ERROR_TYPE.CHANGED_PASSWORD || _error.type === ERROR_TYPE.RESET_PASSWORD) && (
          <Tooltip title="Link đặt lại mật khẩu">
            <IconButton
              sx={{
                '&: hover': {
                  bgcolor: 'transparent'
                }
              }}
            >
              <PasswordOutlined/>
            </IconButton>
          </Tooltip>          
        )} */}

      </Box>
      {_error && (
        <Alert variant='filled' severity='error'>
          {_error.message}
        </Alert>
      )}
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <ControllerTextField<LoginFormInputs>
          controllerProps={{
            name: 'account',
            defaultValue: '',
            control: control,
          }}
          textFieldProps={{
            label: 'Account',
            error: !!errors.account,
            helperText: errors.account?.message,
            sx: { ariaLabel: 'username' },
          }}
          prefixIcon={Email}
        />
        <ControllerTextField<LoginFormInputs>
          controllerProps={{
            name: 'password',
            defaultValue: '',
            control: control,
          }}
          textFieldProps={{
            label: 'Password',
            type: showPassword ? 'text' : 'password',
            error: !!errors.password,
            helperText: errors.password?.message,
            slotProps: {
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword.toggle()}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            },
          }}
          prefixIcon={Lock}
        />
        <div>
          {/* {_error && _error.type === ERROR_TYPE.INCORRECT_PASSWORD && (
            <Box>
              <Typography
                color='primary'
                component={RouterLink}
                to={`/${ROUTE_PATH.FORGOT_PASSWORD}`}
                sx={{ textAlign: 'end', display: 'block' }}
              >
                Quên mật khẩu?
              </Typography>
            </Box>            
          )} */}

        </div>
        <LoadingButton loading={_loading} type='submit' variant='contained' fullWidth sx={{ bgcolor: COLORS.PRIMARY }}>
          Đăng nhập
        </LoadingButton>
        {/* <Box display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
          <Typography>Don't have an account</Typography>
          <Typography
            to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.REGISTRATION}`}
            component={RouterLink}
            color='primary'
          >
            Create an account
          </Typography>
        </Box> */}
      </Box>
    </Page>
  );
}
