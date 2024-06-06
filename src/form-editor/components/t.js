const cssString = `
/* 组件样式 */
#el-096s3fvjv98{
  color: red;
} 
 /* 容器样式 */
#container-096s3fvjv98{
}
`;

// Function to convert CSS string to React CSS object
function parseCSS(css) {
    const cssObject = {};
    const regex = /#([\w-]+)\s*{([^}]*)}/g;
    let match;

    while ((match = regex.exec(css)) !== null) {
        console.log(match)
        const key = match[1];
        const properties = match[2].trim().split(';').filter(Boolean);

        cssObject[key] = properties.reduce((acc, prop) => {
            const [property, value] = prop.split(':').map(str => str.trim());
            // Convert property to camelCase
            const camelCaseProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
            acc[camelCaseProperty] = value;
            return acc;
        }, {});
    }

    return cssObject;
}

const cssObject = parseCSS(cssString);
console.log(cssObject);
// Output: { a: { color: 'red' }, b: { color: 'blue' } }
