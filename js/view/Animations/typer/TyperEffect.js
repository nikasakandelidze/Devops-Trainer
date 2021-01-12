function typerEffect(text, idOfElement, speed) {
    let i = 0;
    if (i < text.length) {
        document.querySelector(`#${idOfElement}`).innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typerEffect(text.substr(1), idOfElement, speed), speed);
    }
}
