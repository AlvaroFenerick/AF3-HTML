const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    loginButton: () => document.getElementById('login-button'),
    recoverButton: () => document.getElementById('recover-password-button')
};

function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function isPasswordValid() {
    const password = form.password().value;
    return !!password;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = email && !validateEmail(email) ? "block" : "none";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    form.recoverButton().disabled = !emailValid;
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
