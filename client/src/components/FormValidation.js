export default function validate(values) {
  let errors = {};

  if (!values.productName.trim()) {
    errors.productName = 'Product name is required';
  }
  if (!values.productDesc.trim()) {
    errors.productDesc = 'Product description is required';
  }
  if (!values.productType) {
    errors.productType = 'Product type is required';
  }
  if (!values.petType) {
    errors.petType = 'Pet type is required';
  }
  if (!values.productIngredients.trim()) {
    errors.productIngredients = 'Product ingredients list is required';
  }
  if (values.productImage.length === 0) {
    errors.productImage = 'Product image is required';
  }

  return errors;
}
