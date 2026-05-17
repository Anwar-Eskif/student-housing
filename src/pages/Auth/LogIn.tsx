// hooks
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// api
import { login } from '../../services/api';
// type
import { response } from '../../types/types';
// library
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
// data
import { ERROR_MESSAGES, AUTH_TEXT } from '../../data/data';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  toggle: () => void;
  isVisible: boolean;
}

const LogIn = ({ toggle, isVisible }: Props) => {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSuccess = (data: response) => {
    // This updates localStorage AND the React State inside AuthProvider
    loginContext(data.token);
    navigate('/');
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: handleSuccess,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || ERROR_MESSAGES.server_error);
      }
    },

  })

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
      password: Yup.string().min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل').required('كلمة المرور مطلوبة'),
    }),
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password,
      })
    },
  });

  return (
    /* Added dir="rtl" to handle the text flow and alignment */
    <div
      dir="rtl"
      className={`w-full max-w-md p-4 transition-all duration-500 delay-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-4 text-right"
      >
        {/* Email Input */}
        <div className="relative">
          <input
            name="email"
            type="text"
            placeholder={AUTH_TEXT.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            /* Note: px-12 changed to pr-12 if you have an icon on the right */
            className="w-full py-3 px-4 bg-gray-100 rounded-lg border-2 border-white focus:border-[#4EA685] outline-none transition-colors text-right"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-red-500 text-xs mt-1 block">{formik.errors.email}</span>
          )}
        </div>

        {/* Password Input */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 bg-[#4EA685] text-white rounded-lg text-xl font-bold hover:bg-[#57B894] transition-colors ${isPending ? 'hover:not-allowed' : 'hover:cursor-pointer'} `}
          disabled={isPending}
        >
          {isPending ?
            <span className="flex items-center justify-center gap-2">``
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"> </span> {AUTH_TEXT.registering}
            </span> : AUTH_TEXT.login}
        </button>

        {/* Footer Links */}
        <p className="text-center text-sm">
          <b onClick={toggle} className="cursor-pointer text-[#4EA685] hover:underline">
            {AUTH_TEXT.register_now}
          </b>
        </p>
      </form>
    </div>
  );
};

export default LogIn;