(this["webpackJsonphcis-ags"]=this["webpackJsonphcis-ags"]||[]).push([[5],{386:function(e,a,t){"use strict";t.d(a,"a",(function(){return r})),t.d(a,"b",(function(){return o}));var n="http://localhost:5000",c="hcis-api",r="".concat(n,"/").concat(c,"/employee"),o="".concat(n,"/").concat(c,"/master/jabatan")},387:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return c}));var n=function(e){return e.karyawan},c=function(e){return e.masterJabatan}},400:function(e,a,t){},402:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var n=t(10),c=t(46),r=(t(0),t(426)),o=t.n(r),i=t.p+"static/media/graphic-1.70deeb1d.png",s=t(2),l=function(){return Object(s.jsxs)("div",{className:"p-4",children:[Object(s.jsx)("img",{src:i,alt:"graphic",style:{width:200}}),Object(s.jsx)("p",{className:"font-weight-bold text-center mt-2",children:"No data Record to display"})]})},u=t(380),d=(t(400),["noHeader","progressPending","columns","data","handleSort","paginationTotalRows","onChangeRowsPerPage","onChangePage","subHeader","subHeaderComponent"]),b=function(e){var a=e.noHeader,t=e.progressPending,r=e.columns,i=e.data,b=e.handleSort,j=e.paginationTotalRows,p=e.onChangeRowsPerPage,f=e.onChangePage,h=e.subHeader,O=e.subHeaderComponent,m=Object(c.a)(e,d);return Object(s.jsx)(o.a,Object(n.a)(Object(n.a)({},m),{},{customStyles:{rows:{style:{"&:hover":{backgroundColor:"#e8eff4 !important",cursor:"pointer"}}},headCells:{style:{textAlign:"center"}}},className:"data-table",noHeader:a,progressPending:t,progressComponent:Object(s.jsx)(u.a,{}),columns:r,data:i,theme:"solarized",onSort:b,sortServer:!0,pagination:!0,paginationServer:!0,paginationTotalRows:j,onChangeRowsPerPage:p,onChangePage:f,subHeader:h,subHeaderComponent:O,noDataComponent:Object(s.jsx)(l,{})}))}},457:function(e,a,t){"use strict";t.d(a,"c",(function(){return u})),t.d(a,"a",(function(){return d})),t.d(a,"b",(function(){return b})),t.d(a,"d",(function(){return j}));var n=t(24),c=t(10),r=t(29),o=t(344),i=t(170),s=t(49),l=t(386),u=function(e){return function(){var a=Object(r.a)(Object(n.a)().mark((function a(t){return Object(n.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:t({type:s.i,payload:!0}),o.a.get("".concat(l.a,"/?"),{params:Object(c.a)({},e)}).then((function(e){e.data&&t({type:s.b,payload:e.data.data})})).catch((function(e){return console.error(e)})).finally((function(){t({type:s.i,payload:!1})}));case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},d=function(e,a){return function(){var t=Object(r.a)(Object(n.a)().mark((function t(c){return Object(n.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c({type:s.i,payload:!0}),o.a.post("".concat(l.a,"/search?page=").concat(e.page,"&size=").concat(e.size),a).then((function(e){e.data&&c({type:s.b,payload:e.data.data})})).catch((function(e){return console.error(e)})).finally((function(){c({type:s.i,payload:!1})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},b=function(e){return function(){var a=Object(r.a)(Object(n.a)().mark((function a(t){return Object(n.a)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:t({type:s.h,payload:!0}),o.a.get("".concat(l.a,"/detail?"),{params:Object(c.a)({},e)}).then((function(e){e.data&&t({type:s.a,payload:e.data.data})})).catch((function(e){return console.error(e)})).finally((function(){t({type:s.h,payload:!1})}));case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},j=function(e,a){return function(){var t=Object(r.a)(Object(n.a)().mark((function t(c){return Object(n.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:c({type:s.l,payload:!0}),o.a.post("".concat(l.a,"/save"),e).then((function(e){console.log(e),i.b.success("Data Karyawan berhasil ditambahkan !"),a()})).catch((function(e){var a,t,n,c;i.b.error((null===e||void 0===e||null===(a=e.response)||void 0===a||null===(t=a.data)||void 0===t||null===(n=t.header)||void 0===n||null===(c=n.errors[0])||void 0===c?void 0:c.message)||(null===e||void 0===e?void 0:e.message)),console.error(e)})).finally((function(){c({type:s.l,payload:!1})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},564:function(e,a,t){},659:function(e,a,t){"use strict";t.r(a);var n=t(10),c=t(13),r=t(0),o=t(19),i=t(51),s=t(115),l=t(32),u=t(84),d=t(85),b=t(569),j=t(570),p=t(375),f=t(112),h=t(366),O=t(52),m=t(2),g=Object(O.a)(Object(m.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search"),y=t(30),v=t(46),x=(t(418),t(564),["className","id","label","placeholder","value","onChange"]),w=function(e){var a=e.className,t=e.id,o=e.label,i=e.placeholder,s=e.value,l=e.onChange,u=Object(v.a)(e,x),d=Object(r.useState)(s),b=Object(c.a)(d,2),j=b[0],p=b[1];Object(r.useEffect)((function(){p(s)}),[s]);return Object(m.jsxs)("div",{className:a,children:[!!o&&Object(m.jsx)(y.h,{for:t,className:"text-bold-600",children:o}),Object(m.jsx)(y.g,Object(n.a)(Object(n.a)({},u),{},{id:t,placeholder:i,value:j,onChange:function(e){p(e.target.value),l(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&l(j)},className:"search-filter"}))]})},k=t(457),C=function(e){var a=e.params,t=Object(l.b)(),n=Object(r.useState)(),o=Object(c.a)(n,2),i=o[0],s=o[1],u=Object(r.useState)(),d=Object(c.a)(u,2),b=d[0],j=d[1];return Object(m.jsxs)(y.l,{xs:"1",sm:"2",md:"4",className:"justify-content-between pt-1 mb-4",children:[Object(m.jsx)(y.d,{md:"4",children:Object(m.jsx)(w,{placeholder:"NIP",id:"TxtSearchValue",value:i,onChange:function(e){s(e)}})}),Object(m.jsx)(y.d,{md:"4",children:Object(m.jsx)(w,{placeholder:"Unit Bisnis",id:"TxtSearchValue",value:b,onChange:function(e){j(e)}})}),Object(m.jsxs)(y.d,{md:"4",className:"align-self-center",children:[Object(m.jsxs)(y.a,{color:"primary",className:"me-2",onClick:function(){t(Object(k.a)(a,{karyawanNip:i,unitName:b}))},children:[Object(m.jsx)(g,{})," Search"]}),Object(m.jsx)(y.a,{outline:!0,color:"primary",className:"p-2-2",onClick:function(){t(Object(k.c)(a))},children:"Reset"})]})]})},N=t(402),P=t(387),S=void 0;a.default=function(){var e=Object(l.b)(),a=Object(o.l)(),t=Object(l.c)(P.a),O=t.karyawanList,g=t.loading,y=Object(r.useState)({page:1,size:10,dropdown:!1}),v=Object(c.a)(y,2),x=v[0],w=v[1];Object(r.useEffect)((function(){e(Object(k.c)(x))}),[]);var R=[{name:"NIP",width:"100px",center:!0,selector:function(e,a){return e.karyawanNip}},{name:"Nama",center:!0,selector:function(e){return e.karyawanName}},{name:"Tempat Tugas",center:!0,selector:function(e){return e.lokasiTempatTugas}},{name:"Unit Bisnis",center:!0,selector:function(e){return e.unitName}},{name:"Jabatan",center:!0,selector:function(e){return e.jabatan}},{name:"Aktif",center:!0,selector:function(e){return 1===e.isActive?"Aktif":"Tidak aktif"}},{name:"Aksi",center:!0,cell:function(e,t){return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(p.a,{color:"secondary","aria-label":"add an alarm",onClick:function(){return t=e.karyawanId,n=e.noNIK,c=e.karyawanNip,void a("/human-capital/karyawan/input-karyawan",{state:{karyawanId:t,NIK:n,NIP:c}});var t,n,c},children:Object(m.jsx)(b.a,{style:{color:u.a[900]}})}),Object(m.jsx)(p.a,{color:"warning","aria-label":"add an alarm",onClick:function(e){return S.handleModalDelete(e)},children:Object(m.jsx)(j.a,{style:{color:d.a[900]}})})]})}}];return Object(m.jsx)(s.a,{title:"Data Karyawan",children:Object(m.jsxs)(f.a,{variant:"body2",children:[Object(m.jsx)(C,{params:x}),Object(m.jsx)(i.b,{to:"/human-capital/karyawan/input-karyawan",style:{textDecoration:"none"},children:Object(m.jsx)(h.a,{variant:"contained",children:"Input Karyawan"})}),Object(m.jsx)("div",{style:{height:500,width:"100%"},children:Object(m.jsx)(N.a,{columns:R,data:null===O||void 0===O?void 0:O.data,progressPending:g,onChangePage:function(a){w(Object(n.a)(Object(n.a)({},x),{},{page:a})),e(Object(k.c)(Object(n.a)(Object(n.a)({},x),{},{page:a,size:null===O||void 0===O?void 0:O.size})))},onChangeRowsPerPage:function(a,t){w(Object(n.a)(Object(n.a)({},x),{},{size:a})),e(Object(k.c)(Object(n.a)(Object(n.a)({},x),{},{page:t,size:a})))},paginationTotalRows:null===O||void 0===O?void 0:O.totalRecord})})]})})}}}]);
//# sourceMappingURL=5.b2cccaac.chunk.js.map