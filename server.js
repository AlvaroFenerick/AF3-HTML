const express = require('express');
const path = require('path');
const { poolPromise } = require('./services/db');
const { registerUser } = require('./services/registro');
const { loginUser } = require('./services/Login');
const { generateResetToken, resetPassword } = require('./services/recover');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir arquivos estáticos da pasta views/
app.use(express.static(path.join(__dirname, 'views')));

// Rotas para as páginas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/registro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});

app.get('/recover.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recover.html'));
});

// Rotas da API
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await registerUser(username, email, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso', userId: user.id });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        if (user) {
            res.status(200).json({ message: 'Login bem-sucedido', user });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

app.post('/api/recover', async (req, res) => {
    const { email } = req.body;
    try {
        const token = await generateResetToken(email);
        res.status(200).json({ message: 'Token gerado com sucesso', token });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao gerar token de recuperação' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await resetPassword(token, newPassword);
        res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao redefinir senha' });
    }
});

const PORT = 3000;
poolPromise
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Não foi possível iniciar o servidor devido a um erro de conexão:', err);
        process.exit(1);
    });