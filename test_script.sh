#!/bin/bash

#Projet TRUC - Script de test FP1

#emplacement du java à utiliser
JAVA='/opt/microchip/mplabx/v5.40/sys/java/zulu8.36.0.1-ca-fx-jdk8.0.202-linux_x64/jre/bin/java'

#emplacement du ipecmd.jar
IPECMD='/opt/microchip/mplabx/v5.40/mplab_platform/mplab_ipe/ipecmd.jar'

#MCU à programmer, pour l'instant uniquement le PIC24FJ128GA010
MCU='-P24FJ128GA010' #PIC24FJ128GA010

#Programmateurs à disposition
PICkit3='-TPPK3'
PICkit4='-TPPK4'
ICD3='-TPICD3'
#on peut les ranger dans un tableau
#PROGRAMMERS=($PICkit3 $PICkit4 $ICD3)
#récupération tableau complet : ${PROGRAMMERS[*]}, une case : ${PROGRAMMERS[0]}

#commandes disponibles pour IPECMD
PROG='-M -OL -F'
READ='-GF'
RAZ='-E'
#COM_IPE=($PROG $READ $RAZ)

emplacement=`pwd`    #pwd pour l'exemple

commande="$1"		#premier argument de la commande : la commande (prog, read, raz)
programmateur="$2"	#deuxième argument de la commande : le programmateur voul (pk3, pk4, icd3)
fichier="$3"		#troisième argument de la commande : le fichier à programmer / dans lequel enregistrer
#on peut imaginer une commande du type : script commande programmateur fichier
#exemple prog : script.sh prog pk3 monfichier.hex
#exemple read : script.sh read pk3 monfichier.hex
#exemple raz : script.sh raz pk3

#récupération de la commande et contrôle de base (non vide)
if [ -z $commande ]
then
echo 'mauvais arg1 prog/read/raz'
exit 1
elif [ $commande = "prog" ]
then
COM_FIN=$PROG
elif [ $commande = "read" ]
then
COM_FIN=$READ
elif [ $commande = "raz" ]
then
COM_FIN=$RAZ
else
echo 'mauvais arg1 prog/read/raz'
exit 1
fi

#récupération du programmateur et contrôle de base (non vide)
if [ -z $programmateur ]
then
echo 'mauvais arg2 pk3/pk4/icd3'
exit 1
elif [ $programmateur = "pk3" ]
then
PROG_FIN=$PICkit3
elif [ $programmateur = "pk4" ]
then
PROG_FIN=$PICkit4
elif [ $programmateur = "icd3" ]
then
PROG_FIN=$ICD3
else
echo 'mauvais arg2 pk3/pk4/icd3'
exit 1
fi

#contrôle sur le 3ième argument, si nécessaire
if [ "$COM_FIN" = "$PROG" ] #|| [ "$COM_FIN" = "$READ" ]
then
if [ -z $fichier ]
then
echo 'manque le fichier (arg3)'
exit 1
elif [ ! -f "$emplacement/$fichier" ]
then
echo 'le fichier n existe pas (dans ce répertoire, arg3)'
exit 1
fi
fi

#formation commande complète
if [ "$COM_FIN" = "$PROG" ] || [ "$COM_FIN" = "$READ" ]
then
commande_COMP="$JAVA -jar $IPECMD $MCU $PROG_FIN $COM_FIN\"$emplacement/$fichier\""
elif [ "$COM_FIN" = "$RAZ" ]
then
commande_COMP="$JAVA -jar $IPECMD $MCU $PROG_FIN $COM_FIN"
fi

#affichage de la commande complète formée, pour les tests
echo "exemple Commande = $commande_COMP"

#lancement ipecmd, en commentaire pour les tests
#if [ "$COM_FIN" = "$PROG" ] || [ "$COM_FIN" = "$READ" ]
#then
#$JAVA -jar $IPECMD $MCU $PROG_FIN $COM_FIN\"$emplacement/$fichier\"
#elif [ "$COM_FIN" = "$RAZ" ]
#then
#$JAVA -jar $IPECMD $MCU $PROG_FIN $COM_FIN
#fi



















