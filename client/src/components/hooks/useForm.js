import { useState } from 'react';

const useForm = (validate) => {
  const [values, setValues] = useState({
    productName: '',
    productDesc: '',
    productType: '',
    petType: '',
    productIngredients: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setErrors(validate(values));
  };

  return { handleChange, values, handleSubmit, errors };
};
export default useForm;
