import React from 'react';

export function parseCSS(css?: string): { [key: string]: React.CSSProperties } {
  if (!css) return {};
  const cssObject: Record<string, React.CSSProperties> = {};
  const regex = /#([\w-]+)\s*{([^}]*)}/g;
  let match;

  while ((match = regex.exec(css)) !== null) {
    const key = match[1];
    const properties = match[2].trim().split(';').filter(Boolean);

    cssObject[key] = properties.reduce((acc: any, prop) => {
      const [property, value] = prop.split(':').map((str) => str.trim());
      // Convert property to camelCase
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase(),
      );
      acc[camelCaseProperty] = value;
      return acc;
    }, {});
  }

  return cssObject;
}
