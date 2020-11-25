import knex from "../database/connection";
import IModelEmpresa from "../interfaces/IModelEmpresa";
import IModelVagas from "../interfaces/IModelVagas";


class EmpresaService {
  async insert(empresa: IModelEmpresa) {
    const begintransaction = await knex.transaction();

    const newEmpresa = await begintransaction("empresa")
      .insert(empresa);

    if (!newEmpresa) {
      begintransaction.rollback();
      return { success: false, error: newEmpresa };
    }

    begintransaction.commit();
    return { success: true, empresa: newEmpresa[0] };
  }

  async insertNovaOportunidade(vagas:IModelVagas) {
     const beginTransaction = await knex.transaction();

     const newOportunidade = await beginTransaction("vagas")
      .insert(vagas);

    if (!newOportunidade)  {
      beginTransaction.rollback();
      return {success: false, error: "Não foi possivel cadastrar a vaga!"};

    }
      
    beginTransaction.commit();
     
    return { success: true, vaga: newOportunidade[0] };

  }

  async getOportunidadesByEmpresa(id: Number) {
    try {
      const oportunidades = await knex("vagas")
        .select("*")
      .where('id_empresa', "=", id);
      
      return oportunidades;
    } catch (err) {
      return false;
    }
  }

  async getEmpresaById_Usuario(id: Number) {
    try {
      const empresa = await knex("empresa")
      .select("*")
      .where('id_usuario', "=", id);
      
      return empresa;
    } catch (err) {
      return false;
    }
  }

  async updateOportunidade(id: Number,vagas: IModelVagas) {
    const response = await knex("vagas")
      .where("id_empresa", '=', vagas.id_empresa)
      .where("id", '=', id)
      .update(vagas);
    
    if (!response) {
      return {success:false, error:response}
    }

    return {success: true, msg: "Atualização realizada!"}
  }

  async getEmpresas(){
    try {
      const empresas = await knex('empresa').select('*');
      return empresas;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getVagas(){
    try {
      const vagas = await knex('vagas')
        .select('empresa.*',"vagas.titulo", "vagas.id as id_vaga","vagas.atividades_responsabilidades","vagas.data_post", "vagas.requisitos","vagas.hora_post", "vagas.status")
        .innerJoin('empresa', 'empresa.id', 'vagas.id_empresa')
        .orderBy([{column: 'vagas.data_post',order:'desc'},{ column: 'vagas.hora_post',order: 'desc'}]);                               
      return vagas;
    } catch (error) {
      throw new Error(error.message)
    }
   
  }
  async getVagasByTitulo(titulo: string){
    try {
      titulo = `%${titulo}%`;
      const vagas = await knex('vagas')
          .select('empresa.*',"vagas.titulo", "vagas.id as id_vaga","vagas.atividades_responsabilidades","vagas.data_post", "vagas.requisitos","vagas.hora_post", "vagas.status")
          .innerJoin('empresa', 'empresa.id', 'vagas.id_empresa')
          .where('vagas.titulo', 'like', titulo)
          .orderBy([{column: 'vagas.data_post',order:'desc'},{ column: 'vagas.hora_post',order: 'desc'}]);
      return vagas;
    } catch (error) {
      throw new Error(error.message)
    }

  }

  async getVagasById(id: number){
    try {
      const vagas = await knex('vagas')
        .select('*').where({id}) .first()                              
      return vagas;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getStudentsByOportunity(id: number){
      const vaga = await this.getVagasById(id);
      
      const candidaturas = await knex('aluno').select('aluno.nome', 'aluno.telefone','aluno.sexo','aluno.registro_academico','usuario.email')
        .innerJoin('usuario','aluno.id_usuario','usuario.id')
        .join('selecoes_candidato', 'aluno.id','selecoes_candidato.id_aluno')
        .join('vagas','selecoes_candidato.id_vagas','vagas.id').where('vagas.id',id)
      
      return candidaturas;
  }

  async getEmpresaByid (id: number){
   
     try {
      const empresa =  await knex('empresa').select('*').where( { id } ).first();
      return empresa;
     } catch (error) {
      throw new Error(error.message)
     }
  }

  async  getStudentFavoriteEmpresa(id_aluno: any){
    try {
      const empresasFavoritas = await knex('empresa').select('empresa.id as id_empresa')
                                      .join('empresa_candidato_favorito','empresa.id','empresa_candidato_favorito.id_empresa')
                                      .where('empresa_candidato_favorito.id_aluno','=',id_aluno);
      return empresasFavoritas;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async  getAllStudentsByIdVaga(id_vaga: any){
    try {
      const alunosPorVagas = await knex('selecoes_candidato')
        .select('selecoes_candidato.*','aluno.*','usuario.email','faculdade.nome as faculdade')
        .join('aluno', 'aluno.id', 'selecoes_candidato.id_aluno')
        .join('usuario', 'aluno.id_usuario', 'usuario.id')
        .join('aprova_aluno', 'aluno.id', 'aprova_aluno.id_aluno')
        .join('faculdade','aprova_aluno.id_faculdade','faculdade.id')
        .where('selecoes_candidato.id_vagas', '=', id_vaga);
      
      return alunosPorVagas;
    } catch (error) {
      throw new Error(error.message);
    }
  }

   gerarPDF(candidatos: any, empresa: any, vagas: any, response: any) {
     const  Buffer = require('buffer').Buffer;
     const {Base64Encode} = require('base64-stream');
     const PDFDocument = require('pdfkit');
     const fs = require('fs');

     // Create a document
     const doc = new PDFDocument();

     // Pipe its output somewhere, like to a file or HTTP response
     // See below for browser usage
     let finalString = ''; // contains the base64 string
     const stream = doc.pipe(new Base64Encode());

     //Add an image
     doc.image(__dirname +'/../assets/img/bare_oportunidades.PNG', 15, 15, {width: 180}).moveDown();

     // Embed a font, set the font size, and render some text
     doc.fontSize(14)
         /** Dados da empresa*/
         .font('Courier-Bold', 14)
         .text('Empresa: ', 80, 100).moveDown()
         .font('Courier', 12)
         .text('Razão social: ' + empresa.razao_social, 100).moveDown()
         .text('Nome fantasia: ' + empresa.nome_fantasia).moveDown()
         .text('CNPJ: ' + empresa.cnpj).moveDown()
         .text('CEP: ' + empresa.cep).moveDown()
         .text('Fone: ' + empresa.fone).moveDown()
         .text('Descrição da empresa: ' + empresa.descricao_empresa, {
           align: 'justify',
           border: true
         }).moveDown()

         /** Dados da vaga*/
         .font('Courier-Bold', 14)
         .text('Vaga Oferecida: ', 80).moveDown()
         .font('Courier', 12)
         .text('Atividades: ' + vagas.atividades_responsabilidades, 100).moveDown()
         .text('Requisitos: ' + vagas.requisitos).moveDown()
         .text('Dada/Hora: ' + vagas.data_post + ' as ' + vagas.hora_post).moveDown()

         /** Dados dos canditados a vaga*/
         .font('Courier-Bold', 14)
         .text('Candidatos a vaga: ', 80).moveDown();

     candidatos.forEach((candidato: any) => {
       doc.fontSize(14)
           .font('Courier', 12)
           .text('Nome: ' + candidato.nome, 100)
           .text('Endereço: ' + candidato.endereco)
           .text('Sexo: ' + candidato.sexo)
           .text('CPF: ' + candidato.cpf)
           .text('Telefone: ' + candidato.telefone)
           .text('E-mail: ' + candidato.email)
           .text('Instituição: ' + candidato.faculdade)
           .text('Registro Academico: ' + candidato.registro_academico).moveDown()
     });

     // Finalize PDF file
     doc.end();

     stream.on('data', (chunk: any) => {
       finalString += chunk;
     });
     stream.on('end', function () {
       // the stream is at its end, so push the resulting base64 string to the response
       response.json(finalString);
     });
   }
}

export default EmpresaService;
