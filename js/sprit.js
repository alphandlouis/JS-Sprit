let front = 1; //mouvement vers le haut
let back = 1; //mouvement vers le bas
let left = 1; //mouvement vers la gauche
let right = 1; //mouvement vers la droite
let positionX = 0; //position de départ X
let positionY = 0; //position de départ Y
const BACK = 40; //code des touches du clavier pour la flèche du bas
const FRONT = 38; //code des touches du clavier pour la flèche du haut
const LEFT = 37; //code des touches du clavier pour la flèche de gauche
const RIGHT = 39; //code des touches du clavier pour la flèche de droite
const speed = 5; //initialisation de la vitesse de déplacement du perso
let mapIndex = 1; //index de départ choix de map
let perso = document.getElementById('perso'); //on récup la div du personnage dans notre html
let map = document.getElementById('map'); //on récup la div de la map dans notre html
let resultMap = document.getElementById('resultMap');


//fonction qui va génerer notre map mapper=le tableau de map.js, index c'est mapIndex, mode: start ou end
function createMap(mapper, index, mode) {
    //si c'est en mode start
    if(mode === "start"){
        //initialisation de position de départ X et Y avec mapper et index
        positionX = mapper[index].start[0];
		positionY = mapper[index].start[1];
    //sinon
    }else{
        //initialisation de position de fin X et Y avec mapper et index
        positionX = mapper[index].end[0];
		positionY = mapper[index].end[1];
    }   
    //attribution de la position du perso en fonction des position X et Y (le perso est en absolute (donc top et left))
    perso.style.top = positionY+"px";
	perso.style.left = positionX+"px";
    //création d'une balise html table (on peut concaténer tout le table)
    let html = "<table>" // let table = document.createElement("table")
    //boucle qui va parcourir mapper[index]
    for(let row = 0; row < mapper[index].map.length; row++){
        //création de tr (lignes)
        html += "<tr>" // let tr = document.createElement("tr")
        //boucle qui va parcourir les index de mapper[index]
        for(let column = 0; column < mapper[index].map[row].length; column++){
            //condition qui va attribuer selon les chiffre sur mapper si c'est de l'herbe un rocher un block ou de l'eau ou sortie
	        //class grass, water,block, rock, out 0 pour l'herbe, 3 pour rock, 2 pour block , 1 pour water et c'est 4 et 5 pour entrée/sortie SWITCH qui va rajouter un td (colonne)
	        switch(mapper[index].map[row][column]) {
	            case 0:
	                html += "<td class='grass'>"; // td.classlist.add('grass') 
	            break;
	            case 1:
	                html += "<td class='water'>"; // td.classlist.add('water')
	            break;
	            case 2:
	                html += "<td class='rock'>"; // td.classlist.add('rock')
	            break;
	            case 3:
	                html += "<td class='block'>"; // td.classlist.add('block')
	            break;
	            case 4:
	            case 5:
	                html += "<td class='out'>"; // td.classlist.add('out')
	            break;
	        }
        }   
	    //on oubli pas de fermer le tr
	    html += "</tr>" // tr.appenchild(td)
    }	    
	//on ferme la balise table
	html += "</table>" // table.appenchild(tr)
	//on injecte dans le html        
    resultMap.innerHTML = html // resultMap.appenchild(table)
}

//fonction de gestion de déplacement de notre personnage sur notre map
function movePerso(event) {
    //condition sur les touches appuyées du claviers si ça ne fonctionne pas event.key et "ArrowBack", "ArrowFront", "ArrowLeft", "ArrowRight" SWITCH
    switch (event.keyCode) {
        
        //si c'est la touche du bas
        case BACK:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers le bas de 1 back
            back++
            //on limite à 9 au dizieme back retourne à 1
            if(back > 9){
                back = 1
            }
            
            //on ajoute la classe positionFace et le numéro back qui va nous mettre la bonne image
            perso.classList.add("positionFace-"+back)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, BACK)){
                //changement de la position Y
                positionY += speed
                //on modifie la position dans le css (top)
                perso.style.top = positionY + "px"
            }
               
                
        break;
        //si c'est la touche du haut
        case FRONT:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers le haut de 1
            front++
            //on limite à 9 au dizieme on retourne à 1 front
            if(front > 9){
                front = 1
            }
            
            //on ajoute la classe positionFace et le numéro front qui va nous mettre la bonne image
            perso.classList.add("positionBack-"+front)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, FRONT)){
                //changement de la position Y
                positionY -= speed
                //on modifie la position dans le css (top)
                perso.style.top = positionY + "px"
            }
            
        break;        
        //si c'est la touche de gauche
        case LEFT:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers la gauche de 1
            left++
            //on limite à 9 au dizieme on retourne à 1 left
            if(left > 9){
                left = 1
            }
            //on ajoute la classe positionFace et le numéro left qui va nous mettre la bonne image
            perso.classList.add("positionLeft-"+left)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX,positionY, mapper, LEFT)){
                //changement de la position X
                positionX -= speed
                //on modifie la position dans le css (left)
                perso.style.left = positionX + "px"
            }
                
                
        break;       
        //si c'est la touche de droite
        case RIGHT:
            //on initialise une chaine de charactère vide au className du perso
            perso.className = "";
            //on incrémente vers la droite de 1 
            right++
            //on limite à 9 au dizieme on retourne à 1 right
            if(right > 9){
                right = 1
            }
            //on ajoute la classe positionFace et le numéro right qui va nous mettre la bonne image
            perso.classList.add("positionRight-"+right)
            //si la position est ok (appel de la fonction isValidatePosition)
            if(isValidatePosition(positionX, positionY, mapper, RIGHT)){
                //changement de la position X
                positionX += speed
                //on modifie la position dans le css (left)
                perso.style.left = positionX + "px"
            }
        break;
    }      
}


//fonction de limitation de l'espace ou le personnage peut aller (éviter l'eau, le rocher) //mode correspond aux fleches appuyée
function isValidatePosition(positionX, positionY, mapper, mode) {
    
    //on initialise un index X et Y à 0
    let indexX = 0
    let indexY = 1
    //condition qui vérifie quel touche fleche il a appuyé switch
    //attribution de index X et Y calculé selon la position demandé par l'utilisateur
    //L'image du perso n'est pas parfaitement centrée par rapport à son cadre (voir le border red) c'est pour ça que j'ai calculé pour que l'on bloque lorsque l'image du perso touche vraiment
    switch (mode) {
        case BACK:
            indexX = parseInt((positionY + 40) / 60);
            indexY = parseInt((positionX + 30) / 60);
        break;
        case FRONT:
            indexX =  parseInt((positionY + 0) / 60);
            indexY = parseInt((positionX + 30) / 60);
        break;
        case LEFT:
            indexX = parseInt((positionY + 30) / 60);
            indexY =  parseInt((positionX + 20) / 60);
        break;
        case RIGHT:
            indexX = parseInt((positionY + 30) / 60); 
            indexY =  parseInt((positionX + 40) / 60); 
        break;
    }
    
    //récupération de la position indexX et indexY sur la propriété map de mapper qu'on stock dans une let type
    let type = mapper[mapIndex].map[indexX][indexY]
    //si type est 5
    if(type === 5){
        //on incrémente mapIndex (pour passer à la map suivante)
        mapIndex++
        //si mapIndex est plus grand ou egal au nombre de map
        if(mapIndex >= mapper.length){
            // on repart à l'index 0
            mapIndex = 0
        }    
        //appel de la fonction createMap en mode start
        createMap(mapper, mapIndex, "start")
    //sinon si type est 4
    }else if(type === 4){
        //on décrémente mapIndex
        mapIndex--
        //si mapIndex ets inférieur à 0 donc arrivé en dessous du premier index
        if(mapIndex < 0){
            //mapIndex repart au dernier index
            mapIndex = mapper.length - 1
        }
        //appel de la fonction createmap en mode end
        createMap(mapper, mapIndex, "end")
    //sinon si type est 0
    }else if(type === 0){
        //on retourne le booléen true
        return true;
    //sinon
    }else{
        //on retourne false
        return false;
    }     
}

//gestionnaire d'évenements
    
    //initialisation de la map
    createMap(mapper, mapIndex, "start")
    //gestion du boutton de direction appuyé sur le clavier
    document.addEventListener("keydown", movePerso)

