class SideMenuView {
    constructor() {
    }

    getGitFreestyleRouter() {
        document.querySelector('#freestyle_route');
    }

    addOnClickListenerToFreeStyleRouter(callbackFn){
        document.querySelector('#freestyle_route').addEventListener('click', callbackFn);
    }

    addOnClickListenerToTrainerRouter(callbackFn){
        document.querySelector('#trainer_route').addEventListener('click', callbackFn);
    }

}