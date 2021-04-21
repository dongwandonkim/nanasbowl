export default function validation(values) {
  let errors = {};

  if (!values.productName.trim()) {
    errors.productName = 'Product name is required';
  }
  if (!values.productDesc.trim()) {
    errors.productDesc = 'Product description is required';
  }
  if (!values.productType.trim()) {
    errors.productType = 'Product type is required';
  }
  if (!values.petType.trim()) {
    errors.petType = 'Pet type is required';
  }
  if (!values.productIngredients.trim()) {
    errors.productIngredients = 'Product ingredients list is required';
  }

  return errors;
}
