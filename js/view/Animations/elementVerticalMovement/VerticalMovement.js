function animateLeftPaddingOfElementWithId(id, min, max, delta, displayType){
    let element = document.querySelector(`#${id}`);
    element.style.position='relative';
    let leftPadding = min;
    element.style.display=displayType;
    let animate = setInterval(()=>{
        if(leftPadding <= max) clearInterval(animate);
        element.style.left=`${leftPadding}px`;
        leftPadding+=delta;
    }, 15);
}