import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UniForm from '../components/form/UniForm';
import UniInput from '../components/form/UniInput';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const defaultValues = {
    userId: 'A-0001',
    password: 'admin123',
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in...');

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success('Logged is successfully!', { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <UniForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <UniInput type={'text'} name={'userId'} label={'Id: '} />
        <UniInput type='text' name='password' label={'Password: '} />
        <Button htmlType='submit'>Login</Button>
      </UniForm>
    </Row>
  );
};

export default Login;
