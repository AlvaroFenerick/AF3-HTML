const sql = require('mssql');

const dbConfig = {
    server: 'localhost\\SQLEXPRESS',
    database: 'UserAuthDB',
    options: {
        encrypt: true, // Pode ser false se não precisar de criptografia
        trustServerCertificate: false, // Essencial para desenvolvimento local
        port: 1433 // Porta padrão do SQL Server
    },
    authentication: {
        type: 'ntlm', // Autenticação do Windows
        options: {
            domain: '' // Deixe vazio se for um computador local sem domínio
        }
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado ao SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Erro ao conectar ao SQL Server:', {
            message: err.message,
            code: err.code,
            originalError: err.originalError
        });
        throw err; // Lança o erro para ser capturado no server.js
    });

module.exports = { poolPromise, sql };