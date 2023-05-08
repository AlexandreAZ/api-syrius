import { getRepository } from "typeorm";
import { Request, Response } from "express"; 
import { Modulos } from "../entity/Modulos";

export class ModuloController {
  private modulosRepository = getRepository(Modulos); 
  private modulos = {};
  private default = [];
  private horizontal = [];
  private compact = [];
  private futuristic = [];  
  private confs = [];
  private configuracoes = {};

  loadConfAdota(){ 
    this.confs.push(
    {
      id      : 'adotapetconf',
      title   : 'AdotaPet',
      subtitle: 'Configurações do Adota Pet',
      type    : 'collapsable',
      icon    : 'iconsmind:dog',
      children: [
        {
          id   : 'configuracoes.raca',
          title: 'Raça',
          type : 'basic',
            link : '/configuracoes/racas'
        },
        {
            id   : 'configuracoes.tiposdepet',
            title: 'Tipos de pet',
            type : 'basic',
            link : '/configuracoes/tiposdepet'
        },
        {
            id   : 'configuracoes.sexo',
            title: 'Sexo',
            type : 'basic',
            link : '/configuracoes/sexo'
        },
        {
            id   : 'configuracoes.pelagem',
            title: 'Pelagem',
            type : 'basic',
            link : '/configuracoes/pelagem'
        },
        {
            id   : 'configuracoes.porte',
            title: 'Porte',
            type : 'basic',
            link : '/configuracoes/porte'
        }
      ]
    })
  }

  loadConfOdonto(){
    this.confs.push(
      {
        id      : 'odontoConf',
        title   : 'Odonto',
        subtitle: 'Configurações do Odonto',
        type    : 'collapsable',
        icon    : 'iconsmind:dog',
        children: [
          {
            id   : 'configuracoes.odonto',
            title: 'Odo',
            type : 'basic',
              link : '/configuracoes/odonto'
          } 
        ]
      })
  } 

  loadOdonto(){
    this.default.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: []
    });

    this.horizontal.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: []
    });

    this.compact.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: []
    });

    this.futuristic.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: []
    });
  }

  loadAdotapet(){
    this.default.push(
    {
      id      : 'adotapets',
      title   : 'ADOTAPET',
      subtitle: 'Controle de adoção',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: [{
        id      : 'cadastros',
        title   : 'Cadastros',
        subtitle: 'Cadastros gerais',
        type    : 'collapsable',
        icon    : 'iconsmind:dog',
        children: [
            {
                id   : 'cadastro.pet',
                title: 'Pets',
                type : 'basic',
                link : '/adotapet/cadastro/pet'
            },
            {
                id   : 'cadastro.adotante',
                title: 'Adotantes',
                type : 'basic',
                link : '/adotapet/cadastro/adotante'
            },
            {
                id   : 'cadastro.parceiros',
                title: 'Parceiros',
                type : 'basic',
                link : '/adotapet/cadastro/parceiros'
            },
            {
                id   : 'cadastro.estabelecimentos',
                title: 'Estabelecimentos',
                type : 'basic',
                link : '/adotapet/cadastro/estabelecimentos'
            }
        ]
      },
      {
        id      : 'adocao',
        title   : 'Adoção',
        subtitle: 'Adoção de pet',
        type    : 'collapsable',
        icon    : 'iconsmind:black_cat',
        children: [
            {
                id   : 'adocao.adotar',
                title: 'Adotar',
                type : 'basic',
                icon : 'iconsmind:butterfly',
                link : '/adotapet/adocao/adotar'
            }
        ]
      }]
    });
    
    this.horizontal.push(
    {
      id      : 'adotapets',
      title   : 'ADOTAPET',
      subtitle: 'Controle de adoção',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: [
        {
            id      : 'cadastros',
            title   : 'Cadastros',
            subtitle: 'Cadastros gerais',
            type    : 'collapsable',
            icon    : 'iconsmind:cat',
            children: [
                {
                    id   : 'cadastro.pet',
                    title: 'Pets',
                    type : 'basic',
                    link : '/adotapet/cadastro/pet'
                },
                {
                    id   : 'cadastro.adotante',
                    title: 'Adotantes',
                    type : 'basic',
                    link : '/adotapet/cadastro/adotante'
                },
                {
                    id   : 'cadastro.parceiros',
                    title: 'Parceiros',
                    type : 'basic',
                    link : '/adotapet/cadastro/parceiros'
                },
                {
                    id   : 'cadastro.estabelecimentos',
                    title: 'Estabelecimentos',
                    type : 'basic',
                    link : '/adotapet/cadastro/estabelecimentos'
                }
            ]
        },
        {
          id      : 'adocao',
          title   : 'Adoção',
          subtitle: 'Adoção de pet',
          type    : 'collapsable',
          icon    : 'iconsmind:black_cat',
          children: [
              {
                  id   : 'adocao.adotar',
                  title: 'Adotar',
                  type : 'basic',
                  icon : 'iconsmind:butterfly',
                  link : '/adotapet/adocao/adotar'
              }
          ]
        }]
      },
    );

    this.compact.push(
    {
      id      : 'adotapets',
      title   : 'ADOTAPET',
      subtitle: 'Controle de adoção',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: []
    }); 

    this.futuristic.push(
    {
      id      : 'adotapets',
      title   : 'ADOTAPET',
      subtitle: 'Controle de adoção',
      type    : 'group',
      icon    : 'iconsmind:cat',
      children: []
    });  
  }

  loadConfiguracoes(){
     this.configuracoes = {
      id      : 'configuracoes',
      title   : 'CONFIGURAÇÕES',
      subtitle: 'Configurações gerais',
      type    : 'collapsable',
      icon    : 'feather:settings',
      children: this.confs
    };
  }

  async cliente(request: Request,  response: Response) { 
    try {
      
      var dir = request.params.cliente; 
      this.modulosRepository.metadata.tablePath = dir + "." + "MODULOS"; 
      this.modulosRepository.metadata.tableMetadataArgs.schema = dir  
      var modulos = await this.modulosRepository.find();  
 
      var resp = {}; 

      modulos.forEach(async element => {

        console.log(element['ENABLED'])

        if(element['NOME'] == 'ADOTAPET' && element['ENABLED'] == 1){ 
          this.loadAdotapet();  
          this.loadConfAdota();  
        }

        if(element['NOME'] == 'ODONTO' && element['ENABLED'] == 1){  
          this.loadOdonto();
          this.loadConfOdonto(); 
        } 
      }); 

      this.loadConfiguracoes(); 
      this.horizontal.push(this.configuracoes);
      this.default.push(this.configuracoes);

      this.modulos = {
         default: this.default,
         horizontal: this.horizontal,
         compact: this.compact,
         futuristic: this.futuristic
      };

      resp = this.modulos;  
      console.log(resp);
 
      if (!resp) return { message: "Modulo não encontrado." };
      return resp;
    } catch (error) {
      response.status(500).send(error); 
    }  
  } 

  getFirstPart(str) {
    return str.split('@')[0].toUpperCase();
  }
}
