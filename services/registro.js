const { poolPromise } = require('./db');

async function registerUser(username, email, password) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .input('email', email)
            .input('password', password) // A senha deve ser criptografada em produção
            .query(`
                INSERT INTO Users (username, email, password)
                VALUES (@username, @email, @password);
                SELECT SCOPE_IDENTITY() AS id;
            `);
        return result.recordset[0];
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        throw err;
    }
}

module.exports = { registerUser };