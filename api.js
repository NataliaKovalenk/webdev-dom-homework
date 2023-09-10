import { ButtonInputElement,loaderElement } from "./dom.js";
import { renderUsers } from "./render.js";

export const fetchPromise = () => {
    loaderElement.textContent = 'Подождите, комментарии загружаются...';
    return fetch('https://wedev-api.sky.pro/api/v1/:NataliaKov/comments', {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((responseUsers) => {
            const newComments = responseUsers.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: comment.date,
                    comment: comment.text,
                    countLikes: comment.likes,
                    isLiked: comment.isLiked,
                };
            })
            users = newComments;
            loaderElement.remove(users);
            renderUsers(users);
        });
}

export const fetchPromiseNew = (CommentInputElement,NameInputElement) => fetch('https://wedev-api.sky.pro/api/v1/:NataliaKov/comments', {
    method: "POST",
    body: JSON.stringify({
        text: CommentInputElement.value,
        name: NameInputElement.value,
        forceError: false,
    }),
})
    .then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error('мало символов');
        }
        else if (response.status === 500) {
            throw new Error('сервер упал');
        }
        else {
            throw new Error('пропал интернет')
        }
    })

    .then((responseUsers) => {
        return fetchPromise();
    })
    .then(() => {
        ButtonInputElement.disabled = false;
        ButtonInputElement.textContent = 'Написать';
        NameInputElement.value = "";
        CommentInputElement.value = "";
    })
    .catch((error) => {
        ButtonInputElement.disabled = false;
        ButtonInputElement.textContent = 'Написать';
        if (error.message === 'мало символов')
            alert('Введите не менее 3х символов');
        else if (error.message === 'сервер упал')
            alert('Кажется что-то пошло не так, попробуйте позже');
        else {
            alert('У вас пропал интернет. Попробуйте позже')
        }
        console.warn(error);
    })
export let users = []