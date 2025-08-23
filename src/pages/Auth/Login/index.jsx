import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import loginImg from "../../../assets/images/login_img.png";
import logo from "../../../assets/images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router";
import Axios from "../../../services/Axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getUserInfo,
  login,
  userSliceReset,
} from "../../../redux/slices/userSlice";
import { Spinner } from "react-bootstrap";
import { getValidationSchema } from "./loginValidation";
import { useTranslation } from "react-i18next";
import SEO from "../../../../SEO";

const customLoginMessage = {
  tr: {
    success: {
      loginSuccessMessage: "Giriş İşlemi Başarılı",
    },
  },
  en: {
    success: {
      loginSuccessMessage: "Login Successful",
    },
  },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.user
  );
  const location = useLocation;

  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const { errors, values, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: getValidationSchema,
      onSubmit: async (values) => {
        if (values?.email && values?.password) {
          const loginRes = await dispatch(login(values)).unwrap();
          if (loginRes?.accessToken) {
            await dispatch(getUserInfo());
            navigate(from || "/", { replace: true });
          }
        }
      },
    });

  useEffect(() => {
    if (isSuccess && user) {
      toast.success(
        `${customLoginMessage[i18n?.language]?.success?.loginSuccessMessage}`
      );
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
    return () => {
      dispatch(userSliceReset());
    };
  }, [dispatch, isSuccess, isError, message, navigate, i18n?.language, user]);

  return (
    <>
      <SEO
        title={t("auth.login.metaTitle")}
        description={t("auth.login.metaDescription")}
        keywords={t("auth.login.metaKeywords")}
      />
      <div className="login_container">
        <div className="login_brand">
          <div className="login_brand_header">
            <img src={logo} alt="KAVIO" className="logo_img" />
          </div>
          <div className="login_brand_content">
            <div>
              <h1 className="login_brand_title">
                {t("auth.login.brandTitle")}
              </h1>
              <p className="login_brand_subtitle">
                {t("auth.login.brandSubTitle")}
              </p>
            </div>
            <img src={loginImg} alt="" className="login_illustration" />
          </div>
          <div className="login_brand_footer">
            <p className="login_footer_text">
              © {new Date().getFullYear()} Kavio
            </p>
          </div>
        </div>

        <div className="login_panel">
          <div className="login_panel_header">
            <h2 className="login_panel_title">{t("auth.login.formTitle")}</h2>
            <div className="login_panel_subtitle">
              {t("auth.login.formSubTitle")}&nbsp;
              <a className="login_panel_link">
                {t("auth.login.formSubTitleLink")}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login_panel_content">
            <div className="field">
              <input
                id="email"
                type="text"
                placeholder=" "
                autoComplete="username"
                name="email"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${touched?.email && errors?.email ? "error" : ""}`}
              />
              <label htmlFor="email">{t("auth.login.emailInputLabel")}</label>
            </div>
            {touched?.email && errors?.email && (
              <div className="field_error_message">{errors?.email}</div>
            )}
            <div className="field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                autoComplete="current-password"
                name="password"
                value={values?.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${
                  touched?.password && errors?.password ? "error" : ""
                }`}
              />
              <label htmlFor="password">
                {t("auth.login.passwordInputLabel")}
              </label>

              {/* Toggle button */}
              <button
                type="button"
                className="password_toggle"
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                aria-pressed={showPassword}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched?.password && errors?.password && (
              <div className="field_error_message">{errors?.password}</div>
            )}
            <div className="forgot_password">
              <Link className="forgot_password_link">
                {t("auth.login.forgotPasswordText")}
              </Link>
            </div>

            <button
              className={`login_panel_button ${
                isLoading ? "loading_button" : ""
              }`}
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : `${t("auth.login.submitButtonText")}`}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
