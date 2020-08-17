import { getAll, createPost as apiCreate, checkResult, getPostById, editPost as apiEditPost, deletePost as apiDelete } from "../data.js";
import { showInfo, showError } from '../notifications.js';

export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        post: await this.load('./templates/posts/post.hbs')
    };

    const context = Object.assign({}, this.app.userData)

    if (this.app.userData.email) {
        const posts = await getAll();
        context.posts = posts;
    }

    this.partial('./templates/home.hbs', context);
}

export async function createPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };

    this.partial('./templates/home.hbs', this.app.userData);
}

export async function createPost() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };

    const post = {
        title: this.params.title,
        postCategory: this.params.category,
        content: this.params.content,
    }

    try {
        if (post.title.length < 2) {
            throw new Error('Title must be at least 2 characters long!')
        }
        if (post.postCategory.length < 2) {
            throw new Error('Category must be at least 2 characters long!')
        }
        if (post.content.length < 10) {
            throw new Error('Content must be at least 10 characters long!')
        }

        const result = await apiCreate(post)

        checkResult(result)

        showInfo('Post shared!');

        this.redirect('#/home');

    } catch (err) {
        showError(err.message);
    }

}

export async function editPage() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        post: await this.load('./templates/posts/post.hbs')
    };

    const post = await getPostById(this.params.id)
    const context = Object.assign({ post: post }, this.app.userData)
    this.partial('./templates/posts/edit.hbs', context);

}

export async function editPost() {
    const post = await getPostById(this.params.id)

    post.title = this.params.title;
    post.postCategory = this.params.category;
    post.content = this.params.content;

    try {
        if (post.title.length < 2) {
            throw new Error('Title must be at least 2 characters long!')
        }
        if (post.postCategory.length < 2) {
            throw new Error('Category must be at least 2 characters long!')
        }
        if (post.content.length < 10) {
            throw new Error('Content must be at least 10 characters long!')
        }

        const result = await apiEditPost(this.params.id, post)

        checkResult(post)

        showInfo('Post edited successfully!');

        this.redirect('#/home');

    } catch (err) {
        showError(err.message);
    }
}

export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
    };

    const post = await getPostById(this.params.id)
    const context = Object.assign({ post }, this.app.userData)

    this.partial('./templates/posts/details.hbs', context);
}

export async function deletePost() {
    const id = this.params.id;

    try {
        const result = await apiDelete(id);

        checkResult(result)

        showInfo('The post was deleted!');

        this.redirect(`#/home`);

    } catch (err) {
        showError(err.message);
    }
}