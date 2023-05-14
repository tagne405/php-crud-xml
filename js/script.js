// let form =document.querySelector("#form_add");
// form.style.display="none"
// function hideBody(){
//     let btn=document.querySelector("#add_etudiant");

//     if(form.classList.toggle("showMenu")){
//         form.style.display="none";
//     }else{
//         form.style.display="block";
//     }
// }

// function hideBody(){
    // let btn=document.querySelector("#add_etudiant");
    // let form =document.querySelector("#form_add");
    // btn.addEventListener("click",()=>{
    //     form.classList.toggle("hide");
    // })
// }

    document.querySelector("#add_etudiant").onclick=function () {
    document.querySelector("#form_app").classList.toggle("hide");    
    }
    

    //un childNode corespond a un Etudiant et ce meme etudiant comporte des balise dils xmlChild
    
    // function request(method, url, params){
    //     let xhttp = new XMLHttpRequest();
    //     xhttp.open(method,url,true);
    //     xhttp.send(params);
        
    //     xhttp.onload=function(){
    //         let res= xhttp.responseXML;
    //         let xmlRoot= res.documentElement;
    //         console.table(xmlRoot);
    //         return xmlRoot.childNodes;
    //     }
    // }

    function sendMessage(status, content){
        let str='';
        str= str + status.toUpperCase() + '\n';
        str= str + '============\n\n';
        str= str + content + '\n';
        alert(str);
    }

    function etudiantToHtml(xmlChild){
        let html='';
        html=html + '<tr class="element">';
            
            html=html + '<td>' + xmlChild.id + '</td>';
            html=html + '<td>' + xmlChild.childNodes[0].textContent + '</td>';
            html=html + '<td>' + xmlChild.childNodes[1].textContent + '</td>';
            html=html + '<td>' + xmlChild.childNodes[2].textContent + '</td>';

            html=html + '<td class="options">';

                html=html + '<button class="update">';
                html=html + 'Modifier';
                html=html + '</button> &nbsp';

                html=html + '<button class="delete">';
                html=html + 'Supprimer';
                html=html + '</button>';

            html=html + '</td>';
        html=html + '</tr>';

        return html;
    }

    function readAll(){

        let xhttp = new XMLHttpRequest();
        xhttp.open('GET','api/readall.php',true);
        xhttp.send();
        
        xhttp.onload=function(){
            let res= xhttp.responseXML;
            let xmlRoot= res.documentElement;
            // console.table(xmlRoot);

            let html='';
        for(let i= 0; i < xmlRoot.childNodes.length; i++){
            xmlChild= xmlRoot.childNodes[i];
            html= html + etudiantToHtml(xmlChild);
        }

        document.querySelector('#elements').innerHTML=html;

            // return xmlRoot.childNodes;
        }
        
    }


    readAll();

    
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

            //    sendMessage(status, content);
    
              readAll();
            }
        }
        return false;
        
    }



    // function saveAll($matricule, $nom, $telephone){
    //     let xhttp = new XMLHttpRequest();
    //     xhttp.open('GET','api/create.php',true);
    //     xhttp.send();

    //     xhttp.insert=function(){
    //         let ins=xhttp.send;
                
    //     }
    // }

    // saveAll();