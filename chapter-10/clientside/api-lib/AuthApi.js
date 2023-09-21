function loginApi(payload) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", payload.username);
  urlencoded.append("password", payload.password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch(`${process.env.REACT_APP_BE_URL}/login`, requestOptions)
    .then(response => response)
    .catch(error => console.log('error', error));
}

export { loginApi }