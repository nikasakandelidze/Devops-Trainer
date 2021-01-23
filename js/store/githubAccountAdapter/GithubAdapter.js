class GithubAdapter{
    constructor() {
    }

    async getGithubInfo(){
        let response = await fetch('https://api.github.com/users/nikasakandelidze/repos\n');
        return await response.json();
    }

}