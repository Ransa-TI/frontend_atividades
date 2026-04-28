const mat=document.getElementById("card");
function revelar(){
    mat.innerHTML=`<div id="card"class="bg-copa">
        <div class="d-flex flex-column align-items-center">       
            <div class="card" style="width: 22rem;" aria-hidden="true">
            <img src="_vinicius_junior.png" class="card-img-top" alt=" Copa">
            
                <div class="card-body"> 
                    <h5 id="Nome" class="card-title">
                        <span class="col-6">Vinícius José Paixão de Oliveira Júnior</span>
                        <span id="Rank" class="badge text-bg-secondary">9,5</span>
                    </h5>
                    <p class="card-text p">
                        <span id="Data_Nas"class=" col-4">12/07/2000 (25 anos)</span><br>
                        <span id="Altura"class=" col-4">1,76 m</span><br>
                        <span id="Posição "class=" col-6">Ponta-esquerda / Atacante</span><br>
                    </p>

                
                </div>
            </div>
                <a href="#" onclick="revelar()" tabindex="-1" class="btn btn-primary" style="margin: 10px; padding: 10px;">
                 Revelar 
                </a>
        </div>
    </div>`
}
