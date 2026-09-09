import { useState } from "react";
import { loginUser, registerUser } from "../../Api/authApi";
import { saveAuthData } from "../../Api/authStorage";
import { useApp } from "../../Context";
import "../Css/Login.css";

export default function LoginPopUp() {
  const { setRespond } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const data = await loginUser(email, password);

        saveAuthData(data.token, data.user);

        setRespond({
          message: data.message,
          type: "success",
        });
      } else {
        // REGISTER
        const data = await registerUser(
          name,
          email,
          password
        );

        saveAuthData(data.token, data.user);

        setRespond({
          message: data.message,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);

      if (!navigator.onLine) {
        setRespond({
          message:
            "You are offline. Please connect to the internet.",
          type: "error",
        });
      } else {
        setRespond({
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="auth-switch">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <h2>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p>
          {isLogin
            ? "Login to continue"
            : "Create your new account"}
        </p>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button
          className="submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>
      </form>
    </div>
  );
}