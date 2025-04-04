import{r as l,E as Be,c as J,F as se,H as m,J as ce,K as ve,M as G,N as ye,Q as Ce,U as Me,V as Ie,W as F,X as we,Y as pe,R as he,Z as We,$ as De,a0 as Re,a1 as Fe,a2 as _e,a3 as Le,a4 as Ae,a5 as Xe,a6 as Ve,a7 as Ge,w as Ke,x as Ue,a8 as Ye,a9 as w,j as o,aa as ee,ab as O,ac as B,ad as Qe,ae,af as Je,ag as te,ah as Ze,ai as fe,aj as ke,L as et}from"./index-DnL67hiT.js";import{A as tt}from"./AuthWrapper-VjElYb0K.js";import{S as le}from"./index-CPOCjh1U.js";import{R as $e,a as Se}from"./LeftOutlined-BIndlVMR.js";import"./index-D7rKvFyU.js";var it={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"bars",theme:"outlined"},rt=function(t,r){return l.createElement(Be,J({},t,{ref:r,icon:it}))},nt=l.forwardRef(rt);const je=l.createContext({siderHook:{addSider:()=>null,removeSider:()=>null}}),ot=e=>{const{antCls:t,componentCls:r,colorText:i,footerBg:n,headerHeight:a,headerPadding:s,headerColor:p,footerPadding:d,fontSize:g,bodyBg:h,headerBg:f}=e;return{[r]:{display:"flex",flex:"auto",flexDirection:"column",minHeight:0,background:h,"&, *":{boxSizing:"border-box"},[`&${r}-has-sider`]:{flexDirection:"row",[`> ${r}, > ${r}-content`]:{width:0}},[`${r}-header, &${r}-footer`]:{flex:"0 0 auto"},"&-rtl":{direction:"rtl"}},[`${r}-header`]:{height:a,padding:s,color:p,lineHeight:m(a),background:f,[`${t}-menu`]:{lineHeight:"inherit"}},[`${r}-footer`]:{padding:d,color:i,fontSize:g,background:n},[`${r}-content`]:{flex:"auto",color:i,minHeight:0}}},Ne=e=>{const{colorBgLayout:t,controlHeight:r,controlHeightLG:i,colorText:n,controlHeightSM:a,marginXXS:s,colorTextLightSolid:p,colorBgContainer:d}=e,g=i*1.25;return{colorBgHeader:"#001529",colorBgBody:t,colorBgTrigger:"#002140",bodyBg:t,headerBg:"#001529",headerHeight:r*2,headerPadding:`0 ${g}px`,headerColor:n,footerPadding:`${a}px ${g}px`,footerBg:t,siderBg:"#001529",triggerHeight:i+s*2,triggerBg:"#002140",triggerColor:p,zeroTriggerWidth:i,zeroTriggerHeight:i,lightSiderBg:d,lightTriggerBg:d,lightTriggerColor:n}},Te=[["colorBgBody","bodyBg"],["colorBgHeader","headerBg"],["colorBgTrigger","triggerBg"]],ze=se("Layout",e=>[ot(e)],Ne,{deprecatedTokens:Te}),at=e=>{const{componentCls:t,siderBg:r,motionDurationMid:i,motionDurationSlow:n,antCls:a,triggerHeight:s,triggerColor:p,triggerBg:d,headerHeight:g,zeroTriggerWidth:h,zeroTriggerHeight:f,borderRadiusLG:u,lightSiderBg:c,lightTriggerColor:$,lightTriggerBg:x,bodyBg:I}=e;return{[t]:{position:"relative",minWidth:0,background:r,transition:`all ${i}, background 0s`,"&-has-trigger":{paddingBottom:s},"&-right":{order:1},[`${t}-children`]:{height:"100%",marginTop:-.1,paddingTop:.1,[`${a}-menu${a}-menu-inline-collapsed`]:{width:"auto"}},[`&-zero-width ${t}-children`]:{overflow:"hidden"},[`${t}-trigger`]:{position:"fixed",bottom:0,zIndex:1,height:s,color:p,lineHeight:m(s),textAlign:"center",background:d,cursor:"pointer",transition:`all ${i}`},[`${t}-zero-width-trigger`]:{position:"absolute",top:g,insetInlineEnd:e.calc(h).mul(-1).equal(),zIndex:1,width:h,height:f,color:p,fontSize:e.fontSizeXL,display:"flex",alignItems:"center",justifyContent:"center",background:r,borderRadius:`0 ${m(u)} ${m(u)} 0`,cursor:"pointer",transition:`background ${n} ease`,"&::after":{position:"absolute",inset:0,background:"transparent",transition:`all ${n}`,content:'""'},"&:hover::after":{background:"rgba(255, 255, 255, 0.2)"},"&-right":{insetInlineStart:e.calc(h).mul(-1).equal(),borderRadius:`${m(u)} 0 0 ${m(u)}`}},"&-light":{background:c,[`${t}-trigger`]:{color:$,background:x},[`${t}-zero-width-trigger`]:{color:$,background:x,border:`1px solid ${I}`,borderInlineStart:0}}}}},lt=se(["Layout","Sider"],e=>[at(e)],Ne,{deprecatedTokens:Te});var st=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]]);return r};const be={xs:"479.98px",sm:"575.98px",md:"767.98px",lg:"991.98px",xl:"1199.98px",xxl:"1599.98px"},ct=e=>!Number.isNaN(Number.parseFloat(e))&&isFinite(e),Pe=l.createContext({}),dt=(()=>{let e=0;return function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return e+=1,`${t}${e}`}})(),Ee=l.forwardRef((e,t)=>{const{prefixCls:r,className:i,trigger:n,children:a,defaultCollapsed:s=!1,theme:p="dark",style:d={},collapsible:g=!1,reverseArrow:h=!1,width:f=200,collapsedWidth:u=80,zeroWidthTriggerStyle:c,breakpoint:$,onCollapse:x,onBreakpoint:I}=e,b=st(e,["prefixCls","className","trigger","children","defaultCollapsed","theme","style","collapsible","reverseArrow","width","collapsedWidth","zeroWidthTriggerStyle","breakpoint","onCollapse","onBreakpoint"]),{siderHook:H}=l.useContext(je),[S,z]=l.useState("collapsed"in e?e.collapsed:s),[W,_]=l.useState(!1);l.useEffect(()=>{"collapsed"in e&&z(e.collapsed)},[e.collapsed]);const M=(C,E)=>{"collapsed"in e||z(C),x==null||x(C,E)},{getPrefixCls:j,direction:D}=l.useContext(ce),v=j("layout-sider",r),[A,X,L]=lt(v),R=l.useRef(null);R.current=C=>{_(C.matches),I==null||I(C.matches),S!==C.matches&&M(C.matches,"responsive")},l.useEffect(()=>{function C(Q){return R.current(Q)}let E;if(typeof window<"u"){const{matchMedia:Q}=window;if(Q&&$&&$ in be){E=Q(`screen and (max-width: ${be[$]})`);try{E.addEventListener("change",C)}catch{E.addListener(C)}C(E)}}return()=>{try{E==null||E.removeEventListener("change",C)}catch{E==null||E.removeListener(C)}}},[$]),l.useEffect(()=>{const C=dt("ant-sider-");return H.addSider(C),()=>H.removeSider(C)},[]);const N=()=>{M(!S,"clickTrigger")},y=ve(b,["collapsed"]),T=S?u:f,P=ct(T)?`${T}px`:String(T),V=parseFloat(String(u||0))===0?l.createElement("span",{onClick:N,className:G(`${v}-zero-width-trigger`,`${v}-zero-width-trigger-${h?"right":"left"}`),style:c},n||l.createElement(nt,null)):null,Z=D==="rtl"==!h,oe={expanded:Z?l.createElement(Se,null):l.createElement($e,null),collapsed:Z?l.createElement($e,null):l.createElement(Se,null)}[S?"collapsed":"expanded"],Y=n!==null?V||l.createElement("div",{className:`${v}-trigger`,onClick:N,style:{width:P}},n||oe):null,K=Object.assign(Object.assign({},d),{flex:`0 0 ${P}`,maxWidth:P,minWidth:P,width:P}),k=G(v,`${v}-${p}`,{[`${v}-collapsed`]:!!S,[`${v}-has-trigger`]:g&&n!==null&&!V,[`${v}-below`]:!!W,[`${v}-zero-width`]:parseFloat(P)===0},i,X,L),q=l.useMemo(()=>({siderCollapsed:S}),[S]);return A(l.createElement(Pe.Provider,{value:q},l.createElement("aside",Object.assign({className:k},y,{style:K,ref:t}),l.createElement("div",{className:`${v}-children`},a),g||W&&V?Y:null)))});function mt(e,t,r){return typeof r=="boolean"?r:e.length?!0:ye(t).some(n=>n.type===Ee)}var Oe=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]]);return r};function ne(e){let{suffixCls:t,tagName:r,displayName:i}=e;return n=>l.forwardRef((s,p)=>l.createElement(n,Object.assign({ref:p,suffixCls:t,tagName:r},s)))}const de=l.forwardRef((e,t)=>{const{prefixCls:r,suffixCls:i,className:n,tagName:a}=e,s=Oe(e,["prefixCls","suffixCls","className","tagName"]),{getPrefixCls:p}=l.useContext(ce),d=p("layout",r),[g,h,f]=ze(d),u=i?`${d}-${i}`:d;return g(l.createElement(a,Object.assign({className:G(r||u,n,h,f),ref:t},s)))}),gt=l.forwardRef((e,t)=>{const{direction:r}=l.useContext(ce),[i,n]=l.useState([]),{prefixCls:a,className:s,rootClassName:p,children:d,hasSider:g,tagName:h,style:f}=e,u=Oe(e,["prefixCls","className","rootClassName","children","hasSider","tagName","style"]),c=ve(u,["suffixCls"]),{getPrefixCls:$,className:x,style:I}=Ce("layout"),b=$("layout",a),H=mt(i,d,g),[S,z,W]=ze(b),_=G(b,{[`${b}-has-sider`]:H,[`${b}-rtl`]:r==="rtl"},x,s,p,z,W),M=l.useMemo(()=>({siderHook:{addSider:j=>{n(D=>[].concat(Me(D),[j]))},removeSider:j=>{n(D=>D.filter(v=>v!==j))}}}),[]);return S(l.createElement(je.Provider,{value:M},l.createElement(h,Object.assign({ref:t,className:_,style:Object.assign(Object.assign({},I),f)},c),d)))}),ut=ne({tagName:"div",displayName:"Layout"})(gt),pt=ne({suffixCls:"header",tagName:"header",displayName:"Header"})(de),ht=ne({suffixCls:"footer",tagName:"footer",displayName:"Footer"})(de),ft=ne({suffixCls:"content",tagName:"main",displayName:"Content"})(de),U=ut;U.Header=pt;U.Footer=ht;U.Content=ft;U.Sider=Ee;U._InternalSiderContext=Pe;var $t=["className","prefixCls","style","active","status","iconPrefix","icon","wrapperStyle","stepNumber","disabled","description","title","subTitle","progressDot","stepIcon","tailContent","icons","stepIndex","onStepClick","onClick","render"];function xe(e){return typeof e=="string"}function He(e){var t,r=e.className,i=e.prefixCls,n=e.style,a=e.active,s=e.status,p=e.iconPrefix,d=e.icon;e.wrapperStyle;var g=e.stepNumber,h=e.disabled,f=e.description,u=e.title,c=e.subTitle,$=e.progressDot,x=e.stepIcon,I=e.tailContent,b=e.icons,H=e.stepIndex,S=e.onStepClick,z=e.onClick,W=e.render,_=Ie(e,$t),M=!!S&&!h,j={};M&&(j.role="button",j.tabIndex=0,j.onClick=function(R){z==null||z(R),S(H)},j.onKeyDown=function(R){var N=R.which;(N===pe.ENTER||N===pe.SPACE)&&S(H)});var D=function(){var N,y,T=G("".concat(i,"-icon"),"".concat(p,"icon"),(N={},F(N,"".concat(p,"icon-").concat(d),d&&xe(d)),F(N,"".concat(p,"icon-check"),!d&&s==="finish"&&(b&&!b.finish||!b)),F(N,"".concat(p,"icon-cross"),!d&&s==="error"&&(b&&!b.error||!b)),N)),P=l.createElement("span",{className:"".concat(i,"-icon-dot")});return $?typeof $=="function"?y=l.createElement("span",{className:"".concat(i,"-icon")},$(P,{index:g-1,status:s,title:u,description:f})):y=l.createElement("span",{className:"".concat(i,"-icon")},P):d&&!xe(d)?y=l.createElement("span",{className:"".concat(i,"-icon")},d):b&&b.finish&&s==="finish"?y=l.createElement("span",{className:"".concat(i,"-icon")},b.finish):b&&b.error&&s==="error"?y=l.createElement("span",{className:"".concat(i,"-icon")},b.error):d||s==="finish"||s==="error"?y=l.createElement("span",{className:T}):y=l.createElement("span",{className:"".concat(i,"-icon")},g),x&&(y=x({index:g-1,status:s,title:u,description:f,node:y})),y},v=s||"wait",A=G("".concat(i,"-item"),"".concat(i,"-item-").concat(v),r,(t={},F(t,"".concat(i,"-item-custom"),d),F(t,"".concat(i,"-item-active"),a),F(t,"".concat(i,"-item-disabled"),h===!0),t)),X=we({},n),L=l.createElement("div",J({},_,{className:A,style:X}),l.createElement("div",J({onClick:z},j,{className:"".concat(i,"-item-container")}),l.createElement("div",{className:"".concat(i,"-item-tail")},I),l.createElement("div",{className:"".concat(i,"-item-icon")},D()),l.createElement("div",{className:"".concat(i,"-item-content")},l.createElement("div",{className:"".concat(i,"-item-title")},u,c&&l.createElement("div",{title:typeof c=="string"?c:void 0,className:"".concat(i,"-item-subtitle")},c)),f&&l.createElement("div",{className:"".concat(i,"-item-description")},f))));return W&&(L=W(L)||null),L}var St=["prefixCls","style","className","children","direction","type","labelPlacement","iconPrefix","status","size","current","progressDot","stepIcon","initial","icons","onChange","itemRender","items"];function me(e){var t,r=e.prefixCls,i=r===void 0?"rc-steps":r,n=e.style,a=n===void 0?{}:n,s=e.className;e.children;var p=e.direction,d=p===void 0?"horizontal":p,g=e.type,h=g===void 0?"default":g,f=e.labelPlacement,u=f===void 0?"horizontal":f,c=e.iconPrefix,$=c===void 0?"rc":c,x=e.status,I=x===void 0?"process":x,b=e.size,H=e.current,S=H===void 0?0:H,z=e.progressDot,W=z===void 0?!1:z,_=e.stepIcon,M=e.initial,j=M===void 0?0:M,D=e.icons,v=e.onChange,A=e.itemRender,X=e.items,L=X===void 0?[]:X,R=Ie(e,St),N=h==="navigation",y=h==="inline",T=y||W,P=y?"horizontal":d,V=y?void 0:b,Z=T?"vertical":u,ge=G(i,"".concat(i,"-").concat(P),s,(t={},F(t,"".concat(i,"-").concat(V),V),F(t,"".concat(i,"-label-").concat(Z),P==="horizontal"),F(t,"".concat(i,"-dot"),!!T),F(t,"".concat(i,"-navigation"),N),F(t,"".concat(i,"-inline"),y),t)),ue=function(K){v&&S!==K&&v(K)},oe=function(K,k){var q=we({},K),C=j+k;return I==="error"&&k===S-1&&(q.className="".concat(i,"-next-error")),q.status||(C===S?q.status=I:C<S?q.status="finish":q.status="wait"),y&&(q.icon=void 0,q.subTitle=void 0),!q.render&&A&&(q.render=function(E){return A(q,E)}),he.createElement(He,J({},q,{active:C===S,stepNumber:C+1,stepIndex:C,key:C,prefixCls:i,iconPrefix:$,wrapperStyle:a,progressDot:T,stepIcon:_,icons:D,onStepClick:v&&ue}))};return he.createElement("div",J({className:ge,style:a},R),L.filter(function(Y){return Y}).map(oe))}me.Step=He;const bt=e=>{const{componentCls:t,customIconTop:r,customIconSize:i,customIconFontSize:n}=e;return{[`${t}-item-custom`]:{[`> ${t}-item-container > ${t}-item-icon`]:{height:"auto",background:"none",border:0,[`> ${t}-icon`]:{top:r,width:i,height:i,fontSize:n,lineHeight:m(i)}}},[`&:not(${t}-vertical)`]:{[`${t}-item-custom`]:{[`${t}-item-icon`]:{width:"auto",background:"none"}}}}},xt=e=>{const{componentCls:t}=e,r=`${t}-item`;return{[`${t}-horizontal`]:{[`${r}-tail`]:{transform:"translateY(-50%)"}}}},vt=e=>{const{componentCls:t,inlineDotSize:r,inlineTitleColor:i,inlineTailColor:n}=e,a=e.calc(e.paddingXS).add(e.lineWidth).equal(),s={[`${t}-item-container ${t}-item-content ${t}-item-title`]:{color:i}};return{[`&${t}-inline`]:{width:"auto",display:"inline-flex",[`${t}-item`]:{flex:"none","&-container":{padding:`${m(a)} ${m(e.paddingXXS)} 0`,margin:`0 ${m(e.calc(e.marginXXS).div(2).equal())}`,borderRadius:e.borderRadiusSM,cursor:"pointer",transition:`background-color ${e.motionDurationMid}`,"&:hover":{background:e.controlItemBgHover},"&[role='button']:hover":{opacity:1}},"&-icon":{width:r,height:r,marginInlineStart:`calc(50% - ${m(e.calc(r).div(2).equal())})`,[`> ${t}-icon`]:{top:0},[`${t}-icon-dot`]:{borderRadius:e.calc(e.fontSizeSM).div(4).equal(),"&::after":{display:"none"}}},"&-content":{width:"auto",marginTop:e.calc(e.marginXS).sub(e.lineWidth).equal()},"&-title":{color:i,fontSize:e.fontSizeSM,lineHeight:e.lineHeightSM,fontWeight:"normal",marginBottom:e.calc(e.marginXXS).div(2).equal()},"&-description":{display:"none"},"&-tail":{marginInlineStart:0,top:e.calc(r).div(2).add(a).equal(),transform:"translateY(-50%)","&:after":{width:"100%",height:e.lineWidth,borderRadius:0,marginInlineStart:0,background:n}},[`&:first-child ${t}-item-tail`]:{width:"50%",marginInlineStart:"50%"},[`&:last-child ${t}-item-tail`]:{display:"block",width:"50%"},"&-wait":Object.assign({[`${t}-item-icon ${t}-icon ${t}-icon-dot`]:{backgroundColor:e.colorBorderBg,border:`${m(e.lineWidth)} ${e.lineType} ${n}`}},s),"&-finish":Object.assign({[`${t}-item-tail::after`]:{backgroundColor:n},[`${t}-item-icon ${t}-icon ${t}-icon-dot`]:{backgroundColor:n,border:`${m(e.lineWidth)} ${e.lineType} ${n}`}},s),"&-error":s,"&-active, &-process":Object.assign({[`${t}-item-icon`]:{width:r,height:r,marginInlineStart:`calc(50% - ${m(e.calc(r).div(2).equal())})`,top:0}},s),[`&:not(${t}-item-active) > ${t}-item-container[role='button']:hover`]:{[`${t}-item-title`]:{color:i}}}}}},yt=e=>{const{componentCls:t,iconSize:r,lineHeight:i,iconSizeSM:n}=e;return{[`&${t}-label-vertical`]:{[`${t}-item`]:{overflow:"visible","&-tail":{marginInlineStart:e.calc(r).div(2).add(e.controlHeightLG).equal(),padding:`0 ${m(e.paddingLG)}`},"&-content":{display:"block",width:e.calc(r).div(2).add(e.controlHeightLG).mul(2).equal(),marginTop:e.marginSM,textAlign:"center"},"&-icon":{display:"inline-block",marginInlineStart:e.controlHeightLG},"&-title":{paddingInlineEnd:0,paddingInlineStart:0,"&::after":{display:"none"}},"&-subtitle":{display:"block",marginBottom:e.marginXXS,marginInlineStart:0,lineHeight:i}},[`&${t}-small:not(${t}-dot)`]:{[`${t}-item`]:{"&-icon":{marginInlineStart:e.calc(r).sub(n).div(2).add(e.controlHeightLG).equal()}}}}}},Ct=e=>{const{componentCls:t,navContentMaxWidth:r,navArrowColor:i,stepsNavActiveColor:n,motionDurationSlow:a}=e;return{[`&${t}-navigation`]:{paddingTop:e.paddingSM,[`&${t}-small`]:{[`${t}-item`]:{"&-container":{marginInlineStart:e.calc(e.marginSM).mul(-1).equal()}}},[`${t}-item`]:{overflow:"visible",textAlign:"center","&-container":{display:"inline-block",height:"100%",marginInlineStart:e.calc(e.margin).mul(-1).equal(),paddingBottom:e.paddingSM,textAlign:"start",transition:`opacity ${a}`,[`${t}-item-content`]:{maxWidth:r},[`${t}-item-title`]:Object.assign(Object.assign({maxWidth:"100%",paddingInlineEnd:0},We),{"&::after":{display:"none"}})},[`&:not(${t}-item-active)`]:{[`${t}-item-container[role='button']`]:{cursor:"pointer","&:hover":{opacity:.85}}},"&:last-child":{flex:1,"&::after":{display:"none"}},"&::after":{position:"absolute",top:`calc(50% - ${m(e.calc(e.paddingSM).div(2).equal())})`,insetInlineStart:"100%",display:"inline-block",width:e.fontSizeIcon,height:e.fontSizeIcon,borderTop:`${m(e.lineWidth)} ${e.lineType} ${i}`,borderBottom:"none",borderInlineStart:"none",borderInlineEnd:`${m(e.lineWidth)} ${e.lineType} ${i}`,transform:"translateY(-50%) translateX(-50%) rotate(45deg)",content:'""'},"&::before":{position:"absolute",bottom:0,insetInlineStart:"50%",display:"inline-block",width:0,height:e.lineWidthBold,backgroundColor:n,transition:`width ${a}, inset-inline-start ${a}`,transitionTimingFunction:"ease-out",content:'""'}},[`${t}-item${t}-item-active::before`]:{insetInlineStart:0,width:"100%"}},[`&${t}-navigation${t}-vertical`]:{[`> ${t}-item`]:{marginInlineEnd:0,"&::before":{display:"none"},[`&${t}-item-active::before`]:{top:0,insetInlineEnd:0,insetInlineStart:"unset",display:"block",width:e.calc(e.lineWidth).mul(3).equal(),height:`calc(100% - ${m(e.marginLG)})`},"&::after":{position:"relative",insetInlineStart:"50%",display:"block",width:e.calc(e.controlHeight).mul(.25).equal(),height:e.calc(e.controlHeight).mul(.25).equal(),marginBottom:e.marginXS,textAlign:"center",transform:"translateY(-50%) translateX(-50%) rotate(135deg)"},"&:last-child":{"&::after":{display:"none"}},[`> ${t}-item-container > ${t}-item-tail`]:{visibility:"hidden"}}},[`&${t}-navigation${t}-horizontal`]:{[`> ${t}-item > ${t}-item-container > ${t}-item-tail`]:{visibility:"hidden"}}}},It=e=>{const{antCls:t,componentCls:r,iconSize:i,iconSizeSM:n,processIconColor:a,marginXXS:s,lineWidthBold:p,lineWidth:d,paddingXXS:g}=e,h=e.calc(i).add(e.calc(p).mul(4).equal()).equal(),f=e.calc(n).add(e.calc(e.lineWidth).mul(4).equal()).equal();return{[`&${r}-with-progress`]:{[`${r}-item`]:{paddingTop:g,[`&-process ${r}-item-container ${r}-item-icon ${r}-icon`]:{color:a}},[`&${r}-vertical > ${r}-item `]:{paddingInlineStart:g,[`> ${r}-item-container > ${r}-item-tail`]:{top:s,insetInlineStart:e.calc(i).div(2).sub(d).add(g).equal()}},[`&, &${r}-small`]:{[`&${r}-horizontal ${r}-item:first-child`]:{paddingBottom:g,paddingInlineStart:g}},[`&${r}-small${r}-vertical > ${r}-item > ${r}-item-container > ${r}-item-tail`]:{insetInlineStart:e.calc(n).div(2).sub(d).add(g).equal()},[`&${r}-label-vertical ${r}-item ${r}-item-tail`]:{top:e.calc(i).div(2).add(g).equal()},[`${r}-item-icon`]:{position:"relative",[`${t}-progress`]:{position:"absolute",insetInlineStart:"50%",top:"50%",transform:"translate(-50%, -50%)","&-inner":{width:`${m(h)} !important`,height:`${m(h)} !important`}}},[`&${r}-small`]:{[`&${r}-label-vertical ${r}-item ${r}-item-tail`]:{top:e.calc(n).div(2).add(g).equal()},[`${r}-item-icon ${t}-progress-inner`]:{width:`${m(f)} !important`,height:`${m(f)} !important`}}}}},wt=e=>{const{componentCls:t,descriptionMaxWidth:r,lineHeight:i,dotCurrentSize:n,dotSize:a,motionDurationSlow:s}=e;return{[`&${t}-dot, &${t}-dot${t}-small`]:{[`${t}-item`]:{"&-title":{lineHeight:i},"&-tail":{top:e.calc(e.dotSize).sub(e.calc(e.lineWidth).mul(3).equal()).div(2).equal(),width:"100%",marginTop:0,marginBottom:0,marginInline:`${m(e.calc(r).div(2).equal())} 0`,padding:0,"&::after":{width:`calc(100% - ${m(e.calc(e.marginSM).mul(2).equal())})`,height:e.calc(e.lineWidth).mul(3).equal(),marginInlineStart:e.marginSM}},"&-icon":{width:a,height:a,marginInlineStart:e.calc(e.descriptionMaxWidth).sub(a).div(2).equal(),paddingInlineEnd:0,lineHeight:m(a),background:"transparent",border:0,[`${t}-icon-dot`]:{position:"relative",float:"left",width:"100%",height:"100%",borderRadius:100,transition:`all ${s}`,"&::after":{position:"absolute",top:e.calc(e.marginSM).mul(-1).equal(),insetInlineStart:e.calc(a).sub(e.calc(e.controlHeightLG).mul(1.5).equal()).div(2).equal(),width:e.calc(e.controlHeightLG).mul(1.5).equal(),height:e.controlHeight,background:"transparent",content:'""'}}},"&-content":{width:r},[`&-process ${t}-item-icon`]:{position:"relative",top:e.calc(a).sub(n).div(2).equal(),width:n,height:n,lineHeight:m(n),background:"none",marginInlineStart:e.calc(e.descriptionMaxWidth).sub(n).div(2).equal()},[`&-process ${t}-icon`]:{[`&:first-child ${t}-icon-dot`]:{insetInlineStart:0}}}},[`&${t}-vertical${t}-dot`]:{[`${t}-item-icon`]:{marginTop:e.calc(e.controlHeight).sub(a).div(2).equal(),marginInlineStart:0,background:"none"},[`${t}-item-process ${t}-item-icon`]:{marginTop:e.calc(e.controlHeight).sub(n).div(2).equal(),top:0,insetInlineStart:e.calc(a).sub(n).div(2).equal(),marginInlineStart:0},[`${t}-item > ${t}-item-container > ${t}-item-tail`]:{top:e.calc(e.controlHeight).sub(a).div(2).equal(),insetInlineStart:0,margin:0,padding:`${m(e.calc(a).add(e.paddingXS).equal())} 0 ${m(e.paddingXS)}`,"&::after":{marginInlineStart:e.calc(a).sub(e.lineWidth).div(2).equal()}},[`&${t}-small`]:{[`${t}-item-icon`]:{marginTop:e.calc(e.controlHeightSM).sub(a).div(2).equal()},[`${t}-item-process ${t}-item-icon`]:{marginTop:e.calc(e.controlHeightSM).sub(n).div(2).equal()},[`${t}-item > ${t}-item-container > ${t}-item-tail`]:{top:e.calc(e.controlHeightSM).sub(a).div(2).equal()}},[`${t}-item:first-child ${t}-icon-dot`]:{insetInlineStart:0},[`${t}-item-content`]:{width:"inherit"}}}},jt=e=>{const{componentCls:t}=e;return{[`&${t}-rtl`]:{direction:"rtl",[`${t}-item`]:{"&-subtitle":{float:"left"}},[`&${t}-navigation`]:{[`${t}-item::after`]:{transform:"rotate(-45deg)"}},[`&${t}-vertical`]:{[`> ${t}-item`]:{"&::after":{transform:"rotate(225deg)"},[`${t}-item-icon`]:{float:"right"}}},[`&${t}-dot`]:{[`${t}-item-icon ${t}-icon-dot, &${t}-small ${t}-item-icon ${t}-icon-dot`]:{float:"right"}}}}},Nt=e=>{const{componentCls:t,iconSizeSM:r,fontSizeSM:i,fontSize:n,colorTextDescription:a}=e;return{[`&${t}-small`]:{[`&${t}-horizontal:not(${t}-label-vertical) ${t}-item`]:{paddingInlineStart:e.paddingSM,"&:first-child":{paddingInlineStart:0}},[`${t}-item-icon`]:{width:r,height:r,marginTop:0,marginBottom:0,marginInline:`0 ${m(e.marginXS)}`,fontSize:i,lineHeight:m(r),textAlign:"center",borderRadius:r},[`${t}-item-title`]:{paddingInlineEnd:e.paddingSM,fontSize:n,lineHeight:m(r),"&::after":{top:e.calc(r).div(2).equal()}},[`${t}-item-description`]:{color:a,fontSize:n},[`${t}-item-tail`]:{top:e.calc(r).div(2).sub(e.paddingXXS).equal()},[`${t}-item-custom ${t}-item-icon`]:{width:"inherit",height:"inherit",lineHeight:"inherit",background:"none",border:0,borderRadius:0,[`> ${t}-icon`]:{fontSize:r,lineHeight:m(r),transform:"none"}}}}},Tt=e=>{const{componentCls:t,iconSizeSM:r,iconSize:i}=e;return{[`&${t}-vertical`]:{display:"flex",flexDirection:"column",[`> ${t}-item`]:{display:"block",flex:"1 0 auto",paddingInlineStart:0,overflow:"visible",[`${t}-item-icon`]:{float:"left",marginInlineEnd:e.margin},[`${t}-item-content`]:{display:"block",minHeight:e.calc(e.controlHeight).mul(1.5).equal(),overflow:"hidden"},[`${t}-item-title`]:{lineHeight:m(i)},[`${t}-item-description`]:{paddingBottom:e.paddingSM}},[`> ${t}-item > ${t}-item-container > ${t}-item-tail`]:{position:"absolute",top:0,insetInlineStart:e.calc(i).div(2).sub(e.lineWidth).equal(),width:e.lineWidth,height:"100%",padding:`${m(e.calc(e.marginXXS).mul(1.5).add(i).equal())} 0 ${m(e.calc(e.marginXXS).mul(1.5).equal())}`,"&::after":{width:e.lineWidth,height:"100%"}},[`> ${t}-item:not(:last-child) > ${t}-item-container > ${t}-item-tail`]:{display:"block"},[` > ${t}-item > ${t}-item-container > ${t}-item-content > ${t}-item-title`]:{"&::after":{display:"none"}},[`&${t}-small ${t}-item-container`]:{[`${t}-item-tail`]:{position:"absolute",top:0,insetInlineStart:e.calc(r).div(2).sub(e.lineWidth).equal(),padding:`${m(e.calc(e.marginXXS).mul(1.5).add(r).equal())} 0 ${m(e.calc(e.marginXXS).mul(1.5).equal())}`},[`${t}-item-title`]:{lineHeight:m(r)}}}}},zt="wait",Pt="process",Et="finish",Ot="error",ie=(e,t)=>{const r=`${t.componentCls}-item`,i=`${e}IconColor`,n=`${e}TitleColor`,a=`${e}DescriptionColor`,s=`${e}TailColor`,p=`${e}IconBgColor`,d=`${e}IconBorderColor`,g=`${e}DotColor`;return{[`${r}-${e} ${r}-icon`]:{backgroundColor:t[p],borderColor:t[d],[`> ${t.componentCls}-icon`]:{color:t[i],[`${t.componentCls}-icon-dot`]:{background:t[g]}}},[`${r}-${e}${r}-custom ${r}-icon`]:{[`> ${t.componentCls}-icon`]:{color:t[g]}},[`${r}-${e} > ${r}-container > ${r}-content > ${r}-title`]:{color:t[n],"&::after":{backgroundColor:t[s]}},[`${r}-${e} > ${r}-container > ${r}-content > ${r}-description`]:{color:t[a]},[`${r}-${e} > ${r}-container > ${r}-tail::after`]:{backgroundColor:t[s]}}},Ht=e=>{const{componentCls:t,motionDurationSlow:r}=e,i=`${t}-item`,n=`${i}-icon`;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({[i]:{position:"relative",display:"inline-block",flex:1,overflow:"hidden",verticalAlign:"top","&:last-child":{flex:"none",[`> ${i}-container > ${i}-tail, > ${i}-container >  ${i}-content > ${i}-title::after`]:{display:"none"}}},[`${i}-container`]:{outline:"none","&:focus-visible":{[n]:Object.assign({},Fe(e))}},[`${n}, ${i}-content`]:{display:"inline-block",verticalAlign:"top"},[n]:{width:e.iconSize,height:e.iconSize,marginTop:0,marginBottom:0,marginInlineStart:0,marginInlineEnd:e.marginXS,fontSize:e.iconFontSize,fontFamily:e.fontFamily,lineHeight:m(e.iconSize),textAlign:"center",borderRadius:e.iconSize,border:`${m(e.lineWidth)} ${e.lineType} transparent`,transition:`background-color ${r}, border-color ${r}`,[`${t}-icon`]:{position:"relative",top:e.iconTop,color:e.colorPrimary,lineHeight:1}},[`${i}-tail`]:{position:"absolute",top:e.calc(e.iconSize).div(2).equal(),insetInlineStart:0,width:"100%","&::after":{display:"inline-block",width:"100%",height:e.lineWidth,background:e.colorSplit,borderRadius:e.lineWidth,transition:`background ${r}`,content:'""'}},[`${i}-title`]:{position:"relative",display:"inline-block",paddingInlineEnd:e.padding,color:e.colorText,fontSize:e.fontSizeLG,lineHeight:m(e.titleLineHeight),"&::after":{position:"absolute",top:e.calc(e.titleLineHeight).div(2).equal(),insetInlineStart:"100%",display:"block",width:9999,height:e.lineWidth,background:e.processTailColor,content:'""'}},[`${i}-subtitle`]:{display:"inline",marginInlineStart:e.marginXS,color:e.colorTextDescription,fontWeight:"normal",fontSize:e.fontSize},[`${i}-description`]:{color:e.colorTextDescription,fontSize:e.fontSize}},ie(zt,e)),ie(Pt,e)),{[`${i}-process > ${i}-container > ${i}-title`]:{fontWeight:e.fontWeightStrong}}),ie(Et,e)),ie(Ot,e)),{[`${i}${t}-next-error > ${t}-item-title::after`]:{background:e.colorError},[`${i}-disabled`]:{cursor:"not-allowed"}})},qt=e=>{const{componentCls:t,motionDurationSlow:r}=e;return{[`& ${t}-item`]:{[`&:not(${t}-item-active)`]:{[`& > ${t}-item-container[role='button']`]:{cursor:"pointer",[`${t}-item`]:{[`&-title, &-subtitle, &-description, &-icon ${t}-icon`]:{transition:`color ${r}`}},"&:hover":{[`${t}-item`]:{"&-title, &-subtitle, &-description":{color:e.colorPrimary}}}},[`&:not(${t}-item-process)`]:{[`& > ${t}-item-container[role='button']:hover`]:{[`${t}-item`]:{"&-icon":{borderColor:e.colorPrimary,[`${t}-icon`]:{color:e.colorPrimary}}}}}}},[`&${t}-horizontal:not(${t}-label-vertical)`]:{[`${t}-item`]:{paddingInlineStart:e.padding,whiteSpace:"nowrap","&:first-child":{paddingInlineStart:0},[`&:last-child ${t}-item-title`]:{paddingInlineEnd:0},"&-tail":{display:"none"},"&-description":{maxWidth:e.descriptionMaxWidth,whiteSpace:"normal"}}}}},Bt=e=>{const{componentCls:t}=e;return{[t]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},Re(e)),{display:"flex",width:"100%",fontSize:0,textAlign:"initial"}),Ht(e)),qt(e)),bt(e)),Nt(e)),Tt(e)),xt(e)),yt(e)),wt(e)),Ct(e)),jt(e)),It(e)),vt(e))}},Mt=e=>({titleLineHeight:e.controlHeight,customIconSize:e.controlHeight,customIconTop:0,customIconFontSize:e.controlHeightSM,iconSize:e.controlHeight,iconTop:-.5,iconFontSize:e.fontSize,iconSizeSM:e.fontSizeHeading3,dotSize:e.controlHeight/4,dotCurrentSize:e.controlHeightLG/4,navArrowColor:e.colorTextDisabled,navContentMaxWidth:"unset",descriptionMaxWidth:140,waitIconColor:e.wireframe?e.colorTextDisabled:e.colorTextLabel,waitIconBgColor:e.wireframe?e.colorBgContainer:e.colorFillContent,waitIconBorderColor:e.wireframe?e.colorTextDisabled:"transparent",finishIconBgColor:e.wireframe?e.colorBgContainer:e.controlItemBgActive,finishIconBorderColor:e.wireframe?e.colorPrimary:e.controlItemBgActive}),Wt=se("Steps",e=>{const{colorTextDisabled:t,controlHeightLG:r,colorTextLightSolid:i,colorText:n,colorPrimary:a,colorTextDescription:s,colorTextQuaternary:p,colorError:d,colorBorderSecondary:g,colorSplit:h}=e,f=De(e,{processIconColor:i,processTitleColor:n,processDescriptionColor:n,processIconBgColor:a,processIconBorderColor:a,processDotColor:a,processTailColor:h,waitTitleColor:s,waitDescriptionColor:s,waitTailColor:h,waitDotColor:t,finishIconColor:a,finishTitleColor:n,finishDescriptionColor:s,finishTailColor:a,finishDotColor:a,errorIconColor:i,errorTitleColor:d,errorDescriptionColor:d,errorTailColor:h,errorIconBgColor:d,errorIconBorderColor:d,errorDotColor:d,stepsNavActiveColor:a,stepsProgressSize:r,inlineDotSize:6,inlineTitleColor:p,inlineTailColor:g});return[Bt(f)]},Mt);function Dt(e){return e.filter(t=>t)}function Rt(e,t){if(e)return e;const r=ye(t).map(i=>{if(l.isValidElement(i)){const{props:n}=i;return Object.assign({},n)}return null});return Dt(r)}var Ft=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]]);return r};const qe=e=>{const{percent:t,size:r,className:i,rootClassName:n,direction:a,items:s,responsive:p=!0,current:d=0,children:g,style:h}=e,f=Ft(e,["percent","size","className","rootClassName","direction","items","responsive","current","children","style"]),{xs:u}=_e(p),{getPrefixCls:c,direction:$,className:x,style:I}=Ce("steps"),b=l.useMemo(()=>p&&u?"vertical":a,[u,a]),H=Le(r),S=c("steps",e.prefixCls),[z,W,_]=Wt(S),M=e.type==="inline",j=c("",e.iconPrefix),D=Rt(s,g),v=M?void 0:t,A=Object.assign(Object.assign({},I),h),X=G(x,{[`${S}-rtl`]:$==="rtl",[`${S}-with-progress`]:v!==void 0},i,n,W,_),L={finish:l.createElement(Xe,{className:`${S}-finish-icon`}),error:l.createElement(Ae,{className:`${S}-error-icon`})},R=y=>{let{node:T,status:P}=y;if(P==="process"&&v!==void 0){const V=H==="small"?32:40;return l.createElement("div",{className:`${S}-progress-icon`},l.createElement(Ve,{type:"circle",percent:v,size:V,strokeWidth:4,format:()=>null}),T)}return T},N=(y,T)=>y.description?l.createElement(Ge,{title:y.description},T):T;return z(l.createElement(me,Object.assign({icons:L},f,{style:A,current:d,size:H,items:D,itemRender:M?N:void 0,stepIcon:R,direction:b,prefixCls:S,iconPrefix:j,className:X})))};qe.Step=me.Step;const{Option:re}=le,_t=()=>{const e=Ke(),t=Ue(),{loading:r}=Ye(u=>u.auth),[i,n]=l.useState(0),[a]=w.useForm(),[s,p]=l.useState({}),d=async u=>{try{const c={...s,...u};console.log("Final Form Values:",c);const x=["firstName","lastName","email","password","userType","phoneNumber","address"].filter(b=>!c[b]);if(x.length>0){console.log("Missing Fields:",x),te.error(`Please fill in all required fields: ${x.join(", ")}`);return}const I={firstName:c.firstName,lastName:c.lastName,email:c.email,password:c.password,userType:c.userType,phoneNumber:c.phoneNumber,address:c.address,...c.petOwnerInfo&&{petOwnerInfo:c.petOwnerInfo},...c.veterinarianInfo&&{veterinarianInfo:c.veterinarianInfo}};console.log("Registration Data:",I),await e(Ze(I)).unwrap(),te.success("Registration successful!"),t("/dashboard")}catch(c){console.error("Registration Error:",c),te.error(c.message||"Registration failed")}},g=async()=>{try{if(i===0){const u=await a.validateFields(["firstName","lastName","email","password","phoneNumber","address"]);p(c=>({...c,...u}))}else if(i===1){const u=await a.validateFields(["userType"]);p(c=>({...c,...u}))}n(i+1)}catch(u){(u.errorFields||[]).length>0&&te.error("Please fill in all required fields for this step")}},h=()=>{n(i-1)},f=[{title:"Basic Info",content:o.jsxs(ee,{gutter:[16,16],children:[o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:"firstName",label:"First Name",rules:[{required:!0,message:"Please input your first name!"}],children:o.jsx(B,{size:"large"})})}),o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:"lastName",label:"Last Name",rules:[{required:!0,message:"Please input your last name!"}],children:o.jsx(B,{size:"large"})})}),o.jsx(O,{xs:24,children:o.jsx(w.Item,{name:"email",label:"Email",rules:[{required:!0,message:"Please input your email!"},{type:"email",message:"Please enter a valid email!"}],children:o.jsx(B,{size:"large"})})}),o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your password!"},{min:6,message:"Password must be at least 6 characters!"}],children:o.jsx(B.Password,{size:"large"})})}),o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:"phoneNumber",label:"Phone Number",rules:[{required:!0,message:"Please input your phone number!"}],children:o.jsx(B,{size:"large"})})}),o.jsx(O,{xs:24,children:o.jsx(w.Item,{name:"address",label:"Address",rules:[{required:!0,message:"Please input your address!"}],children:o.jsx(B.TextArea,{size:"large",rows:3})})})]})},{title:"User Type",content:o.jsx(ee,{justify:"center",children:o.jsx(O,{xs:24,sm:16,children:o.jsx(w.Item,{name:"userType",label:"User Type",rules:[{required:!0,message:"Please select your user type!"}],children:o.jsxs(le,{size:"large",children:[o.jsx(re,{value:"petOwner",children:"Pet Owner"}),o.jsx(re,{value:"veterinarian",children:"Veterinarian"})]})})})})},{title:"Additional Info",content:o.jsx(w.Item,{noStyle:!0,shouldUpdate:(u,c)=>u.userType!==c.userType,children:({getFieldValue:u})=>u("userType")==="petOwner"?o.jsxs(ee,{gutter:[16,16],children:[o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:["petOwnerInfo","preferredContactMethod"],label:"Preferred Contact Method",rules:[{required:!0,message:"Please select your preferred contact method!"}],children:o.jsxs(le,{size:"large",children:[o.jsx(re,{value:"phone",children:"Phone Call"}),o.jsx(re,{value:"text",children:"Text Message"})]})})}),o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{noStyle:!0,shouldUpdate:(c,$)=>{var x,I;return((x=c.petOwnerInfo)==null?void 0:x.preferredContactMethod)!==((I=$.petOwnerInfo)==null?void 0:I.preferredContactMethod)},children:({getFieldValue:c})=>{const $=c(["petOwnerInfo","preferredContactMethod"]);return o.jsx(w.Item,{name:["petOwnerInfo","contactInfo"],label:"Contact Information",rules:[{required:!0,message:`Please input your ${$||"contact"} information!`,type:$==="email"?"email":void 0,pattern:$==="phone"||$==="text"?/^\+?[1-9]\d{1,14}$/:void 0}],children:$==="phone"||$==="text"?o.jsx(B,{size:"large",placeholder:"Enter your phone number"}):o.jsx(B,{size:"large",placeholder:"Select contact method first",disabled:!0})})}})}),o.jsx(O,{xs:24,children:o.jsx(w.Item,{name:["petOwnerInfo","emergencyContact"],label:"Emergency Contact",rules:[{required:!0,message:"Please input emergency contact information!"}],children:o.jsx(B.TextArea,{size:"large",placeholder:"Name and contact information of emergency contact",rows:2})})}),o.jsx(O,{xs:24,children:o.jsx(w.Item,{name:["petOwnerInfo","veterinarian"],label:"Current Veterinarian Service Provider",children:o.jsx(B,{size:"large",placeholder:"Current veterinarian (if any)"})})})]}):u("userType")==="veterinarian"?o.jsxs(ee,{gutter:[16,16],children:[o.jsx(O,{xs:24,children:o.jsx(w.Item,{name:["veterinarianInfo","clinic"],label:"Clinic Name",rules:[{required:!0,message:"Please input your clinic name!"}],children:o.jsx(B,{size:"large"})})}),o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:["veterinarianInfo","specialization"],label:"Specialization",rules:[{required:!0,message:"Please input your specialization!"}],children:o.jsx(B,{size:"large"})})}),o.jsx(O,{xs:24,sm:12,children:o.jsx(w.Item,{name:["veterinarianInfo","experience"],label:"Years of Experience",rules:[{required:!0,message:"Please input your years of experience!"}],children:o.jsx(B,{type:"number",size:"large"})})})]}):null})}];return o.jsxs(Qe,{className:"w-full border-none",children:[o.jsx("div",{className:"steps-container mb-4",children:o.jsx(qe,{current:i,items:f.map(u=>({title:u.title})),rootClassName:"custom-steps"})}),o.jsx("div",{className:"step-content",children:o.jsxs(w,{form:a,layout:"vertical",onFinish:d,onValuesChange:()=>e(Je()),initialValues:s,children:[f[i].content,o.jsxs("div",{className:"button-container",children:[i>0?o.jsx(ae,{onClick:h,size:"large",children:"Previous"}):o.jsx("div",{}),i<f.length-1?o.jsx(ae,{type:"primary",onClick:g,size:"large",style:{backgroundColor:"#FF0080",borderColor:"#FF0080"},children:"Next"}):o.jsx(ae,{type:"primary",htmlType:"submit",loading:r,size:"large",style:{backgroundColor:"#FF0080",borderColor:"#FF0080"},children:"Register"})]})]})})]})},{Title:Lt,Text:At}=ke;function Qt(){return o.jsx(tt,{children:o.jsx(U.Content,{style:{maxWidth:"100%",width:"100%",margin:"0 auto",padding:"0 16px"},children:o.jsxs(fe,{direction:"vertical",size:"large",style:{width:"100%"},children:[o.jsxs(fe,{direction:"horizontal",justify:"space-between",align:"baseline",style:{width:"100%"},children:[o.jsx(Lt,{level:2,children:"Sign up"}),o.jsx(et,{to:"/login",style:{textDecoration:"none",color:"#FF0080"},children:o.jsx(At,{children:"Already have an account?"})})]}),o.jsx(_t,{})]})})})}export{Qt as default};
