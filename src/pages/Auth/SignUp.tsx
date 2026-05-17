// hooks
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// api
import { register } from '../../services/api';
// type 
import { response } from '../../types/types';
// library
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
// data
import { ERROR_MESSAGES, AUTH_TEXT } from '../../data/data';
import { useAuth } from '../../context/AuthContext';


interface Props {
  toggle: () => void;
  isVisible: boolean;
}

const SignUp = ({ toggle, isVisible }: Props) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSuccess = (data: response) => {
    login(data.token)
    navigate('/')
  }

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: handleSuccess,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || ERROR_MESSAGES.server_error);
      }
    }
  })

  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', role: 'student', confirmPassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('اسم المستخدم مطلوب'),
      email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
      password: Yup.string().min(6, 'كلمة المرور قصيرة جداً').required('كلمة المرور مطلوبة'),
      role: Yup.string().oneOf(['student', 'landlord'], 'الدور غير صالح').required('الدور مطلوب'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'كلمات المرور غير متطابقة')
        .required('تأكيد كلمة المرور مطلوب'),
    }),
    onSubmit: (values) => {
      mutate({
        name: values.username,
        email: values.email,
        password: values.password,
        role: values.role
      })
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      dir="rtl"
      className={`w-full max-w-md p-4 transition-all duration-500 delay-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-4 text-right"
      >

        {/* Switch user role button if it is student or landlord */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => formik.setFieldValue('role', 'student')}
              className={`hover:cursor-pointer w-full py-2 px-4 rounded-lg rounded-se-[0px] rounded-ee-[0px] font-bold transition-colors ${formik.values.role === 'student'
                ? 'bg-[#4EA685] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {AUTH_TEXT.student}
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldValue('role', 'landlord')}
              className={`hover:cursor-pointer w-full py-2 px-4 rounded-lg rounded-ss-[0px] rounded-es-[0px] font-bold transition-colors ${formik.values.role === 'landlord'
                ? 'bg-[#4EA685] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {AUTH_TEXT.landlord}
            </button>
          </div>
          {formik.touched.role && formik.errors.role && (
            <span className="text-red-500 text-xs text-center">{formik.errors.role}</span>
          )}
          <p className="text-sm text-gray-600 text-center">
            {formik.values.role === 'student'
              ? AUTH_TEXT.student_description
              : AUTH_TEXT.landlord_description}
          </p>

        </div>

        {/* Username */}
        <div>
          <input
            placeholder={AUTH_TEXT.username}
            className="w-full py-3 px-4 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#4EA685] outline-none text-right"
            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username && (
            <span className="text-red-500 text-xs mt-1 block">{formik.errors.username}</span>
          )}
        </div>

        {/* Email */}
        <div >
          <input
            dir="ltr"
            type="email"
            placeholder="example@gmail.com"
            className="w-full py-3 px-4 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#4EA685] outline-none"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs mt-1 block">{formik.errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={AUTH_TEXT.password}
            className=" w-full py-3 px-4 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#4EA685] outline-none text-right"
            {...formik.getFieldProps('password')}
          />
          <span
            className=" absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <Eye size={24} color="#4EA685" />
            ) : (
              <EyeOff size={24} color="#4EA685" />
            )}
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <span className="text-red-500 text-xs block">{formik.errors.password}</span>
        )}

        {/* Confirm Password */}
        <div className='relative'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={AUTH_TEXT.confirm_password}
            className="w-full py-3 px-4 bg-gray-100 rounded-lg border-2 border-transparent focus:border-[#4EA685] outline-none text-right"
            {...formik.getFieldProps('confirmPassword')}
          />
          <span
            className=" absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
            onClick={handleShowConfirmPassword}
          >
            {showConfirmPassword ? (
              <Eye size={24} color="#4EA685" />
            ) : (
              <EyeOff size={24} color="#4EA685" />
            )}
          </span>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span className="text-red-500 text-xs block">{formik.errors.confirmPassword}</span>
        )}

        <button
          type="submit"
          className={`w-full py-3 bg-[#4EA685] text-white rounded-lg text-xl font-bold hover:bg-[#57B894] transition-colors ${isPending ? 'hover:not-allowed' : 'hover:cursor-pointer'} `}
          disabled={isPending}
        >
          {isPending ?
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"> </span>  {AUTH_TEXT.registering}
            </span> : AUTH_TEXT.register_now}
        </button>

        <p className="text-center text-sm">
          <b onClick={toggle} className="cursor-pointer text-[#4EA685] hover:underline">
            {AUTH_TEXT.login_now}
          </b>
        </p>
      </form>
    </div>
  );
};

export default SignUp;