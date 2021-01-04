class FreestyleSessionStore {
    constructor() {
        this.session = new Session();
    }

    setNewSession(){
        this.session = new Session();
    }

    getSession(){
        return this.session;
    }
}