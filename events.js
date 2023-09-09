
import { renderUsers } from "./render.js";
import { fetchPromiseNew } from "./api.js";
import { NameInputElement,CommentInputElement,ButtonInputElement,commentDate,loaderElement} from "./dom.js";
import { users } from "./api.js";
import { replaceValue } from "./render.js";


let isReply = false;

export const Initlikes = (users) => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const like of likeButtons) {
        like.addEventListener('click', (event) => {
            event.stopPropagation();
            const user = users[like.dataset.index]
            console.log(user);
            if (user.isLiked === false) {
                user.isLiked = true;
                user.countLikes++;
            }

            else if (user.isLiked === true) {
                user.isLiked = false
                user.countLikes--;
            }
            renderUsers(users);
        });
    }
};
export const initClick = () => {
    ButtonInputElement.addEventListener("click", () => {
        const TextInputValue = isReply ? `QUOTE_BEGIN${CommentInputElement.value}QUOTE_END` : CommentInputElement.value;
        if (NameInputElement.value === '') {
            NameInputElement.classList.add('form-error');
            return;
        } else if (CommentInputElement.value === '') {
            CommentInputElement.classList.add('form-error');
            return;
        } else {
            users.push({
                name: replaceValue(NameInputElement.value),
                comment: replaceValue(TextInputValue)
                    .replaceAll('QUOTE_BEGIN', '<div class="quote">')
                    .replaceAll('QUOTE_END', '</div>'),
                date: `${commentDate.toLocaleDateString('numeric')} + ${commentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    }`,
                countLikes: 0,
                isLiked: false,
            })
        }
        ButtonInputElement.disabled = true;
        ButtonInputElement.textContent = 'Добавляю комментарий';
        loaderElement.textContent = '';
        fetchPromiseNew(CommentInputElement, NameInputElement);

    })
};


export const newReplay = () => {
    const replyComments = document.querySelectorAll(".comment");
    for (const replyComment of replyComments) {
        replyComment.addEventListener('click', () => {
            let index = replyComment.dataset.index;
            const originalText = `${users[index].name} : ${users[index].comment
                .replaceAll('<div class="quote">', '')
                .replaceAll('</div>', '')}`;
            CommentInputElement.value = originalText;
            isReply = true;
            renderUsers(users);
        })
    };
}

