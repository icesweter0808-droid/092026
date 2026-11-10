document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault();
var user = document.getElementById('username').value;
var pass = document.getElementById('password').value;
var userErr = document.getElementById('userError');
var passErr = document.getElementById('passError');
var isValid = true;
if (user.trim() === '') {
userErr.style.display = 'block';
isValid = false;
} else {
userErr.style.display = 'none';
}
if (pass.trim() === '') {
passErr.innerText = 'Password cannot be empty';
passErr.style.display = 'block';
isValid = false;
} else if (pass.length < 6) {
passErr.innerText = 'Password must be at least 6 characters';
passErr.style.display = 'block';
isValid = false;
} else {
passErr.style.display = 'none';
}
if (isValid === true) {
if (user.trim() === 'Benjamin' && pass === '123456') {
alert('Login Successful!');
} else {
passErr.innerText = 'Invalid username or password';
passErr.style.display = 'block';
}
}
});
