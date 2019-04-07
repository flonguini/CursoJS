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
            // Abre o painel
            this.el.panelEditProfile.addClass('open');
        });

        // Adiciona o evento de click no botão de adicionar novo contato
        this.el.btnNewContact.on('click', e => {
            // Fecha todos os paineis
            this.closeAllLeftPanel();
            // Ativa a exibição do painel
            this.el.panelAddContact.show();
            // Abre o painel
            this.el.panelAddContact.addClass('open');
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
        })


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