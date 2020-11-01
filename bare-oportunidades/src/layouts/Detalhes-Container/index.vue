<template>
 <q-layout view="lHh Lpr lFf" style="overflow: hidden;">
   <q-header>
      <Toolbar>
        <q-tab  label="Voltar para Home" /> 
      </Toolbar>
   </q-header>
   
    <div id="title-detalhes">
        <label> {{vaga.titulo}} </label>
    </div>
    <div id="container-detalhes"> 
        <img src="~assets/img/marca-bare.oportunidades-02.svg"  height="200px" width="230px" />
        <section id="detalhes-emp-cont"> 
            <strong>EMPRESA:</strong> <label>{{vaga.razao_social}}</label>
            <strong>CEP:</strong> <label>{{vaga.cep}}</label>
        </section>
        <section id="detalhes-emp-cont2"> 
            <strong>CNPJ:</strong> <label>{{vaga.cnpj}}</label>
            <strong>FONE:</strong> <label>{{vaga.fone}}</label>
            
        </section>
    </div>
    <section id="cont-desc-vaga">
        <div id="">
            <strong> DESCRIÇÃO DA EMPRESA:</strong>
            <p> {{vaga.descricao_empresa}} </p>
        </div>
        <div id="">
            <strong> ATIVIDADES RESPONSABILIDADES:</strong>
            <p> {{vaga.atividades_responsabilidades}} </p>
        </div>
        <div id="">
            <strong> REQUISITOS:</strong>
            <p> {{vaga.requisitos}} </p>
        </div>
        <span id="btn-detalhes"> 
            
         <q-btn
          style="background:white; color:  #e65100;cursor:pointer"
          icon="keyboard_backspace"
          outline
        >
        
                <router-link to="/home-students"  style="text-decoration:none;cursor:pointer"><label style="color:#e65100;cursor:pointer">Voltar</label></router-link>
          
         </q-btn> 
        
        <q-btn  color="primary" label="Quero me Candidatar"/>
        </span>
    </section>
 </q-layout>   
</template>

<script>
import Toolbar from "../../components/Toolbar";
import { mapGetters } from "vuex";

export default {
    name:"detail",
    components:{Toolbar},
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters("vaga",{vaga:"getterVagaSelected"})
    }

}
</script>

<style>

#title-detalhes {
    margin-top: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    background-color:#e65100;
    color: white;
    font-size: 2rem;
    font-family: "Open Sans", "Helvetica",
}
#container-detalhes{
   background-color: #eee;
   margin: 2% 30%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   
}
#container-detalhes img { margin-left: 2%;}
#detalhes-emp-cont {
    flex-grow: 1;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
}
#detalhes-emp-cont2 {
    flex-grow: 1;
    margin-left: 2%;
    display: flex;
    flex-direction: column;
}
#cont-desc-vaga {
   margin: 2% 30%;
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
   flex-direction: column; 
}
#btn-detalhes{
    display:flex;
    justify-content:space-between;
    width: 300px;
}


</style>