const { poolPromise } = require('./db');

async function loginUser(email, password) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', email)
            .input('password', password)
            .query(`
                SELECT * FROM Users
                WHERE email = @email AND password = @password;
            `);
        return result.recordset[0];
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        throw err;
    }
}

module.exports = { loginUser };