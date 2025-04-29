function isEmailValid() {
    const email = form.email().value;
    return email && /\S+@\S+\.\S+/.test(email);
}
