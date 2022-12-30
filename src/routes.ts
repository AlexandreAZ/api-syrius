import { AdotarController } from "./controller/Adocao/AdotarController"
import { AuthController } from "./controller/AuthController"
import { AdotantesController } from "./controller/Cadastro/AdotantesController"
import { CadastroController } from "./controller/Cadastro/CadastroController"
import { PelagemController } from "./controller/Cadastro/Conf/PelagemController"
import { PorteController } from "./controller/Cadastro/Conf/PorteController"
import { RacasController } from "./controller/Cadastro/Conf/RacasController"
import { SexosController } from "./controller/Cadastro/Conf/SexosController"
import { TiposPetController } from "./controller/Cadastro/Conf/TiposPetController"
import { EstabelecimentosController } from "./controller/Cadastro/EstabelecimentosController"
import { ParceirosController } from "./controller/Cadastro/ParceirosController"
import { UserController } from "./controller/UserController"

export const Routes = [
     // LOGIN
     {
        method: "post",
        route: "/API/login",
        controller: AuthController,
        action: "login"
    }, 
    {
        method: "get",
        route: "/health",
        controller: UserController,
        action: "he"
    },{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/api/user",
    controller: UserController,
    action: "one"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},{
    method: "post",
        route: "/api/apps/cadastrapet/all",
        controller: CadastroController,
        action: "getPets"  
},{
    method: "post",
        route: "/api/apps/cadastrapet/tipo",
        controller: TiposPetController,
        action: "getTipos"  
},{
    method: "post",
        route: "/api/apps/cadastrapet/tipo/:id",
        controller: TiposPetController,
        action: "getTipoID"  
},{
    method: "post",
        route: "/api/apps/cadastrapet/raca/:id",
        controller: RacasController,
        action: "getRacaID"  
},{
    method: "post",
        route: "/api/apps/cadastrapet/pelagem",
        controller: PelagemController,
        action: "getPelagem"  
},{
    method: "post",
        route: "/api/apps/cadastrapet/porte",
        controller: PorteController,
        action: "getPortes"  
},{
    method: "post",
        route: "/api/apps/racas/all",
        controller: RacasController,
        action: "getRacas"  
},{
    method: "post",
        route: "/api/apps/cadastrapet/maxid",
        controller: CadastroController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/adotante/maxid",
        controller: AdotantesController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/adocao/maxid",
        controller: AdotarController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/parceiros/maxid",
        controller: ParceirosController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/estabelecimentos/maxid",
        controller: EstabelecimentosController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/racas/maxid",
        controller: RacasController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/sexos/maxid",
        controller: SexosController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/pelagem/maxid",
        controller: PelagemController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/porte/maxid",
        controller: PorteController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/tipos-pet/maxid",
        controller: TiposPetController,
        action: "getMAxID"  
},{
    method: "post",
        route: "/api/apps/parceiros/all",
        controller: ParceirosController,
        action: "getParceiros"  
},{
    method: "post",
        route: "/api/apps/pet/all",
        controller: CadastroController,
        action: "getPets"  
},{
    method: "post",
        route: "/api/apps/pet/:id",
        controller: CadastroController,
        action: "getPetID"  
},{
    method: "post",
        route: "/api/apps/adocao/all",
        controller: AdotarController,
        action: "getAdocoes"  
},{
    method: "post",
        route: "/api/apps/tipos-pet/all",
        controller: TiposPetController,
        action: "getTipos"  
},{
    method: "post",
        route: "/api/apps/pelagem/all",
        controller: PelagemController,
        action: "getPelagem"  
},{
    method: "post",
        route: "/api/apps/porte/all",
        controller: PorteController,
        action: "getPortes"  
},{
    method: "post",
        route: "/api/apps/adotante/all",
        controller: AdotantesController,
        action: "getAdotantes"  
},{
    method: "post",
        route: "/api/apps/adotante/:id",
        controller: AdotantesController,
        action: "one"  
},{
    method: "post",
        route: "/api/apps/estabelecimentos/all",
        controller: EstabelecimentosController,
        action: "getEstabelecimentos"  
},{
    method: "post",
        route: "/api/apps/sexos/all",
        controller: SexosController,
        action: "getSexos"  
},{
    method: "patch",
        route: "/api/apps/racas/raca",
        controller: RacasController,
        action: "upRaca"  
},{
    method: "delete",
        route: "/api/apps/racas/del/:id/:diretorio",
        controller: RacasController,
        action: "delRaca"  
},{
    method: "delete",
        route: "/api/apps/adotante/del/:id/:diretorio",
        controller: AdotantesController,
        action: "delAdotante"  
},{
   
    method: "post",
    route: "/api/auth/refresh-access-token",
    controller: AuthController,
    action: "refreshToken"  
},{
    method: "patch",
        route: "/api/apps/porte/porte",
        controller: PorteController,
        action: "upPorte"  
},{
    method: "patch",
        route: "/api/apps/tipos-pet/tipo",
        controller: TiposPetController,
        action: "upTipo"  
},{
    method: "patch",
        route: "/api/apps/pelagem/pelagem",
        controller: PelagemController,
        action: "upPelagem"  
},{
    method: "patch",
        route: "/api/apps/sexos/sexo",
        controller: SexosController,
        action: "upSexo"  
},{
    method: "delete",
        route: "/api/apps/porte/del/:id/:diretorio",
        controller: PorteController,
        action: "delPorte"  
},{
    method: "delete",
        route: "/api/apps/pelagem/del/:id/:diretorio",
        controller: PelagemController,
        action: "delPelagem"  
},{
    method: "delete",
        route: "/api/apps/tipos-pet/del/:id/:diretorio",
        controller: TiposPetController,
        action: "delTipo"  
},{
    method: "delete",
        route: "/api/apps/sexos/del/:id/:diretorio",
        controller: SexosController,
        action: "delSexo"  
},{
    method: "delete",
        route: "/api/apps/parceiros/parceiro/del/:id/:diretorio",
        controller: ParceirosController,
        action: "delParceiro"  
},{
    method: "delete",
        route: "/api/apps/estabelecimentos/del/:id/:diretorio",
        controller: EstabelecimentosController,
        action: "delEst"  
},{
    method: "delete",
        route: "/api/apps/porte/del/:id/:diretorio",
        controller: PorteController,
        action: "delPorte"  
},{
    method: "delete",
        route: "/api/apps/adocao/del/:id/:diretorio",
        controller: AdotarController,
        action: "delAdocao"  
},{
    method: "delete",
        route: "/api/apps/cadastrapet/pet/del/:id/:diretorio",
        controller: CadastroController,
        action: "delPet"  
},{
    method: "patch",
        route: "/api/apps/cadastrapet/pet",
        controller: CadastroController,
        action: "upPet"  
},{
    method: "patch",
        route: "/api/apps/adotante/ado",
        controller: AdotantesController,
        action: "upAdotante"  
},{
    method: "patch",
        route: "/api/apps/parceiros/parceiro",
        controller: ParceirosController,
        action: "upParceiro"  
},{
    method: "patch",
        route: "/api/apps/estabelecimentos/estabelecimento",
        controller: EstabelecimentosController,
        action: "upEst"  
},{
        method: "patch",
        route: "/api/apps/adocao/adotar",
        controller: AdotarController,
        action: "upAdocao"  
},{
    method: "post",
    route: "/api/apps/adocao/statuspet",
    controller: CadastroController,
    action: "upStatus"  
},{
    method: "patch",
    route: "/api/apps/cadastrapet/avatar",
    controller: CadastroController,
    action: "upAvatar"  
}
]