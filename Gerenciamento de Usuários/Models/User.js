// Define a classe usuário
class User{

    // Construtor padrão da classe
    constructor(name, gender, birth, country, password, photo, admin){
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    // #region Getters
    get name(){ return this._name; }
    get gender(){ return this._gender; }
    get birth(){ return this._birth; }
    get country(){ return this._country; }
    get password(){ return this._password; }
    get photo(){ return this._photo; }
    get admin(){ return this._admin; }
    get register(){ return this._register; }
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


}