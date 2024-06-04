export function convertCSStoReactStyle(cssString: string) {
  const style: Record<string, any> = {};
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

