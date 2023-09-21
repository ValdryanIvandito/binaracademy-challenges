const profileApi = () => {
    var myHeaders = new Headers();
    let authorization = '';
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if(token) {
        authorization = 'Basic ${token';
    }

    myHeaders.append("Authorization", authorization);
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch("http://localhost:3005/usergame/get", requestOptions)
    .then(response => response.json())
    //.then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export { profileApi };
