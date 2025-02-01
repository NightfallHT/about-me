import fetchData from "./fetching.js";
const forumAnchor = document.getElementById("forum-anchor");
fetchData("./../@data/forum_posts.json").then((posts) => {
    const postArr = posts;
    postArr.forEach((post) => {
        post.postedAt = new Date(post.postedAt);
        const forumEntry = document.createElement("table");
        const author = document.createElement("td");
        const postedAt = document.createElement("td");
        const message = document.createElement("td");
        author.innerText = post.anonymous ? "~anonymous" : post.username;
        postedAt.innerText = post.postedAt.toDateString() + ", on " + post.os;
        message.innerText = post.profile.message;
        forumEntry.classList.add("forum-post");
        author.classList.add("post-author");
        author.classList.add("text-dimmed");
        postedAt.classList.add("post-date");
        message.classList.add("post-content");
        let hsv = extractHSV(post.favColor);
        hsv[2] > 75 ? (hsv[2] /= 1.5) : 0;
        author.style.cssText = "color: " + `hsl(${hsv[0]}, ${hsv[1]}%, ${hsv[2]}%)`;
        forumEntry.appendChild(author);
        forumEntry.appendChild(message);
        forumEntry.appendChild(postedAt);
        forumAnchor?.appendChild(forumEntry);
    });
});
function extractHSV(hsvString) {
    let hsl_str = hsvString.split(",");
    let hsl = [];
    hsl[0] = parseInt(hsl_str[0].split("(")[1]);
    hsl[1] = parseInt(hsl_str[1].split("%")[0]);
    hsl[2] = parseInt(hsl_str[2].split("%")[0]);
    return hsl;
}
function hsv_to_hsl(h, s, v) {
    var l = ((2 - s) * v) / 2;
    if (l != 0) {
        if (l == 1) {
            s = 0;
        }
        else if (l < 0.5) {
            s = (s * v) / (l * 2);
        }
        else {
            s = (s * v) / (2 - l * 2);
        }
    }
    return [h, s, l];
}
