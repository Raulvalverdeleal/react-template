window.$docsify = window.$docsify || {};
window.$docsify.plugins = window.$docsify.plugins || [];

const icons = {
    copy: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>',
    success: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>',
}

function focusSearchInput() {
    document.body.classList.remove("close")
    const input = document.querySelector("input[type='search']")
    if (input) input.focus()
}

function toggleSideBar() {
    document.body.classList.toggle("close")
}


window.addEventListener("keydown", event => {
    switch (event.key) {
        case "k":
        case "K":
            if (event.metaKey || event.ctrlKey) {
                focusSearchInput()
            }
            break;
        case "b":
        case "B":
            if (event.metaKey || event.ctrlKey) {
                toggleSideBar()
            }
            break;
        default:
            break;
    }
})

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll("pre > code");
    codeBlocks.forEach(code => {
        const pre = code.parentElement;
        if (!pre) return;
        if (pre.querySelector(".copy-btn")) return;
        const btn = document.createElement("button");
        btn.setAttribute("data-text", "Copy code")
        btn.className = "copy-btn";
        const span = document.createElement("span");
        span.className = "copy-icon";
        span.innerHTML = icons.copy
        btn.appendChild(span);
        pre.appendChild(btn);
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(code.textContent || "").then(() => {
                span.innerHTML = icons.success;
                btn.setAttribute("data-text", "Success")
                setTimeout(() => {
                    span.innerHTML = icons.copy
                    btn.setAttribute("data-text", "Copy code")
                }, 1000);
            });
        });
    });
}
window.$docsify.plugins.push((hook, vm) => {
    hook.doneEach(addCopyButtons)
})