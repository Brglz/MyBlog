import { showError, showInfo } from '../notifications.js';
import { register, checkResult, login, logout } from '../data.js';

export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };

    this.partial('./templates/user/register.hbs');
}

export async function registerPost() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };
    try {
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters long!')
        }
        if (this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords does NOT match!')
        }

        const result = await register(
            this.params.email,
            this.params.password,
        );

        checkResult(result)

        const loginResult = await login(this.params.email, this.params.password);

        checkResult(loginResult)

        this.app.userData.email = loginResult.email;
        this.app.userData.userId = loginResult.objectId;

        showInfo('User registered successful!');

        this.redirect('#/home');

    } catch (err) {
        showError(err.message);
    }
    this.partial('./templates/user/register.hbs');
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };

    this.partial('./templates/user/login.hbs');
}

export async function loginPost() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };

    try {
        const result = await login(this.params.email, this.params.password);

        checkResult(result)

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;

        showInfo(`Login successful`);

        this.redirect('#/home');

    } catch (err) {
        showError(err.message)
    }
}


export async function logoutPage() {
    try {
        const result = await logout();

        checkResult(result);

        this.app.userData.email = '';
        this.app.userData.userId = '';

        showInfo('Successfully logged out!')

        this.redirect('#/home')

    } catch (err) {
        showError(err.message)
    }
}