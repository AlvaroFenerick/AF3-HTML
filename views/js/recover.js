document.getElementById('recoverForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/api/recover', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Token gerado: ${data.token}. Use-o para redefinir sua senha.`);
        } else {
            alert(data.error || 'Erro ao gerar token');
        }
    } catch (err) {
        console.error('Erro:', err);
        alert('Erro ao conectar ao servidor');
    }
});

document.getElementById('resetForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.getElementById('token').value;
    const newPassword = document.getElementById('newPassword').value;

    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Senha redefinida com sucesso! Faça login.');
            window.location.href = '/login.html';
        } else {
            alert(data.error || 'Erro ao redefinir senha');
        }
    } catch (err) {
        console.error('Erro:', err);
        alert('Erro ao conectar ao servidor');
    }
});