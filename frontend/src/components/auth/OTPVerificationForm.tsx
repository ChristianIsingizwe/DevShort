import React, { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyOTP } from "../../hooks/auth/useVerifyOTP";
import { OTPData } from "../../services/authService";

interface LocationState {
  email: string;
}

const OTPVerificationForm: React.FC = () => {
  const location = useLocation();
  const { email } = location.state as LocationState;
  const [otp, setOtp] = useState("");
  const { mutate: verifyOTP, isPending, error } = useVerifyOTP();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const data: OTPData = { email, otp: Number(otp) };

    verifyOTP(data, {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <p className="mb-4 text-center">An OTP has been sent to {email}</p>
        <div className="mb-6">
          <label htmlFor="otp" className="block text-gray-700 mb-2">
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            value={otp}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error.message}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
