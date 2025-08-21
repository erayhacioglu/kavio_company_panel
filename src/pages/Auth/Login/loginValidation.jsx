import * as Yup from "yup";
import i18next from "../../../i18n";

export const getValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required(i18next.t("auth.login.validation.required_email"))
      .email(i18next.t("auth.login.validation.invalid_email")),
    password: Yup.string().required(
      i18next.t("auth.login.validation.required_password")
    ),
  });