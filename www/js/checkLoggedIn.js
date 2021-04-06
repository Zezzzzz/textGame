var loginPage = 'login.html';

if (!sessionStorage.getItem('loggedIn')){
    window.location.replace(loginPage);
}