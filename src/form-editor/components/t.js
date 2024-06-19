const appendUrl = (baseUrl, params) => {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString()
  }

console.log(appendUrl('https://a.com', { b:2, c:3 }))