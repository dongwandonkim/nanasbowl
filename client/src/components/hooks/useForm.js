import { useState, useEffect } from 'react';
import parseIngredients from '../parseIngredients';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    productImage: [],
    productImageName: '',
    productName: '',
    productDesc: '',
    productType: '',
    petType: '',
    productIngredients: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parsedIngredients, setParsedIngredients] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const imageInfo = [...files, URL.createObjectURL(files[0])];

    setValues({ ...values, [name]: imageInfo });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    const { parsedIngredients } = parseIngredients(values.productIngredients);
    setParsedIngredients(parsedIngredients);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);
  return {
    handleChange,
    values,
    handleSubmit,
    handleImageChange,
    parsedIngredients,
    errors,
  };
};
export default useForm;
