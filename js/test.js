    
    document.querySelector("#add_etudiant").onclick=function () {
    document.querySelector("#form_app").classList.toggle("hide");    
    }

    function animeOn(){
        document.querySelector("#app_load").classList.remove("hide");
    }
    function animeOff(){
        document.querySelector("#app_load").classList.add("hide");
    }

    function clearForm(){
       let form_add= document.querySelector('#form_add');
       form_add.querySelector('#idetudiant').value=" ";
       form_add.querySelector('#matricule').value=" ";
       form_add.querySelector('#nom').value=" ";
       form_add.querySelector('#telephone').value=" ";
    }

    function sendMessage(status, content){
        let str='';
        str= str + status.toUpperCase() + '\n';
        str= str + '============\n\n';
        str= str + content + '\n';
        alert(str);
    }

    function etudiantToHtml(xmlChild, i){

        let html='';
        html=html + '<tr class="element">';
            
            html=html + '<td>' + 'tyan'+ i  + '</td>';
            html=html + '<td>' + xmlChild.childNodes[0].textContent + '</td>';
            html=html + '<td>' + xmlChild.childNodes[1].textContent + '</td>';
            html=html + '<td>' + xmlChild.childNodes[2].textContent + '</td>';

            html=html + '<td class="options">';

                html=html + '<button class="update" id="'+ xmlChild.id +'">';
                html=html + 'Modifier';
                html=html + '</button> &nbsp';

                html=html + '<button class="delete" id="'+ xmlChild.id +'">';
                html=html + 'Supprimer';
                html=html + '</button>';

            html=html + '</td>';
        html=html + '</tr>';
        
        return html;
    }



    function edit(){
        let btn_update= document.querySelectorAll('#elements .update');
        let form_app= document.querySelector("#form_app");  
        let form_add= form_app.querySelector('#form_add');
        let idetudiant= 0;

        for(let i = 0;i< btn_update.length; i++){
            btn_update[i].onclick= function(){
                form_app.classList.remove("hide");
                idetudiant= parseInt(this.getAttribute('id'));

                let xhttp = new XMLHttpRequest();
                xhttp.open('GET','api/read.php?idetudiant='+ idetudiant, true);
                xhttp.send();

                xhttp.onload=function(){
                    let res= xhttp.responseXML;
                    let xmlRoot= res.documentElement;
                    let etudiant=xmlRoot.querySelector('etudiant');

                    form_add.querySelector('#idetudiant').value= idetudiant;
                    form_add.querySelector('#matricule').value= etudiant.querySelector('matricule').textContent;
                    form_add.querySelector('#nom').value= etudiant.querySelector('nom').textContent;
                    form_add.querySelector('#matricule').setAttribute('disabled',true);
                    form_add.querySelector('#telephone').value= etudiant.querySelector('telephone').textContent;
                }
            }
        }
    }



    function erase(){
        let btn_delete= document.querySelectorAll('#elements .delete');
        let idetudiant= 0;

        for(let i = 0;i< btn_delete.length; i++){
            btn_delete[i].onclick= function(){
                idetudiant= parseInt(this.getAttribute('id'));

                let xhttp = new XMLHttpRequest();
                xhttp.open('GET','api/delete.php?idetudiant='+ idetudiant, true);
                xhttp.send();

                xhttp.onload=function(){
                    let res= xhttp.responseXML;
                    let xmlRoot= res.documentElement;
                    let status =xmlRoot.querySelector('status').textContent;
                    let content =xmlRoot.querySelector('content').textContent;
                    
                    sendMessage(status,content);
                    readAll();
                    animeOff();
                }
            }
        }
    }



    function readAll(){

        let xhttp = new XMLHttpRequest();
        xhttp.open('GET','api/readall.php',true);
        xhttp.send();
         
        xhttp.onload=function(){
            let res= xhttp.responseXML;
            let xmlRoot= res.documentElement;

            let html='';
            
            for(let i= 0; i < xmlRoot.childNodes.length; i++){
                xmlChild= xmlRoot.childNodes[i];
                
                html= html + etudiantToHtml(xmlChild, i+1);
            }

            document.querySelector('#elements').innerHTML=html;
           
        erase();
        edit();
        
        }
        
            
    }

    setTimeout(() =>{
        animeOff(),
        readAll();
    },2000)

    
    //execute la fonction readAll apres chaque 5ss
    setInterval(readAll, 5000);
    
    document.querySelector('#form_add').onsubmit=function(){
        let form =new FormData(this);
        // let idetudiant=document.querySelector('#idetudiant').value;
        // console.log(idetudiant);
        let xhttp = new XMLHttpRequest();
        

        if(form.get('idetudiant') == null || form.get('idetudiant') == ""){
            xhttp.open('POST','api/create.php',true);
            xhttp.send(form);
            xhttp.onload=function(){
                let res= xhttp.responseXML;
                let xmlRoot= res.documentElement;
                let status =xmlRoot.querySelector('status').textContent;
                let content =xmlRoot.querySelector('content').textContent;
                clearForm();
               sendMessage(status, content);
               
               readAll();  
            }
        }else{
       
            xhttp.open('POST','api/update.php',true);
            xhttp.send(form);
            xhttp.onload=function(){
                let res= xhttp.responseXML;
                let xmlRoot= res.documentElement;
                let status =xmlRoot.querySelector('status').textContent;
                let content =xmlRoot.querySelector('content').textContent;

                document.querySelector('#matricule').removeAttribute('disabled');
                document.querySelector("#form_app").classList.toggle("hide");
                clearForm();
            sendMessage(status, content); 
            
            readAll();
            
        }
        // readAll();
        return false;
        
        }
    }
    