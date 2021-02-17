//Projet TRUC - Serveur de Test FP1
//Anthony TROUVE - DII5A 2020/2021 - EPU TOURS

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./Formulaire'));

app.get('/action', function (req, res) {

  //test récupération devices USB, ici une manette Microsoft Xbox 360 pour test.
  var usb = require('usb')
  //console.log(usb.getDeviceList())        //on affiche la liste de devices USB
  //console.log(usb.findByIds(1118, 654))   //on affiche uniquement la manette Microsoft Xbox360 (vendor = 1118 et product = 654, test fonctionnalités USB de Node.js)
  if(usb.findByIds(1118, 654) != undefined) //si on touve une manette de Xbox 360
  {
    console.log(`Manette Microsoft Xbox360 branchée`)
  }
  else
  {
    console.log(`Manette Microsoft Xbox360 non branchée`)
  }

  //test sélection d'un programmateur à compléter à minima avec des tests pour s'assurer de la cohérence du choix utilisteur avec le programmateur raccordé,
  //voire à remplacer par une sélection automatique en fonction du programmateur raccordé (diminution risque erreur de sélection).
  if ((req.query.Programmateur!="pk3") && (req.query.Programmateur!="pk4") && (req.query.Programmateur!="icd3"))
  {
    res.send('TU VAS LE PROGRAMMER AVEC TES DOIGTS LE MCU')
  }
  //si un programmateur a été choisi, est-ce le bon ?
  //si req.query.Programmateur == "pk3" && findByIds(Microchip ID, PICkit3 ID) == undefined alors avertir l'utilisateur (choix programmateur erroné)
  // ... idem pour PICkit4 et ICD3

  //OU élaboration automatique de l'information "programmateur" à inclure dans les commandes à lancer
  //si findByIds(Microchip ID, PICkit3 ID) != undefined alors mettre "pk3" pour le programmateur
  // ... idem pour PICkit4 et ICD3

  if(req.query.Action=="prog")
  {
    if(req.query.HexFile=="")
    {
      res.send('TOI DEVOIR SELECTIONNER FICHIER .HEX')
    }
    else
    {

      //CONTROLE EXTENSION .HEX

      //SI C'EST UN .HEX

      //console.log('Commande = test_script.sh ' + req.query.Action + ' ' + req.query.Programmateur + req.query.HexFile)
      res.send('Commande = test_script.sh ' + req.query.Action + ' ' + req.query.Programmateur + ' ' + req.query.HexFile)

      //TELECHARGEMENT FICHIER .HEX

      //UNE FOIS LE TELECHARGEMENT FINI

      const { exec } = require('child_process');
      var yourscript = exec('sh test_script.sh '+req.query.Action+' '+req.query.Programmateur+' '+req.query.HexFile, (error, stdout, stderr) => {
                        console.log(stdout);
                        console.log(stderr);
                        if (error !== null) {
                          console.log(`exec error: ${error}`);
                        }
      });

    }

  }
  else if (req.query.Action=="read")
  {
    if(req.query.ReadReturnFile=="")
    {
      res.send('TOI DEVOIR RENSEIGNER UN NOM DE FICHIER')
    }
    else
    {
      //console.log('Commande = test_script.sh ' + req.query.Action + ' ' + req.query.Programmateur + req.query.ReadReturnFile)
      res.send('Commande = test_script.sh ' + req.query.Action + ' ' + req.query.Programmateur + ' ' + req.query.ReadReturnFile)

      const { exec } = require('child_process');
      var yourscript = exec('sh test_script.sh '+req.query.Action+' '+req.query.Programmateur+' '+req.query.ReadReturnFile, (error, stdout, stderr) => {
                        console.log(stdout);
                        console.log(stderr);
                        if (error !== null) {
                          console.log(`exec error: ${error}`);
                        }
      });

    }

  }
  else if (req.query.Action=="raz")  //alors on veut effacer
  {
    //console.log('Commande = test_script.sh ' + req.query.Action + ' ' + req.query.Programmateur)
    res.send('Commande = test_script.sh ' + req.query.Action + ' ' + req.query.Programmateur)

    const { exec } = require('child_process');
    var yourscript = exec('sh test_script.sh '+req.query.Action+' '+req.query.Programmateur, (error, stdout, stderr) => {
                      console.log(stdout);
                      console.log(stderr);
                      if (error !== null) {
                        console.log(`exec error: ${error}`);
                      }
    });

  }
  else
  {
    res.send('FAIS AU MOINS L\'EFFORT DE SELECTIONNER UN TRUC A FAIRE')
  }

});

app.listen(port, () => {
  console.log(`PROGTOUT2000 app listening at http://localhost:${port}`)
})
