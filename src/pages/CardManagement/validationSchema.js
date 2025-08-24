import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  cardIds: Yup.array()
    .min(1, "Boş bırakılamaz")
    .required("Boş bırakılamaz"),
});

export default validationSchema;
