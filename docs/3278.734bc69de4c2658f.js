"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3278],{3278:(y,g,c)=>{c.r(g),c.d(g,{ViewPageModule:()=>U});var l=c(6814),w=c(95),i=c(3718),d=c(5877),u=c(5861),e=c(9468),h=c(3182),f=c(2251),s=c(15),p=c(553);function Z(t,a){1&t&&e._UZ(0,"ion-progress-bar",6)}function V(t,a){if(1&t&&(e.TgZ(0,"li")(1,"strong"),e._uU(2,"GPS: "),e.qZA(),e.TgZ(3,"a",17),e._uU(4),e.qZA()()),2&t){const o=e.oxw(3);e.xp6(3),e.MGl("href","https://www.google.com/maps?q=",o.docView.geolocation,"",e.LSH),e.xp6(1),e.Oqu(o.docView.geolocation)}}function x(t,a){if(1&t){const o=e.EpF();e.TgZ(0,"ion-card"),e._UZ(1,"ion-img",11),e.TgZ(2,"ion-card-header")(3,"ion-card-title"),e._uU(4),e.qZA(),e.TgZ(5,"ion-card-subtitle"),e._uU(6),e.ALo(7,"date"),e.ALo(8,"date"),e.qZA()(),e.TgZ(9,"ion-card-content"),e._uU(10),e.TgZ(11,"ul",12)(12,"li")(13,"strong"),e._uU(14,"Local: "),e.qZA(),e._uU(15),e.qZA(),e.YNc(16,V,5,2,"li",8),e.qZA(),e.TgZ(17,"ion-grid")(18,"ion-row")(19,"ion-col",2)(20,"ion-button",13),e._UZ(21,"ion-icon",14),e._uU(22,"Editar "),e.qZA()(),e.TgZ(23,"ion-col",2)(24,"ion-button",15),e.NdJ("click",function(){e.CHM(o);const r=e.oxw(2);return e.KtG(r.delete(r.docView.id))}),e._UZ(25,"ion-icon",16),e._uU(26,"Apagar "),e.qZA()()()()()()}if(2&t){const o=e.oxw(2);e.xp6(1),e.Q6J("alt",o.docView.name)("src",o.docView.image),e.xp6(3),e.Oqu(o.docView.name),e.xp6(2),e.AsE(" ",e.xi3(7,9,o.docView.date,"dd/MM/yyyy")," \xe0s ",e.xi3(8,12,o.docView.date,"HH:mm")," "),e.xp6(4),e.hij(" ",o.docView.description," "),e.xp6(5),e.Oqu(o.docView.location),e.xp6(1),e.Q6J("ngIf",""!==o.docView.geolocation.trim()),e.xp6(4),e.Q6J("routerLink","/edit/"+o.docView.id)}}function _(t,a){1&t&&(e.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-card-title"),e._uU(3,"Oooops!"),e.qZA()(),e.TgZ(4,"ion-card-content"),e._uU(5,"N\xe3o encontramos o documento."),e.qZA()())}function v(t,a){if(1&t&&(e.TgZ(0,"ion-content",7),e.YNc(1,x,27,15,"ion-card",8),e.YNc(2,_,6,0,"ion-card",8),e.TgZ(3,"p",2)(4,"ion-button",9),e._UZ(5,"ion-icon",10),e._uU(6," Listagem "),e.qZA()()()),2&t){const o=e.oxw();e.Q6J("fullscreen",!0),e.xp6(1),e.Q6J("ngIf","success"==o.docView.status),e.xp6(1),e.Q6J("ngIf","error"==o.docView.status)}}const T=[{path:"",component:(()=>{var t;class a{constructor(){this.app=(0,h.ZF)(p.N.firebase),this.auth=(0,f.v0)(this.app),this.db=(0,s.ad)(this.app),this.view=!1,this.activatedRoute=(0,e.f3M)(d.gz),this.docId=this.activatedRoute.snapshot.paramMap.get("id"),this.docRef=(0,s.JU)(this.db,p.N.dbCollection,this.docId),this.alertController=(0,e.f3M)(i.Br),this.docExist=!1}ngOnInit(){var n=this;return(0,u.Z)(function*(){(0,f.Aj)(n.auth,m=>{m||(location.href="/login")});const r=yield(0,s.QT)(n.docRef);r.exists()?(n.docView=r.data(),n.docView.id=n.docId,n.docView.status="success",yield(0,s.r7)(n.docRef,{views:parseInt(n.docView.views+1)}),n.docExist=!0):n.docView={status:"error"},n.view=!0})()}delete(n){var r=this;return(0,u.Z)(function*(){var P;yield(yield r.alertController.create({header:"Oooops!",message:`Tem certeza que deseja apagar "${r.docView.name}"? Isso \xe9 irrevers\xedvel!`,buttons:[{text:"Cancelar",role:"cancel"},{text:"OK",role:"confirm",handler:(P=(0,u.Z)(function*(){yield(0,s.r7)(r.docRef,{status:"off"}),location.href="/"}),function(){return P.apply(this,arguments)})}]})).present()})()}}return(t=a).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-view"]],decls:9,vars:3,consts:[[3,"translucent"],["slot","start"],[1,"ion-text-center"],["ios","document-text-outline","md","document-text-sharp","slot","end",1,"ion-padding"],["type","indeterminate",4,"ngIf"],[3,"fullscreen",4,"ngIf"],["type","indeterminate"],[3,"fullscreen"],[4,"ngIf"],["routerLink","/"],["name","home","slot","start"],[2,"display","block","margin","auto",3,"alt","src"],[2,"padding","0 0 0 1rem"],["color","warning",3,"routerLink"],["name","create","slot","start"],["color","danger",3,"click"],["name","trash","slot","start"],["target","_blank",3,"href"]],template:function(n,r){1&n&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-menu-button"),e.qZA(),e.TgZ(4,"ion-title",2),e._uU(5,"Documento"),e.qZA(),e._UZ(6,"ion-icon",3),e.YNc(7,Z,1,0,"ion-progress-bar",4),e.qZA()(),e.YNc(8,v,7,3,"ion-content",5)),2&n&&(e.Q6J("translucent",!0),e.xp6(7),e.Q6J("ngIf",!r.view),e.xp6(1),e.Q6J("ngIf",r.view))},dependencies:[l.O5,i.YG,i.Sm,i.PM,i.FN,i.Zi,i.tO,i.Dq,i.wI,i.W2,i.jY,i.Gu,i.gu,i.Xz,i.fG,i.X7,i.Nd,i.wd,i.sr,i.YI,d.rH,l.uU]}),a})()}];let A=(()=>{var t;class a{}return(t=a).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.Bz.forChild(T),d.Bz]}),a})(),U=(()=>{var t;class a{}return(t=a).\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.ez,w.u5,i.Pc,A]}),a})()}}]);