import API from './api.js';
import { beginRequest, endRequest } from './notifications.js';
const endpoints = {
    POSTS: 'data/posts',
    POST_BY_ID: 'data/posts/'
};

const api = new API(
    'B52C84E1-B64F-9163-FF4D-27BC97F76A00',
    'EAC671CE-89C8-4CA9-A09A-CB77C7ABC280',
    beginRequest,
    endRequest
);

export const login = api.login.bind(api)
export const register = api.register.bind(api)
export const logout = api.logout.bind(api)


export async function getAll() {
    return api.get(endpoints.POSTS);
}

export async function createPost(post) {
    return api.post(endpoints.POSTS, post);
}

export async function getPostById(id) {
    return api.get(endpoints.POST_BY_ID + id);
}

export async function editPost(id, post) {
    return api.put(endpoints.POST_BY_ID + id, post);
}

export async function deletePost(id) {
    return api.delete(endpoints.POST_BY_ID + id);
}

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result)
        throw error;
    }
}