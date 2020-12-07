const SERVER_ORIGIN = "https://defiant-holly-hair.glitch.me";

const doRequest = (method, url, body, cb) => {
  fetch(SERVER_ORIGIN + '/api/' + url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    ...(body && { body: JSON.stringify(body) })
  })
    .then(res => res.json())
    .then(cb).catch(err => console.warn(err));
};

export default doRequest;
