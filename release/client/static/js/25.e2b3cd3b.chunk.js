(this["webpackJsonphcis-ags"]=this["webpackJsonphcis-ags"]||[]).push([[25],{661:function(e,a,t){"use strict";t.r(a);var i=t(13),n=t(0),s=t.n(n),r=t(167),c=t(10),o=t(27),l=t(112),d=t(351),j=t(585),b=t(498),h=t.n(b),m=t(543),g=t.n(m),x=t(270),u=t(271),O=t(684),f=t(56),k=t(2),p=function(){return Object(k.jsx)(x.a,{children:Object(k.jsx)(u.a,{children:Object(k.jsxs)(r.a,{container:!0,spacing:f.b,children:[Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsxs)(r.a,{container:!0,alignItems:"center",justifyContent:"space-between",spacing:f.b,children:[Object(k.jsx)(r.a,{item:!0,xs:!0,zeroMinWidth:!0,children:Object(k.jsxs)(r.a,{container:!0,spacing:1,children:[Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsx)(O.a,{variant:"text"})}),Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsx)(O.a,{variant:"rect",height:20})})]})}),Object(k.jsx)(r.a,{item:!0,children:Object(k.jsx)(O.a,{variant:"rect",height:50,width:80})})]})}),Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsx)(O.a,{variant:"rect",height:530})})]})})})},w=t(115),N={height:480,type:"bar",options:{chart:{id:"bar-chart",stacked:!0,toolbar:{show:!0},zoom:{enabled:!0}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}],plotOptions:{bar:{horizontal:!1,columnWidth:"50%"}},xaxis:{type:"category",categories:["BE","SA","BA","TL","QA","SM","ATL","AGV","ND","BS","NK","LA"]},legend:{show:!0,fontSize:"14px",fontFamily:"'Roboto', sans-serif",position:"bottom",offsetX:20,labels:{useSeriesColors:!1},markers:{width:16,height:16,radius:5},itemMargin:{horizontal:15,vertical:8}},fill:{type:"solid"},dataLabels:{enabled:!1},grid:{show:!0}},series:[{name:"Lokasi Request",data:[35,125,35,35,35,80,35,20,35,45,15,75]},{name:"Posisi Request",data:[35,15,15,35,65,40,80,25,15,85,25,75]},{name:"Posisi Terisi",data:[35,145,35,35,20,105,100,10,65,45,30,10]},{name:"Lokasi Terisi",data:[0,0,75,0,0,115,0,0,0,0,150,0]}]},y=[{value:"today",label:"Hari Ini"},{value:"month",label:"Bulan Ini"},{value:"year",label:"Tahun Ini"}],v=function(e){var a=e.isLoading,t=s.a.useState("today"),n=Object(i.a)(t,2),b=n[0],m=n[1],x=Object(o.a)(),u=x.palette.text.primary,O=x.palette.grey[200],v=x.palette.primary[200],S=x.palette.primary.dark,B=x.palette.secondary.main,E=x.palette.secondary.light,L=x.palette.grey[500];return s.a.useEffect((function(){var e=Object(c.a)(Object(c.a)({},N.options),{},{colors:[v,S,B,E],xaxis:{labels:{style:{colors:[u,u,u,u,u,u,u,u,u,u,u,u]}}},yaxis:{labels:{style:{colors:[u]}}},grid:{borderColor:O},tooltip:{theme:"light"},legend:{labels:{colors:L}}});a||h.a.exec("bar-chart","updateOptions",e)}),[v,S,B,E,u,O,a,L]),Object(k.jsx)(k.Fragment,{children:a?Object(k.jsx)(p,{}):Object(k.jsx)(w.a,{children:Object(k.jsxs)(r.a,{container:!0,spacing:f.b,children:[Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsxs)(r.a,{container:!0,alignItems:"center",justifyContent:"space-between",children:[Object(k.jsx)(r.a,{item:!0,children:Object(k.jsxs)(r.a,{container:!0,direction:"column",spacing:1,children:[Object(k.jsx)(r.a,{item:!0,children:Object(k.jsx)(l.a,{variant:"subtitle2",children:"Chart Posisi & Lokasi"})}),Object(k.jsx)(r.a,{item:!0,children:Object(k.jsx)(l.a,{variant:"h3",children:"1.600 Karyawan"})})]})}),Object(k.jsx)(r.a,{item:!0,children:Object(k.jsx)(d.a,{id:"standard-select-currency",select:!0,value:b,onChange:function(e){return m(e.target.value)},children:y.map((function(e){return Object(k.jsx)(j.a,{value:e.value,children:e.label},e.value)}))})})]})}),Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsx)(g.a,Object(c.a)({},N))})]})})})},S=t(693),B=t(656),E=t(554),L=t.n(E),I=t(553),P=t.n(I),A=t(547),C=t.n(A),M=[{field:"id",headerName:"NIP",width:110},{field:"lastName",headerName:"Nama",width:150},{field:"firstName",headerName:"Posisi",width:150},{field:"age",headerName:"Tempat Kerja",width:200},{field:"mulaikontrak",headerName:"Mulai Kontrak",width:180},{field:"habiskontrak",headerName:"Habis Kontrak",width:180},{field:"actions",type:"actions",width:80,getActions:function(e){return[Object(k.jsx)(S.a,{icon:Object(k.jsx)(C.a,{}),label:"Perpanjang",showInMenu:!0}),Object(k.jsx)(S.a,{icon:Object(k.jsx)(P.a,{}),label:"Resign",showInMenu:!0}),Object(k.jsx)(S.a,{icon:Object(k.jsx)(L.a,{}),label:"Delete"})]}}],T=[{id:"001",lastName:"Snow",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"002",lastName:"Lannister",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"003",lastName:"Lannister",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"004",lastName:"Stark",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"005",lastName:"Targaryen",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"006",lastName:"Melisandre",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"007",lastName:"Clifford",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"008",lastName:"Frances",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"},{id:"009",lastName:"Roxie",firstName:"Software Enggineer",age:"Bandung",habiskontrak:"01-12-2014",mulaikontrak:"01-12-2014"}],z=function(){return Object(k.jsx)(w.a,{title:"Data Kontrak Habis",children:Object(k.jsx)(l.a,{variant:"body2",children:Object(k.jsx)("div",{style:{height:400,width:"100%"},children:Object(k.jsx)(B.a,{rows:T,columns:M,pageSize:5,rowsPerPageOptions:[5]})})})})};a.default=function(){var e=Object(n.useState)(!0),a=Object(i.a)(e,2),t=a[0],s=a[1];return Object(n.useEffect)((function(){s(!1)}),[]),Object(k.jsxs)(r.a,{container:!0,spacing:f.b,children:[Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsx)(r.a,{container:!0,spacing:f.b,children:Object(k.jsx)(r.a,{item:!0,xs:12,md:12,children:Object(k.jsx)(v,{isLoading:t})})})}),Object(k.jsx)(r.a,{item:!0,xs:12,children:Object(k.jsx)(r.a,{item:!0,xs:12,md:12,children:Object(k.jsx)(z,{})})})]})}}}]);
//# sourceMappingURL=25.e2b3cd3b.chunk.js.map