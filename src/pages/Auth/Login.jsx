import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import loginImg from "../../assets/images/login_img.png";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login_container">
      <div className="login_brand">
        <div className="login_brand_header">
          <img src={logo} alt="KAVIO" className="logo_img" />
        </div>
        <div className="login_brand_content">
          <div>
            <h1 className="login_brand_title">Şirket Yönetim Paneli</h1>
            <p className="login_brand_subtitle">
              Yetkili kullanıcılar için güvenli giriş alanı
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
          <h2 className="login_panel_title">Hesabınıza Giriş Yapın</h2>
          <div className="login_panel_subtitle">
            Hesabınız yok mu?&nbsp;<a className="login_panel_link">Başlayın</a>
          </div>
        </div>

        <div className="login_panel_content">
          <div className="field">
            <input
              id="email"
              type="text"
              placeholder=" "
              autoComplete="username"
            />
            <label htmlFor="email">E-Mail</label>
          </div>

          <div className="field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              autoComplete="current-password"
            />
            <label htmlFor="password">Şifre</label>

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

          <div className="forgot_password">
            <Link className="forgot_password_link">Şifremi Unuttum?</Link>
          </div>

          <button className="login_panel_button">Giriş</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
