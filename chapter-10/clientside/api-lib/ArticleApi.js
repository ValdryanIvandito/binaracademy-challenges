function ArticleApi() {
  var myHeaders = new Headers();
  let authorization = ''
  const token = localStorage.getItem('token');
  if(token) {
    authorization = `Basic ${token}`
  }
  myHeaders.append("Authorization", authorization);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  
  return fetch(`${process.env.REACT_APP_BE_URL}/article/get`, requestOptions)
    .then(response => {
      if(response.status === 401) {
        window.location.replace('/login')
      } else {
        return response.json()
      }
    })
    .catch(error => console.log('error', error));
}

function InsertArticle(payload) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("title", payload.title);
  urlencoded.append("body", payload.body);
  urlencoded.append("approved", payload.approved);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch(`${process.env.REACT_APP_BE_URL}/article/insert`, requestOptions)
    .then(response => {
      if(response.status === 200) {
        return response.json()
      } else {
        return response.text()
      }
    })
    .catch(error => console.log('error', error));
}

export { ArticleApi, InsertArticle };