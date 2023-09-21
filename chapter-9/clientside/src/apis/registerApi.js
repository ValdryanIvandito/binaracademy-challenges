const registerApi = (payload) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", payload.username);
    urlencoded.append("email", payload.email);
    urlencoded.append("password", payload.password);
    urlencoded.append("confirmPassword", payload.confirmPassword);
    urlencoded.append("scores", payload.scores);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch("http://localhost:3005/usergame/insert", requestOptions)
    .then(response => response)
    // .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export { registerApi };