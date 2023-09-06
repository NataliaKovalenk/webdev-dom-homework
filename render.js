import { ListCommentsElement } from "./dom.js";
import { Initlikes } from "./events.js";
import { newReplay } from "./events.js";

const addDate = (value) => {
  let nowDate = new Date(value);
  let time = {
    hour: 'numeric',
    minute: 'numeric',
  };
  let date = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return (nowDate.toLocaleDateString('ru', date) + ' ' + nowDate.toLocaleTimeString('ru', time));
};

export const renderUsers = () => {
    const usersHTML = users.map((user, index) => {
        return `<li data-index='${index}'class="comment">
        <div class="comment-header">
          <div>${user.name}</div>
          <div>${addDate(user.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${user.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.countLikes}</span>
            <button class="like-button ${user.isLiked ? '-active-like' : ''}" data-index='${index}'></button>
          </div>
        </div>
      </li>`;
    })
        .join("");

    ListCommentsElement.innerHTML = usersHTML;
    Initlikes();
    newReplay();
};
export const replaceValue = (value) => {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');

}
