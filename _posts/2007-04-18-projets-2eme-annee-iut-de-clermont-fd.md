---
id: 61
title: Projets 2éme année IUT de Clermont-Fd
date: 2007-04-18T16:50:20+02:00
author: remmel
layout: post
guid: http://www.remy-mellet.com/?p=61
permalink: /blog/61-projets-2eme-annee-iut-de-clermont-fd/
categories:
  - Studies
tags:
  - DUT
---
## Station Météo

La station météo utilise un microcontroller RENESAS et 6 capteurs. Ces capteurs pemettent de mesurer:[<img class="size-full wp-image-75 alignright" title="DSC02316" src="/wp-content/uploads/2007/04/DSC02316.jpg" alt="" width="275" height="206" />](/wp-content/uploads/2007/04/DSC02316.jpg)

  * La température
  * L'humidité
  * La pression atmosphérique
  * La vitesse du vent
  * La direction du vent
  * La quantité de pluie tombé

[<img class="alignright size-medium wp-image-81" title="meteo_tcltk" src="/wp-content/uploads/2007/04/meteo_tcltk-300x224.jpg" alt="" width="275" height="206" sizes="(max-width: 275px) 100vw, 275px" />](http://www.remy-mellet.com/wp-content/uploads/2007/04/meteo_tcltk.jpg)Ces données sont récupées par la station météo et envoyées par onde radio (ZigBee) à un PC. Ces données seront visualisable sous forme de courbes via un programme développé en Tcl/Tk.

[🖺 Rapport](/wp-content/uploads/2007/04/Rapport-Station-Météo.pdf)

TPs réalisé par groupe de deux en 2ème année d&#8217;info à l&#8217;IUT de Clermont-Ferrand.

## Client/Serveur pseudo IRC [C++]

Client et d&#8217;un Serveur IRC sous linux parlant le même langage (en objet). Quelque commande de la norme IRC ont été implémentée : &#8220;/join&#8221; , &#8220;/quit&#8221; , &#8220;/exit&#8221; , &#8220;/topic&#8221; et &#8220;/list&#8221; . Mais les deux programmes Client et Serveur ne respectent pas la norme IRC.

Le client est doté d&#8217;une interface graphique en ncurses.  
Le client peut se connecter sur 8 canaux maximum (peut etre modifié simplement (#define)) et change de canal avec les touches F3/F4

[🗜️ Code source](/wp-content/uploads/2011/04/TP_2.IRC.zip)

## Jukebox [C++]

Lecteur de musique sous linux gérant toutes vos musique en les classant par Artiste/Album ou par Artiste, Album ou Titre. L&#8217;interface graphique est réalisé a l&#8217;aide de QT 3.  
Le lecteur possede un visualisateur en 3D réalisé en openGL.  
Pour la lecteur des tags, le programme utilise taglib.  
Le son est géré par la librairie Fmod Ex.

[🗜️ Code source](/wp-content/uploads/2011/04/jb.zip)