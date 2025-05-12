document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Login bem-sucedido!');
            window.location.href = '/';
        } else {
            alert(data.error || 'Erro ao fazer login');
        }
    } catch (err) {
        console.error('Erro:', err);
        alert('Erro ao conectar ao servidor');
    }
});