let sessionStore = (function (){

    let session = new Session();

    let setNewSession = () => {
        sessionStore = new Session();
    }

    return {
        getSession : () => sessionStore
    }
})();