window.$docsify = window.$docsify || {};
window.$docsify.plugins = window.$docsify.plugins || [];

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
        btn.className = "copy-btn";
        const img = document.createElement("img");
        img.src = "assets/copy.svg";
        img.alt = "Copy";
        img.className = "copy-icon";
        btn.appendChild(img);
        pre.appendChild(btn);
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(code.textContent || "").then(() => {
                img.src = "assets/success.svg";
                setTimeout(() => img.src = "assets/copy.svg", 1000);
            });
        });
    });
}
window.$docsify.plugins.push((hook, vm) => {
    hook.doneEach(addCopyButtons)
})
// setTimeout(addCopyButtons, 500)
