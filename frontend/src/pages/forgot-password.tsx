import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface ForgotPasswordInputs {
  email: string;
}

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    try {
      await axios.post('http://localhost:8000/api/users/password_reset/', data);
      alert('Password reset email sent');
    } catch (error) {
      alert('Failed to send reset email');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: true })}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">Email is required</div>}
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Email</button>
      </form>
    </div>
  );
}
