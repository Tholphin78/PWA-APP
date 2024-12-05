
const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        showDashboard();
    } else {
        alert('Nieprawidłowa nazwa użytkownika lub hasło.');
    }
};

const logout = () => {
    localStorage.removeItem('loggedIn');
    showLoginPage();
};

const showLoginAndRegisterPage = () => {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
};

const showDashboard = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
};

window.onload = () => {
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLoginAndRegisterPage();
    }
};

const apiUrl = 'http://localhost:3000/api/users';

const createUser = async (username, password) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data.message); // Komunikat z serwera
    } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error);
    }
};

// Wywołanie funkcji createUser() po kliknięciu przycisku "Zarejestruj"
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    createUser(username, password);
});
