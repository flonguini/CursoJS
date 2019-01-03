// Define a classe usuário
class User{

    // Construtor padrão da classe
    constructor(name, gender, birth, country, password, photo, admin, email){
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        this._email = email;
    }

    // #region Getters
    get id(){ return this._id; }
    get name(){ return this._name; }
    get gender(){ return this._gender; }
    get birth(){ return this._birth; }
    get country(){ return this._country; }
    get password(){ return this._password; }
    get photo(){ return this._photo; }
    get admin(){ return this._admin; }
    get register(){ return this._register; }
    get email(){ return this._email; }
    //#endregion

    // #region Setters
    set name(value){ this._name = value; }
    set gender(value){ this._gender = value; }
    set birth(value){ this._birth = value; }
    set country(value){ this._country = value; }
    set password(value){ this._password = value; }
    set photo(value){ this._photo = value; }
    set admin(value){ this._admin = value; }
    set register(value){ this._register = value; }
    //#endregion


    loadFromJSON(json){
        for(let name in json){

            switch(name){
                case '_register':
                    this[name] = new Date(json[name]); 
                    break;
                default:
                    this[name] = json[name]; 
            }
        }
    }

    getNewId(){
        if (!window.id){
            window.id = 0;
        } 

        id++;

        return id;
    }

    save(){

        let users = User.getUsersStorage();

        if(this.id > 0){
            users.map(u => {
                if(u._id== this.id){
                    u = this;
                }
                return u;
            });

        }else{
            this._id = this.getNewId();
            users.push(this);
            //sessionStorage.setItem("users", JSON.stringify(users)); // chave, valor
        }
        
        localStorage.setItem("users", JSON.stringify(users)); // chave, valor
    }

    static getUsersStorage(){
        let users = [];
    
        //if (sessionStorage.getItem("users")) {
        //    users = JSON.parse(sessionStorage.getItem("users"));
        //}
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;

    }
}