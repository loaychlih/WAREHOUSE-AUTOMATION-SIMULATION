import { grilleContainer } from "./Grille.js";

const Ecran=document.getElementById("TravailCourant")
const container = document.getElementById("container");

//display the size current value
const inputSize = document.querySelector('#inputSize');
const outputSize = document.querySelector('.inputSize-output');
outputSize.textContent = inputSize.value;

inputSize.addEventListener('input', function() {
    outputSize.textContent = inputSize.value;
});

//display the frequency current value
const inputFrequency = document.querySelector('#inputFrequency');
const outputFrequency = document.querySelector('.inputFrequency-output');
outputFrequency.textContent = inputFrequency.value;

inputFrequency.addEventListener('input', function() {
    outputFrequency.textContent = inputFrequency.value;
});


//display the current value of kiva's number
const inputKivas = document.querySelector('#inputKivas');
const outputKivas = document.querySelector('.inputKivas-output');
outputKivas.textContent = inputKivas.value;

inputKivas.addEventListener('input', function() {
    outputKivas.textContent = inputKivas.value;
});



//The main fonction
function main()
{
    document.getElementById("Click").onclick = function makeRows(rows, cols) {
    
    rows=parseInt(document.getElementById("inputSize").value)
    cols=parseInt(document.getElementById("inputSize").value)

    //create the grids of the container
    grilleContainer(rows,cols,container)

    while (Ecran.firstChild) { Ecran.removeChild(Ecran.firstChild); }

    //set a border for the grid size
    container.style.border=" 7px solid black"
    container.style.width="max-content"
    container.style.height="max-content"


    let nbrecaseinitiale=rows
    let nbre_kiva= parseInt(document.getElementById("inputKivas").value)
      if (nbre_kiva>nbrecaseinitiale)
        {
            alert("Attention!\nPour avoir ce nombre de robot il faut un plus grand warehouse")
        }
    else{
    //fonction pour colorier les objets
    const fils = Array.from(container.children)

    function colormagasinier(element){
        setInterval(() => {
            element.style.backgroundColor='orange'
        }, 10);
    }
    function changepacket(element){
        element.style.background='blue'
    }
    function changekiva_free(element){                  
        element.style.backgroundColor='red'
    }
    function changekiva_busy(element){                  
        element.style.backgroundColor='green'
    }
    function change(element){        //enlever la trace
        element.style.backgroundColor=""
    }

    function randomplace(min,max){ //random places 
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    function chage_collision(element){
        element.style.backgroundColor='black'
    }
    //fonction qui retourn les abscices et ordonnés de chaque position 
    function abscourt(z){return z%(nbrecaseinitiale)}
    function ordcourt(z){return ~~ (z/(nbrecaseinitiale))}

    var frequency= parseInt(document.getElementById("inputFrequency").value)       
    let kivas=[]
    let indexespacket=[]
    let indexesmagasinier=[]
    let abspacket=[]
    let ordpacket=[]
    let tabmagasinier=[(rows-1),(rows-1)*(rows+1)-2,(rows-1)*(rows+1)-(rows-3)]  
    var arr = Array.from(Array(nbre_kiva), () => new Array(nbre_kiva));
    let f=0
    let packet 
    let magasinier  
    let x 
    let index_kiva_initiale
    let j
    let cpt
    
    for(let i=0;i<nbre_kiva;i++){
         j=0
        while(j<(rows-1)*(rows+1)){
            if(abscourt(j)==0){changekiva_free(fils[j])}
            j=j+rows
        }
        //les fonctionnalité de mes kivas 
        kivas[i]={
            

                    indexpackets:function(){    //obtenir la position du packet considéré
                    this.indexpacket=randomplace(0,(rows-1)*(rows+1))
                    console.log(this.indexpacket)
                    return this.indexpacket
                    },
                    indexmagasiniers:function(){        //la position du magasinier
                        this.indexmagasinier=tabmagasinier[randomplace(0,2)]
                        return this.indexmagasinier
                    }, 
                    //Fonction de déplacement de chaque robot
                    move:function(indexpacket,indexmagasinier,cpt){
                            packet =fils[indexpacket];
                            magasinier = fils[indexmagasinier]; 
                            changepacket(packet);
                            colormagasinier(magasinier);
                            x = Math.trunc(indexpacket/(nbrecaseinitiale))
                            index_kiva_initiale=x*(rows)
                            changekiva_busy(fils[index_kiva_initiale])
                            let absmagasinier = abscourt(indexmagasinier);
                            let ordmagasinier = ordcourt(indexmagasinier);
                            let abspacket = abscourt(indexpacket);
                           
                            let indcour
                            cpt=250
                             j=0

                            for(let z=index_kiva_initiale;z<=indexpacket;){
                                
                             
                                arr[i][j]=z
                                task(z,cpt);
                                j++
                                cpt=cpt+frequency ;                                  
                                z++;
                            }
                
                            if (absmagasinier>=abspacket){                                          
                                indcour=indexpacket                                          
                                while (abscourt(indcour)<absmagasinier){
                                   if(indcour+1!=indexmagasinier) {arr[i][j]=indcour+1; j++}
                                    taskabsp(indcour,cpt)
                                   
                                    cpt=cpt+frequency
                                    indcour=indcour+1
                                    }
                            }
                            else{
                                indcour=indexpacket
                                if(absmagasinier<abspacket){         
                                    let m=0                                                  
                                    while (abscourt(indcour)>absmagasinier){
                                        if(indcour-1!=indexmagasinier){arr[i][j]=indcour-1; 
                                            if(i>0){
                                            let z=i-1
                                            while(z>-1){
                                                
                                            if(arr[i][j]==arr[z][j]){if(m==0){collision(arr[i][j],100);m++};cpt=cpt+i*frequency;} 
                                                ;z--}}; j++}
                                       
                                        taskabsm(indcour,cpt,indexmagasinier)
                                        cpt=cpt+frequency
                                        indcour=indcour-1
                                    }
                                }
                            } 
                            if (indcour<indexmagasinier){
                                let coll=0
                               
                                let m=0
                                for(let z=indcour;z<indexmagasinier;z=z+rows){
                                    if(z!=indcour) {arr[i][j]=z; if(i>0){
                                        let b=i-1
                                        while(b>-1){
                                           
                                           if(arr[i][j]==arr[b][j]){if(m==0){collision(arr[i][j],100);m++};coll=1;}
                                                                            
                                            ;b--}};
                                        

                                        
                                            
                                            j++}
                                                   
                                } 
                                    
                                let x=0 
                                
                                for(let z=indcour;z<indexmagasinier;z=z+rows){
                                    if(coll==1) {
                                        if(x==0){
                                            console.log('marche')
                                            task(indcour+1,cpt);
                                            cpt=cpt+i*frequency
                                            x++
                                            taskabsm(indcour+1,cpt,indexmagasinier)
                                            z=indcour-rows
                                        }
                                        else{taskordp(z,cpt,indexmagasinier)}
                                        cpt=cpt+frequency
                                     }
                                    else{taskordp(z,cpt,indexmagasinier); cpt=cpt+frequency}
                                    }
                                }       
                            else{
                            let e =indcour
                            while(ordcourt(e)!=ordmagasinier){
                                if(e!=indcour) {arr[i][j]=e; if(i>0){
                                    let z=i-1
                                    while(z>-1){
                                        
                                    if(arr[i][j]==arr[z][j]){collision(arr[i][j],100);cpt=cpt+i*frequency;}
                                        ;z--}}; j++}
                                        
                            taskordm(e,cpt,indexmagasinier)
                            
                            cpt=cpt+frequency
                            e=e-(rows)      
                                    }
                            
                            }
                        f=cpt
                        
                                              
                        },  retour:function(index_kiva_initiale,etat_initiale,indexpacket){

                            let z=index_kiva_initiale
                                
                                
                                arr[i][j]=z
                                task_retour(z,f);
                                j++
                                f=f+frequency ;                                  
                                
                                if (ordcourt(z)==ordcourt(etat_initiale)){
                                    while(z!=etat_initiale){
                                        taskabsm_retour(z,f,etat_initiale);
                                        if(z!=index_kiva_initiale){arr[i][j]=z;j++};
                                        z--;
                                        f=f+frequency}
                                }
                                else{
                                    if(etat_initiale<z){
                                    while(ordcourt(z)!=ordcourt(etat_initiale)){
                                    taskordm(z,f);
                                    if(z!=index_kiva_initiale){arr[i][j]=z;j++};
                                    z=z-rows;
                                    f=f+frequency
                                        
                                    }}
                                    if(etat_initiale>z){
                                        while(ordcourt(z)!=ordcourt(etat_initiale)){
                                            taskordp(z,f);arr[i][j]=z;j++;z=z+rows;f=f+frequency}}
                                    
                                    if(indexpacket>z){ while(indexpacket!=z){taskabsp(z,f);arr[i][j]=z;j++;z++;f=f+frequency;console.log('normale')}}
                                    if(indexpacket<z){ while(indexpacket!=z){taskabsm_retour(z,f,etat_initiale);arr[i][j]=z;j++;z--;f=f+frequency;console.log('rje3')}}
                                    while(abscourt(etat_initiale)!=abscourt(z)){taskabsm_retour(z,f,etat_initiale);arr[i][j]=z;j++;z--;f=f+frequency;}
                                
                                }
                


                            
                        }
                        
                }
            }
    
         console.info(arr)  
         //le tableau 2 contient les indexes des magasiniers 
         
      
    //les fonctions de mouvements            
    function task(i,cpt) {
                setTimeout(function() { 
                    if(i!=tab2[0]&& i!=tab2[1] && i!=tab2[2]){setTimeout(changekiva_busy(fils[i]))}             
                    if(abscourt(i)!=0 && i-1!=tab2[0] && i-1!=tab2[1] && i-1!=tab2[2]){setTimeout(change(fils[i-1]))}
                    }, cpt);                      
                } 
                function task_retour(i,cpt) {
                    setTimeout(function() { 
                        changekiva_busy(fils[i])          
                        
                        }, cpt);                    
                    } 
        
        
                function taskabsp(i,cpt) {          //dir wahd cpt ila kounti f les valeur l kbar n9shoum bach tb9a speed whda 
                    setTimeout(function() {
                        if(i!=tab2[0]-1&& i!=tab2[1]-1 && i!=tab2[2]-1){changekiva_busy(fils[i+1])}
                        if( i-1!=tab2[0]-1 && i-1!=tab2[1]-1 && i-1!=tab2[2]-1){change(fils[i],i)};
                        
                        },cpt);
                    }
                function taskabsm(i,cpt,indexmagasinier) {
                    setTimeout(function() {
                       
                       if(i!=indexmagasinier+1){ changekiva_busy(fils[i-1]) }                             
                        change(fils[i])
                    
                        }, cpt); 
                }
                function taskabsm_retour(i,cpt,etat_initiale) {
                    setTimeout(function() {
                       
                        if(i-1!=tab2[0]&& i-1!=tab2[1] && i-1!=tab2[2]){ changekiva_busy(fils[i-1]) }
                        if(i-1==etat_initiale) {changekiva_free(fils[i-1])}                              
                        if( i!=tab2[0] && i!=tab2[1] && i+1!=tab2[2]) change(fils[i])
                    
                        }, cpt); 
                }
                function taskordp(i,cpt,indexmagasinier) {   
                    setTimeout(function() {
                    if(i!=indexmagasinier-rows){setTimeout(changekiva_busy(fils[i+rows]))}
                    setTimeout(change(fils[i]));    
                    if(i!=indexmagasinier-rows){setTimeout(changekiva_busy(fils[i+rows]))}                                               
                    }, cpt);                                   
                }
                function taskordm(i,cpt,indexmagasinier) {   
                    setTimeout(function() {                             
                        if(i!=indexmagasinier+rows){ setTimeout(changekiva_busy(fils[i-(rows)]),)}
                    setTimeout(change(fils[i]),);                        
                    }, cpt)
                }
                function collision(i,cpt){
                    setTimeout(function() {                             
                        chage_collision(fils[i])
                                          
                    }, cpt)

                }
                

                //creation des mes objets KIVA
                
              
            for(let i=0;i<nbre_kiva;i++){
                    indexesmagasinier[i]=kivas[i].indexmagasiniers()
                    indexespacket[i]=kivas[i].indexpackets()
                    abspacket[i] = abscourt(indexespacket[i])
                    ordpacket[i] =  ordcourt(indexespacket[i])

    
                    

                    //partie condition 
                     j=0
                    while(j<i){
                        while(ordpacket[i]==ordpacket[j] ||indexesmagasinier[j]==indexespacket[i]||abscourt(indexespacket[i])==0){
                                    indexespacket[i]=randomplace(0,(rows-1)*(rows+1))
                                    ordpacket[i] =  ordcourt(indexespacket[i])
                                    abspacket[i] = abscourt(indexespacket[i])
                                    
                                }
                            j++
                        }
                       
                        console.log('l ord du kiva'+i+'est'+ordcourt(indexespacket[i]))
                        console.log((rows-1)*(rows+1))
                        x = Math.trunc(indexespacket[i]/(nbrecaseinitiale))
                        let etat_initiale =x*(rows)
                       
                        kivas[i].move( indexespacket[i],indexesmagasinier[i],250)
                        kivas[i].retour(indexesmagasinier[i]-1,etat_initiale, indexespacket[i])

                    


                }
          
               
                let tab1=[];
                let tab2=[]
                for(let i=0;i<nbre_kiva;i++){
                    tab1[i]=indexesmagasinier[i]
                    }
                for(let i=0;i<nbre_kiva;i++){
                    for( j=i+1;j<nbre_kiva;j++){
                        if (tab1[j]==tab1[i]){tab1[i]=0}
                    }
                }
         
                 j=0
                
         
                for(let i=0;i<nbre_kiva;i++){
                    if (tab1[i]!=0){ tab2[j]=tab1[i]; j++}
                }
       
                let tab3=[]
       
                //Affiche à l'ecran
       
                for(let i=0;i<nbre_kiva;i++){
                    let x = Math.trunc(indexespacket[i]/(nbrecaseinitiale))
                    let index_kiva_initiale=x*(rows)
                    let t=i+1
                    let k=ordcourt(index_kiva_initiale)+1
                    let p=indexespacket[i]+1
                    let m=indexesmagasinier[i]+1
                    tab3[i]='T'+t+':'+k+'>>'+p+'>>'+m
                }
               let i=0
                for (let c = 0; c <nbre_kiva; c++) {
                    var cell = document.createElement("div")
                    cell.style.backgroundColor="bisque"
                    cell.style.border="2px solid black"
                    Ecran.appendChild(cell).id = "grid-item"+c;
                    cell.textContent=tab3[i]
                    cell.style.textAlign="center"
                    i++
                }
        
       
       
    }
   
    }
}
 
main()
    
    







