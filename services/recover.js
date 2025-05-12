const { poolPromise } = require('./db');
const crypto = require('crypto');

async function generateResetToken(email) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hora de validade

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', email)
            .input('resetToken', token)
            .input('resetTokenExpiry', expiry)
            .query(`
                UPDATE Users
                SET resetToken = @resetToken, resetTokenExpiry = @resetTokenExpiry
                WHERE email = @email;
            `);
        if (result.rowsAffected[0] === 0) {
            throw new Error('Usuário não encontrado');
        }
        return token;
    } catch (err) {
        console.error('Erro ao gerar token de recuperação:', err);
        throw err;
    }
}

async function resetPassword(token, newPassword) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('resetToken', token)
            .input('newPassword', newPassword)
            .input('currentTime', new Date())
            .query(`
                UPDATE Users
                SET password = @newPassword, resetToken = NULL, resetTokenExpiry = NULL
                WHERE resetToken = @resetToken AND resetTokenExpiry > @currentTime;
            `);
        if (result.rowsAffected[0] === 0) {
            throw new Error('Token inválido ou expirado');
        }
    } catch (err) {
        console.error('Erro ao redefinir senha:', err);
        throw err;
    }
}

module.exports = { generateResetToken, resetPassword };