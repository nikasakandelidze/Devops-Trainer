class FreestyleSessionStore {
    constructor() {
        this.session = new FreestyleSession();
    }

    setNewSession(){
        this.session = new FreestyleSession();
    }

    getSession(){
        return this.session;
    }
}