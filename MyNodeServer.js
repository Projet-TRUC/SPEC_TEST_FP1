//Projet TRUC - Serveur de Test FP1

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./Formulaire'));

app.get('/action', function (req, res) {

  if ((req.query.Programmateur!="pk3") && (req.query.Programmateur!="pk4") && (req.query.Programmateur!="icd3"))
  {
    res.send('TU VAS LE PROGRAMMER AVEC TES DOIGTS LE MCU')
  }

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
  else if (req.query.Action!="raz")  //alors on veut effacer
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
