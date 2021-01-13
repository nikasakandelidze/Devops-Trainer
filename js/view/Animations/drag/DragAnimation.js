function makeItemWithIdDraggable(id) {
    let parentElement = document.querySelector('body');
    let element = document.querySelector(`#${id}`);
    let wasMouseDownPressed = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    parentElement.addEventListener('mousedown', e => {
        if (e.target === element) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            wasMouseDownPressed = true;
        }
    }, false);

    parentElement.addEventListener('mousemove', e => {
        if (wasMouseDownPressed) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            element.style.transform=`translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }, false);

    parentElement.addEventListener('mouseup', e => {
        if (wasMouseDownPressed) {
            wasMouseDownPressed = false;
            initialX = currentX;
            initialY = currentY;
        }
    }, false);
}


