const API_BASE_URL = 'https://ets-pemrograman-web-f.cyclic.app';
var ACCESS_TOKEN;

function handleErrors(error) {
    console.error('Error:', error);
    throw error;
}

function getCommonHeaders() {
    return {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    };
}

// POST - Login User
async function loginUser(email, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
        ACCESS_TOKEN = response.data.data.access_token;
        updateWelcomeMessage();
        alert('Login Berhasil!');
        return response.data;
    } catch (error) {
        alert(error);
        showDialogClick('login');
        handleErrors(error);
    }
}

// POST - Register User
async function registerUser(nama, email, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, { nama, email, password });
        alert('Registrasi Berhasil!');
        showDialogClick('login');
        return response.data;
    } catch (error) {
        alert(error);
        showDialogClick('register');
        handleErrors(error);
    }
}

// GET - Get All Users
async function getAllUsers() {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`, { headers: getCommonHeaders() });
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}

// GET - Get Profile User
async function getProfileUser() {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`, { headers: getCommonHeaders() });
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}

// GET - Get Score
async function getScore() {
    try {
        const response = await axios.get(`${API_BASE_URL}/scores/score`);
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}

// POST - Create Score
async function createScore(scoreData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/scores/score`, scoreData);
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}

function getLoginForm() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    loginUser(email, password);

    const loginData = {
        email: email,
        password: password
    };

    console.log("Login Data Submitted:", loginData);
}

function getRegisterForm() {
    const nama = document.getElementById("register-nama").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    registerUser(nama, email, password);

    const registerData = {
        nama: nama,
        email: email,
        password: password
    };

    console.log("User Data Submitted:", registerData);
}

async function setScoreboard() {
    var res = await getScore();
    var scoreboardData = res.data;

    scoreboardData.sort((a, b) => b.score - a.score);
    scoreboardData = scoreboardData.slice(0, 15);

    const scoreboardTable = document.querySelector('.scoreboard-body tbody');
    scoreboardTable.innerHTML = '';

    scoreboardData.forEach((player) => {
        const row = document.createElement('tr');
        const playerNameCell = document.createElement('td');
        playerNameCell.textContent = player.nama;
        const playerScoreCell = document.createElement('td');
        playerScoreCell.textContent = player.score;
        row.appendChild(playerNameCell);
        row.appendChild(playerScoreCell);
        scoreboardTable.appendChild(row);
    });
}

async function updateWelcomeMessage() {
    var res = await getProfileUser();
    var userData = res.data;

    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Welcome, ${userData.nama}!`;
}