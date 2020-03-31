const buildUrl = (url, params) => {
    // from https://fetch.spec.whatwg.org/#fetch-api
    const u = new URL(url);

    Object.keys(params)
        .forEach(key => u.searchParams.append(key, params[key]));

    return u;
};

const request = (url, params, options) =>
      fetch(buildUrl(url, params), options)
      .then(async res => {
          if (! res.ok) { throw await res.json(); }
          try {
              return await res.json();
          } catch (e) { // response is not a json
              return undefined;
          }
      });

request.get = (url, params, options) =>
    request(url, params, options || {});

['POST', 'PUT', 'PATCH', 'DELETE']
    .forEach(method => {
        request[method.toLowerCase()] =
            (url, params, options) => {
                const newOptions = options ? { ...options } : {};
                newOptions.method = method;
                newOptions.headers = newOptions.headers ?
                    { ...newOptions.headers } : {};
                newOptions.headers['Content-Type'] = 'application/json';
                newOptions.body = JSON.stringify(params);

                return request(url, {}, newOptions);
            };
    });

export { buildUrl, request };
