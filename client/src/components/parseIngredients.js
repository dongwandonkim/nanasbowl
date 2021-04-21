export default function parseIngredients(values) {
  let parsedIngredients = [];
  let parsingError = '';

  if (!values.trim().length) {
    parsedIngredients = [];
    parsingError = '';
    // return;
  }
  //TODO : replace 'and'
  const list = values.replace(/\n|\r|\*/g, '').split(/\,\s*(?![^\(]*\))/);

  parsedIngredients = [];
  parsingError = '';
  for (const ingredient of list) {
    const textPattern = /^([\w\s\-]+)/;
    const errorPattern = /additives/i;

    if (!textPattern.test(ingredient) || errorPattern.test(ingredient)) {
      parsingError = `parsing error: ${ingredient}`;
      break;
    } else {
      const polished = ingredient.split(textPattern)[1].toLowerCase().trim();
      if (polished.length) {
        parsedIngredients.push(polished);
      }
    }
  }
  return { parsedIngredients, parsingError };
}
