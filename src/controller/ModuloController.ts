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
        icon    : 'iconsmind:bacteria',
        children:  [{
          id      : 'cadastros',
          title   : 'Cadastros',
          subtitle: 'Cadastros gerais',
          type    : 'collapsable',
          icon    : 'person',
          children: [
            {
              id   : 'cadastro.paciente',
              title: 'Paciente',
              type : 'basic',
              link : '/odonto/cadastro/paciente'
            },
            {
              id   : 'cadastro.fornecedores',
              title: 'Fornecedores',
              type : 'basic',
              link : '/odonto/cadastro/fornecedores'
            },
            {
              id   : 'cadastro.medicamentos',
              title: 'Medicamentos/Produtos',
              type : 'basic',
              link : '/odonto/cadastro/medicamentos'
            },
            {
              id   : 'cadastro.anamnese',
              title: 'Anamnese',
              type : 'basic',
              link : '/odonto/cadastro/anamnese'
            },
            {
              id   : 'cadastro.convenios',
              title: 'Convênios',
              type : 'basic',
              link : '/odonto/cadastro/convenios'
            },
            {
              id   : 'cadastro.especialidades',
              title: 'Especialidades',
              type : 'basic',
              link : '/odonto/cadastro/especialidades'
            },
            {
              id   : 'cadastro.profissional',
              title: 'Profissional',
              type : 'basic',
              link : '/odonto/cadastro/profissional'
            },
            {
              id   : 'cadastro.receituario',
              title: 'Receituário',
              type : 'basic',
              link : '/odonto/cadastro/receituario'
            }
          ]
          },
          {
            id      : 'prontuario',
            title   : 'Prontuário', 
            type    : 'basic',
            icon    : 'mat_solid:post_add',
            link : '/odonto/prontuario'
          },
          {
            id      : 'estoque',
            title   : 'Estoque', 
            type    : 'basic',
            icon    : 'mat_outline:production_quantity_limits',
            link : '/odonto/estoque'
          },
          {
            id      : 'relatorios',
            title   : 'Relatórios', 
            type    : 'basic',
            icon    : 'mat_solid:insert_chart_outlined',
            link : '/odonto/relatorios'
          }
        ]
      });

    this.horizontal.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:bacteria',
      children:  [{
        id      : 'cadastros',
        title   : 'Cadastros',
        subtitle: 'Cadastros gerais',
        type    : 'collapsable',
        icon    : 'person',
        children: [
          {
            id   : 'cadastro.paciente',
            title: 'Paciente',
            type : 'basic',
            link : '/odonto/cadastro/paciente'
          },
          {
            id   : 'cadastro.fornecedores',
            title: 'Fornecedores',
            type : 'basic',
            link : '/odonto/cadastro/fornecedores'
          },
          {
            id   : 'cadastro.medicamentos',
            title: 'Medicamentos/Produtos',
            type : 'basic',
            link : '/odonto/cadastro/medicamentos'
          },
          {
            id   : 'cadastro.anamnese',
            title: 'Anamnese',
            type : 'basic',
            link : '/odonto/cadastro/anamnese'
          },
          {
            id   : 'cadastro.convenios',
            title: 'Convênios',
            type : 'basic',
            link : '/odonto/cadastro/convenios'
          },
          {
            id   : 'cadastro.especialidades',
            title: 'Especialidades',
            type : 'basic',
            link : '/odonto/cadastro/especialidades'
          },
          {
            id   : 'cadastro.profissional',
            title: 'Profissional',
            type : 'basic',
            link : '/odonto/cadastro/profissional'
          },
          {
            id   : 'cadastro.receituario',
            title: 'Receituário',
            type : 'basic',
            link : '/odonto/cadastro/receituario'
          }
        ]
        },
        {
          id      : 'prontuario',
          title   : 'Prontuário', 
          type    : 'basic',
          icon    : 'mat_solid:post_add',
          link : '/odonto/prontuario'
        },
        {
          id      : 'estoque',
          title   : 'Estoque', 
          type    : 'basic',
          icon    : 'mat_outline:production_quantity_limits',
          link : '/odonto/estoque'
        },
        {
          id      : 'relatorios',
          title   : 'Relatórios', 
          type    : 'basic',
          icon    : 'mat_solid:insert_chart_outlined',
          link : '/odonto/relatorios'
        }
      ]
    });

    this.compact.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:bacteria',
      children:  [{
        id      : 'cadastros',
        title   : 'Cadastros',
        subtitle: 'Cadastros gerais',
        type    : 'collapsable',
        icon    : 'person',
        children: []
        },
        {
          id      : 'prontuario',
          title   : 'Prontuário',
          subtitle: '',
          type    : 'collapsable',
          icon    : 'mat_outline:attribution',
          children: []
        }]
    });

    this.futuristic.push(
    {
      id      : 'odonto',
      title   : 'ODONTO',
      subtitle: 'Controle odonto',
      type    : 'group',
      icon    : 'iconsmind:bacteria',
      children:  [{
        id      : 'cadastros',
        title   : 'Cadastros',
        subtitle: 'Cadastros gerais',
        type    : 'collapsable',
        icon    : 'material:person',
        children: []
        },
        {
          id      : 'prontuario',
          title   : 'Prontuário',
          subtitle: '',
          type    : 'collapsable',
          icon    : 'mat_outline:attribution',
          children: []
        }] 
    });
  }

  loadAdotapet(){
    this.default.push(
    {
      id      : 'adotapets',
      title   : 'ADOTAPET',
      subtitle: 'Controle de adoção',
      type    : 'group',
      icon    : 'iconsmind:bacteria',
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
      icon    : 'iconsmind:bacteria',
      children: [
        {
            id      : 'cadastros',
            title   : 'Cadastros',
            subtitle: 'Cadastros gerais',
            type    : 'collapsable',
            icon    : 'iconsmind:bacteria',
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
      icon    : 'iconsmind:bacteria',
      children: []
    }); 

    this.futuristic.push(
    {
      id      : 'adotapets',
      title   : 'ADOTAPET',
      subtitle: 'Controle de adoção',
      type    : 'group',
      icon    : 'iconsmind:bacteria',
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

  loadFinanceiro(){
    this.horizontal.push(
      {
        id      : 'financeiro',
        title   : 'FINANCEIRO',
        subtitle: 'Controle financeiro',
        type    : 'group',
        icon    : 'mat_solid:attach_money',
        children:  [
          {
            id      : 'financeiro.cadastros',
            title   : 'Cadastros',
            subtitle: 'Cadastros gerais',
            type    : 'collapsable',
            icon    : 'edit',
            children: [
                {
                    id   : 'financeiro.planoContas',
                    title: 'Plano de contas',
                    type : 'basic',
                    link : '/financeiro/cadastro/planocontas'
                }
              ]
            },
          {
            id   : 'financeiro.contas_receber',
            title: 'Contas a Receber',
            type : 'basic',
            icon : 'mat_solid:trending_up',
            link : '/financeiro/receber'
          },
          {
            id   : 'financeiro.contas_pagar',
            title: 'Contas a Pagar',
            type : 'basic',
            icon : 'mat_solid:trending_down',
            link : '/financeiro/pagar'
          },
          {
            id   : 'financeiro.caixa',
            title: 'Fluxo de caixa',
            type : 'basic',
            icon : 'attach_money',
            link : '/financeiro/caixa'
          },
          {
            id      : 'relatorios',
            title   : 'Relatórios', 
            type    : 'basic',
            icon    : 'mat_solid:insert_chart_outlined',
            link : '/financeiro/relatorios'
          }
        ]
      })
  }

  async cliente(request: Request,  response: Response) { 
    try {
      
      var dir = request.params.cliente; 
      this.modulosRepository.metadata.tablePath = dir + "." + "MODULOS"; 
      this.modulosRepository.metadata.tableMetadataArgs.schema = dir  
      var modulos = await this.modulosRepository.find();  
 
      var resp = {}; 

      modulos.forEach(async element => { 

        if(element['NOME'] == 'ADOTAPET' && element['ENABLED'] == 1){ 
          this.loadAdotapet();  
          this.loadConfAdota();  
        }

        if(element['NOME'] == 'ODONTO' && element['ENABLED'] == 1){  
          this.loadOdonto();
          this.loadConfOdonto(); 
        } 
      }); 

      this.loadFinanceiro();

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
