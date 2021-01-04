let sideMenuView = (function (){

    let getGitFreestyleRouter = () => document.querySelector('#freestyle_route');

    let addOnClickListenerToFreeStyleRouter = (callbackFn) => document.querySelector('#freestyle_route').addEventListener('click', callbackFn);
    let addOnClickListenerToTrainerRouter = (callbackFn) => document.querySelector('#trainer_route').addEventListener('click', callbackFn);

    return {
        getGitFreestyleRouter : getGitFreestyleRouter,
        addOnClickListenerToFreeStyleRouter : addOnClickListenerToFreeStyleRouter,
        addOnClickListenerToTrainerRouter : addOnClickListenerToTrainerRouter
    }
})();