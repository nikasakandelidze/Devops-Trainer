function changeOpacity(min, max, delta, id){
    let element = document.querySelector(`#${id}`);
    element.style.opacity=min;
    let animate = setInterval(()=>{
        if(min >= max) clearInterval(animate);
        element.style.opacity=min;
        min+=delta;
    }, 5);
}