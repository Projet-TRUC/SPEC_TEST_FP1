class classCommande{

    constructor(){

    }

    createCommande(){

        //récupération des infos
        this.myProg = document.querySelector('input[name="Programmateur"]:checked').value;
        this.myAct = document.querySelector('input[name="Action"]:checked').value;
        this.MyHex = document.querySelector('input[name="HexFile"]');

        //formation commande
        if((this.myAct=="prog")||(this.myAct=="read"))
        {
            this.myCom = this.myAct+" "+this.myProg+" "+this.MyHex[0].name;
        }
        else this.myCom = this.myAct+" "+this.myProg;

        //un retour chariot au début
        var dtext = document.createElement("TEXT");
        dtext.innerHTML = "<br>";
        document.body.appendChild(dtext);

        //my beautiful commande
        var textcom = document.createElement("LABEL");
        textcom.innerHTML = "Commande envoyée = test_script.sh "+this.myCom;
        document.body.appendChild(textcom);

        //un retour chariot à la fin
        var ftext = document.createElement("TEXT");
        ftext.innerHTML = "<br>";
        document.body.appendChild(ftext);
    }

}