function scaleElement(min, max, delta, id, displayType){
    let element = document.querySelector(`#${id}`);
    element.style.display=displayType;
    element.style.transform=`scale(${min})`;
    let animate = setInterval(()=>{
        if(min >= 1) clearInterval(animate);
        element.style.transform=`scale(${min})`;
        min+=delta;
    }, 15);
}