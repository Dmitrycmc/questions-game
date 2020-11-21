const doRequest = (method, url, body, cb) => {
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        ...(body && {body: JSON.stringify(body)})
    }).then(res => res.json()).then(cb);
};

export default doRequest;