var loginPage = 'login.html';

if (!localStorage.getItem('loggedIn')){
    window.location.replace(loginPage);
}