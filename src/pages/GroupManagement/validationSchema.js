import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name:Yup.string().required("Boş bırakılamaz")
});

export default validationSchema;