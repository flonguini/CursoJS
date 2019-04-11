class WhatsAppController{

    constructor(){

        this.elementsPrototype();

        this.loadElements();

        this.initEvents();
    }

    /**
     * Carrega os elementos HTML
     */
    loadElements(){

        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
                this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    /**
     * Adiciona as funções a todos os elementos
     */
    elementsPrototype(){
        Element.prototype.hide = function(){

            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function(){

            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function(){

            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function(styles){
            for(let name in styles){
                this.style[name] = styles[name];
            }   
            return this;
        }

        Element.prototype.addClass = function (name){
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function (name){
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function (name){
            this.classList.toggle(name);
            return this;
        }

        Element.prototype.hasClass = function (name){
            return this.classList.contains(name);
        }

        // Retorna um novo FormData com todos os campos do formulario
        HTMLFormElement.prototype.getForm = function(){
            return new FormData(this);
        }

        // Retorna um novo FormData com todos os campos do formulario
        HTMLFormElement.prototype.toJSON = function(){
            
            // Cria um objeto JSON vazio
            let json = {};
            // Faz uma iteração no formulario e cria um json
            this.getForm().forEach((value, key) => {
                json[key] = value;
            });

            // Retorna o objeto json
            return json;
        }
    }

    /**
     * Inicializa os eventos dos botões
     */
    initEvents(){
        // Adiciona o evento de click no botão de editar perfil
        this.el.myPhoto.on('click', e => {
            // Fecha todos os paineis
            this.closeAllLeftPanel();
            // Ativa a exibição do painel
            this.el.panelEditProfile.show();
            // Adiciona um delay para correção da animação
            setTimeout(() => {
                // Abre o painel
                this.el.panelEditProfile.addClass('open');
            }, 300);
        });

        // Adiciona o evento de click no botão de adicionar novo contato
        this.el.btnNewContact.on('click', e => {
            // Fecha todos os paineis
            this.closeAllLeftPanel();
            // Ativa a exibição do painel
            this.el.panelAddContact.show();
            // Adiciona um delay para correção da animação
            setTimeout(() => {
                // Abre o painel
                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        // Adiciona o evento de click no botão de fechar em edição de perfil
        this.el.btnClosePanelEditProfile.on('click', e => {
            // Fecha o painel
            this.el.panelEditProfile.removeClass('open');
        });

        // Adiciona o evento de click no botão de fechar em nova conversa
        this.el.btnClosePanelAddContact.on('click', e =>{
            // Fecha o painel
            this.el.panelAddContact.removeClass('open');
        });

        // Adiciona evento de click na imagem de perfil
        this.el.photoContainerEditProfile.on('click', e =>{
            this.el.inputProfilePhoto.click();
        });

        // Adiciona evento de teclado no input de nome de contato
        this.el.inputNamePanelEditProfile.on('keypress', e=>{
            if (e.key == 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });

        // Configura click do nome de contato
        this.el.btnSavePanelEditProfile.on('click', e=> {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        });

        // Formulario de pesquisa de nova conversa
        this.el.formPanelAddContact.on('submit', e => {
            // Evita o refresh
            e.preventDefault();
            // Cria um novo formData com todos os campos do formulario
            let formData = new FormData(this.el.formPanelAddContact)
        });

        // Seleciona todos os controles de contatos e adiciona evento de click
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', e => {
                this.el.home.hide();
                this.el.main.css({display:'flex'});
            });
        });

        // Adiciona evento ao botão de anexar
        this.el.btnAttach.on('click', e=>{
            // Remove a propagação dos eventos
            e.stopPropagation();
            // Abre o menu
            this.el.menuAttach.addClass('open');
            // Fecha o menu quando ocorre clique fora do menu
            //bind passa para a função o elemento btnAttach
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        // Adiciona evento no botão de adicionar foto
        this.el.btnAttachPhoto.on('click', e =>{
            console.log('photo');
        });

        // Adiciona evento no botão de adicionar foto
        this.el.btnAttachCamera.on('click', e =>{
            console.log('Camera');
        });

        // Adiciona evento no botão de adicionar foto
        this.el.btnAttachDocument.on('click', e =>{
            console.log('Document');
        });

        // Adiciona evento no botão de adicionar foto
        this.el.btnAttachContact.on('click', e =>{
            console.log('Contact');
        });
    }

    /**
     * Fecha o menu de anexo
     */
    closeMenuAttach(e){
        // Remove o evento de click
        document.removeEventListener('click', this.closeMenuAttach);
        // Fecha o menu
        this.el.menuAttach.removeClass('open');
    }

    /**
     * Fecha os paineis abertos
     */
    closeAllLeftPanel(){
        // Fecha o painel de edição do perfil
        this.el.panelEditProfile.hide();
        // Fecha o painel de adicionar novo contato
        this.el.panelAddContact.hide();
    }
}