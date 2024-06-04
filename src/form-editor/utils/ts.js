function convertCSStoReactStyle(cssString) {
  const style = {};
  // const cssWithoutSelector = cssString.replace(/^[^{]*{\s*|\s*}[^}]*$/g, '');
  const cssWithoutSelector = cssString.substring(cssString.indexOf('{') + 1, cssString.lastIndexOf('}')).trim();
  const rules = cssWithoutSelector.split(';');

  rules.forEach(rule => {
      if (rule.trim()) {
          const [property, value] = rule.split(':').map(item => item.trim());

          // Convert property from kebab-case to camelCase
          const camelCaseProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());

          style[camelCaseProperty] = value;
      }
  });

  return style;
}

// Example usage:
const cssString = `
  #form-234 {
      width: 500px;
      border: 1px solid red;
  }
`;
const reactStyle = convertCSStoReactStyle(cssString);
console.log(reactStyle);
