import home, { createPage, createPost, editPage, editPost, detailsPage, deletePost } from './controllers/home.js';
import { registerPage, registerPost, loginPage, loginPost, logoutPage } from './controllers/user.js';


window.addEventListener('load', () => {
    const app = Sammy('#root', function () {

        this.use('Handlebars', 'hbs');

        this.userData = {
            email: sessionStorage.getItem('email') || '',
            userId: sessionStorage.getItem('userId') || '',
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', registerPage);
        this.post('#/register', (ctx) => { registerPost.call(ctx) });

        this.get('#/login', loginPage);
        this.post('#/login', (ctx) => { loginPost.call(ctx) });
        this.get('#/logout', logoutPage);

        this.get('#/create', createPage);
        this.post('#/create', (ctx) => { createPost.call(ctx) });

        this.get('#/edit/:id', editPage);
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx) });

        this.get('#/details/:id', detailsPage);

        this.get('#/delete/:id', deletePost);

    })

    app.run();

});