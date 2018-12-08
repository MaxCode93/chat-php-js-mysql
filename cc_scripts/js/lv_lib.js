/*!
 * LiveMessenger v18.8.1
 * Powered by Maxwell
 */
var ccv='CUB,CUB,EU,ANDD,AREE,AFG,ATGG,AIA,ALB,ARMM,ANT,AGOO,AQ,ARG,ASM,AUTT,AUS,ABWW,AZE,BIHA,BRBB,BGDD,BEL,BFA,BGR,BHR,BDII,BENJ,BMU,BRNN,BOL,BRA,BHSS,BTN,BV,BWA,BLRY,BLZZ,CAN,CC,CODD,CAFF,COGG,CHE,CIV,COKK,CHLL,CMR,CHNN,COL,CRI,CUB,CPVV,CX,CYP,CZE,DEU,DJI,DNKK,DMA,DOM,DZA,ECU,ESTE,EGY,ESHH,ERI,ESP,ETH,FIN,FJI,FLKK,FSMM,FROO,FRA,FX,GAB,GBR,GRDD,GEO,GUFF,GHA,GIB,GRLL,GMB,GINN,GLPP,GNQQ,GRC,GS,GTM,GUM,GNBW,GUYY,HKG,HM,HND,HRV,HTI,HUN,IDN,IRLE,ISRL,IND,IO,IRQQ,IRN,ISL,ITA,JAMM,JOR,JPN,KEN,KGZ,KHM,KIR,COMKM,KNA,PRKKP,KORR,KWT,CYMKY,KAZZ,LAO,LBN,LCA,LIE,LKA,LBRR,LSO,LTU,LUX,LVA,LBYY,MAR,MCO,MDA,MDGG,MHL,MKD,MLI,MMR,MNG,MACO,MNPP,MTQQ,MRT,MSR,MLTT,MUS,MDVV,MWI,MEXX,MYS,MOZZ,NAM,NCL,NER,NFK,NGA,NIC,NLD,NOR,NPL,NRU,NIUU,NZL,OMN,PAN,PER,PYFF,PNGG,PHL,PAKK,POLL,SPMPM,PCNN,PRI,PSE,PRTT,PLWW,PRYY,QAT,REU,ROU,RUS,RWA,SAU,SLBB,SYCC,SDN,SWEE,SGP,SHN,SVNI,SJM,SVKK,SLE,SMR,SENN,SOM,SURR,STP,SLVV,SYR,SWZZ,TCA,TCDD,TF,TGO,THA,TJK,TKL,TLSM,TKMN,TUNO,TONP,TURR,TTO,TUVV,TWN,TZA,UKRA,UGA,UM,USA,URYY,UZB,VAT,VCT,VEN,VGB,VIR,VNM,VUT,WLFF,WSM,YEM,YT,SCGCS,ZAF,ZMB,ZR,ZWE,A1,A2,O1'.split(',');

var comm = Array(), comx = 0, cocc = 0, ifo = "", mstt = "", noi = 0, z = 'php', sei = 0, iin = 0; 

var ico = 0, ier = 0, con = 0, svr = 0, ctrl = 0, ms = 0, tms = 0, coue = 0, couds = 0, wo = false;


function server(u,c,e) { 
    var call = c, url = u, faile = e, req = null;
    this.send = function(act,cccp,type,c1,u1,e1) { 
    req = request();
	if (type == null) type = "POST"; 
    if (c1 != null) call = c1; else c1 = call;
    if (u1 != null) url = u1; else u1 = url;
    if (e1 != null) faile = e1; else e1 = faile;
	   req.onreadystatechange = function() {
              if (req.readyState == 4) {
                  if (req.status == 200) {
                      var itm = req.responseText; 
                      call(itm,cccp); 
                    } else {
                faile(); 
            }
        }
    }
    var rurl = url+"."+z; 
        req.open(type, rurl, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
        ms=nnow(); 
        req.send(act);
    }
	function request(){
       try { w = new XMLHttpRequest(); } catch (err1) {
       try { w = new ActiveXObject('Msxml2.XMLHTTP'); } catch (err2) {
       try { w = new ActiveXObject("Microsoft.XMLHTTP"); } catch (err3) {
             w = false;}}}
      return w;
    }
}

function arrival(w,cp){
    iin = 0;
    ico = 0;
    ier = 0;
	con = 1;
    var prs = w.split("\r\n");
    if (cp == ctrl) {
    tms = (nnow()-ms)/1000;
    runall(prs);
    mstt = "CONECTADO";
    showc(0, 0, 0, 1);
	$('#chat').attr('class','ust0');
	$('#chat2').html('#SalaPública');
	$('.zne-us').css('opacity','');
    }
}
	
function failed(w){
    mstt = "<font color=FF0000><b>CONEXI&Oacute;N PERDIDA, RECONECTANDO...</b></font>";
    showc(0, 0, 1, 0);
    iin = 0;
    ico = 0;
    ier = 1;
	con = 0;
	$('#chat').attr('class','sin_conexion');
	$('#chat2').html('(Conexi&oacute;n Perdida)');
	$('.zne-us').css('opacity','.75');
}
	

function addinfo(m,n,q,i){ 
    if (i==null) {noi++;i=noi;}
    ifo+= (ifo!='')?'|':''; 
    ifo+='i='+i+'&act='+m+n; 
    if (q==1) sendinfo();  
}
	
function sendinfo(){
	if (oln == 1) { ifo+= "|i=0&act=ping&svr=" + svr; }
    var qr = "data="+escape(ifo); 
    ctrl++;
    showc(1,0,0,0);
    ico = 0;
    iin = 1;
	con = 0;
    AJAX.send(qr,ctrl);
}

function interval() {
    checktimer(); 
	checkactive();
	checkonline();
    ico++; 
	
	if (thefast == 5) ve = 9;
    if (thefast == 6) ve = 5;
	if (thefast == 7) ve = 1;
	
    if (ier == 1 && iin == 0) {
        if (ico > 3) {
            sendinfo(); 
        }
    } else if (iin == 1) {
        if (ico > (10 + ve)) { 
             mstt = "RETRASADO";
             showc(null, 1);
             sendinfo();
	     $('#chat').attr('class','sin_conexion');
	     $('#chat2').html('(Conexi&oacute;n Lenta)');
		 $('.zne-us').css('opacity','.40');
        }
    } else {
         if (ifo != '') {
             sendinfo();
        } else if (oln == 1 && ico > (3 + ve)) { 
             sendinfo();
        }
    }
	     if (mstt == 'CONECTADO') { 
	         showc(1,0,0,0); 
	    }
	
    s_ofrepeat();
}

function showc(w1,w2,w3,w4) {
    var v1, v2;
	 if (w1 == 0) v1 = 'none';
    else v1 = '';
     if (w2 == 0) v2 = 'none';
    else v2 = '';
     if (w3 == 0) v3 = 'none';
    else v3 = '';
     if (w4 == 0) v4 = 'none';
    else v4 = '';
	if (w1 != null) $('#impc').css('display',v1);
	if (w2 != null) $('#imsat').css('display',v2);
	if (w3 != null) $('#imant').css('display',v3);
	if (w4 != null) $('#imesp').css('display',v4);
	$('#ms1').html(mstt);
	$('#ms2').html(tms);
}

function reciv(w) {

}

function received(w){
   var ar = ifo.split('\|'), ret = '';
       for (var t = 0; t < ar.length; t++) {
            var io = extract(ar[t]);
        if (io.i > w && io.i != 0) {
            ret += (ret == '') ? '' : '|';
            ret += ar[t];
        }
    }
	ifo = ret;
}

function nnow() {
    var w = new Date();
    return w.getTime();
}

function runall(w){
    for (var t=0;t<w.length;++t) {
    comx++;
    comx=(comx>400)?0:comx;
    comm[comx]=w[t];
    }
    runco();
}

function runco() { 
    if (cocc!=comx){
    cocc++;
    cocc=(cocc>400)?0:cocc;
    var ex=comm[cocc];
    try {eval(ex);} catch(e) {eval_error(ex);}
	if (ex.indexOf('textarrived')!=-1) setTimeout('runco()',(Math.random()*100+300));
	else runco();
    }
}

function eval_error(w){
   if (oln==1 && me!=null) {
       if ((me.wt&1)==1) {
	      var tx='<table style="width:150px;"><font color="A63B00">';
		 tx+='*** <b>ERROR:</b>&nbsp;'+w.substr(0,60)+'...</a></table><br>';
	     writeon('*',tx);
        }
	  }
}

function _dis(w){
    return w.style.display
}
	
function retok(w) {
    me = w;
    if (w.lnk == null) w.lnk = 0;
    var v = '<img src="cc_data/44x42/th-'+ w.thumb +'" style="border:#28427E solid 1px;border-radius:2px;" width="19" height="19" />'+'&nbsp;<a id="user" class="user">'+me.user.substr(0,8)+'</a>';
    $('#ameself').html(v);
}

function createflagrules(){
	var al='';	for (var t=0; t<=242;++t){
		fl=cou(t);var x=(t%11)*16;var y=parseInt(t/11)*11;
   		al+='.fl_'+fl+' {background:url(cc_recursos/flags.gif) -'+x+'px -'+y+'px no-repeat; height:11px; width:16px; vertical-align:middle;}';}
	$(document.body).append("<style>"+al+"</style>");
}

function _app(a,w) { 
    a = _oz(a);
    try {
        a.appendChild(w);
    } catch (e) {
       alert(e);
    }
}

function _oz(w) {
    return (w == document) ? w.getElementsByTagName("body")[0] : w;
}

function _sa(w,a,v) { 
    if (w = _ob(w)){
        w.setAttribute(a,v);
	  }
}

function _ga(w,a) { 
    if (w = _ob(w))
        return w.getAttribute(a);
}

function _next(w) { 
    w = w.nextSibling;
    while (w && w.tagName == null) {
        w = w.nextSibling;
    }
    return w;
}

function _cn(o,c) {if(o=_ob(o)) o.className=c} 

function _ac(o,w){ 
         o = _oz(o); 
    try{ o.appendChild(w); } catch (e) { alert(e) } 
}		

function _ce(w,a) { 
       a = _dc(a);
        return a.createElement(w);
}

function _dc(w) { 
         return (w != null) ? w : document;
}

function _instb(w,a,e) { 
      if (w = _ob(w)){
        w.insertBefore(a,e);
	   }
}

function _os(e) {
         var w = e.srcElement ? e.srcElement : e.target;
       return w;
}

function _vi(w,o) {
   document.getElementById(o).style.visibility = "hidden";
}

function _gcn(w) {
     return w.className
}

function _p10(w,c) {
    if (c == null)
        c = 1;
    for (var i = 0; i < c; i++)
        w = w.parentNode;
    return w;
}
	
function _ps(w) {
             w = w.previousSibling;
      while (w && w.tagName == null) {
           w = w.previousSibling;
         }
      return w;
}

function _ob(w) {
    if (typeof (w) != 'object')
        w = _go(w);
    return w;
}

function _go(w) {
    var ex = document.getElementById(w);
    if (!ex) {
        var ai = document.getElementsByTagName('iframe');
        for (var i = 0; i < ai.length; i++) {
            var exe = 'ex=' + ai[i].id + (!IE ? ".contentWindow" : "") + '.document.getElementById(w)';
            try {
            eval(exe);
            } catch (e) {
            try {
            eval('ex=' + ai[i].id + "." + w);
             } catch (e1) {
           }
         }
     if (ex)
     break;
    }
    }
    return ex;
}

function extract(w) {
    if (w == null)
         return Array();
       var ret = Array();
       var mprop = w.split("\&");
    for (var it in mprop) {
       var res = mprop[it].split("=");
       var ind = res.shift();var rest = res.join("=");
       ret[ind] = rest;
    }
        return ret;
}

String.prototype.encodeHTML = function() {
    var re = this;
    re = re.replace(/&/g, ';a;');
    re = re.replace(/\'/g, ';c;');
    re = re.replace(/\=/g, ';e;');
    re = re.replace(/\</g, ';l;');
    re = re.replace(/\>/g, ';g;');
    return re;
}

String.prototype.decodeHTML = function() { 
    var re = this;
    re = re.replace(/;a;/g, '&');
    re = re.replace(/;c;/g, '\'');
    re = re.replace(/;e;/g, '=');
    re = re.replace(/;l;/g, '&lt;');
    re = re.replace(/;g;/g, '&gt;');
    re = re.replace(/\</g, '&lt;');
    re = re.replace(/\>/g, '&gt;');
    return re;
}

var navType=Array();
navType['mo']='Mozilla'; 
navType['ie']='Internet Explorer'; 
navType['mz']='Firefox'; 
navType['op']='Opera'; 
navType['sa']='Safari'; 
navType['go']='Google Chrome'; 
navType['ch']='Google Chromium'; 
navType['ns']='NetScape'; 
navType['ka']='K-Meleon'; 
navType['ep']='Epiphany'; 
navType['ic']='Iceweasel'; 
navType['ko']='Konqueror'; 
navType['av']='Avant'; 
navType['ls']='Lunascape'; 
navType['co']='Conkeror'; 
navType['fl']='Flock'; 
navType['gr']='GreenBrowser'; 
navType['ma']='Maxthon'; 
navType['or']='Orca'; 
navType['sk']='SeaMonkey'; 
navType['am']='Amaya'; 
navType['ao']='Aol'; 
navType['ga']='Galeon'; 
navType['uk']='Desconocido';

String.prototype.trim = function() { 
    return this.replace(/^\s+|\s+$/, '');
}

var IE = (document.getElementById(0))?true:false;

function cod(w){ 
   w=parseInt(w); 
      return (ccv[w].substr(0,3));
}

function cou(w){ 
       w=parseInt(w); 
       var w=ccv[w].toLowerCase(); 
   if (w.length<4){
        return w.substr(0,2);
    } else if (w.length==4){ 
       return w.substr(0,1)+w.substr(3,1);
    } else return w.substr(3); 
}

function whitesup(w) { 
    var ret = w, c = -1, total = 0;
    if (whitesup.arguments[1] == null) {
        whitesup.arguments[1] = 0;
        whitesup.arguments.length = 2
    }
    for (var i = 1; i < whitesup.arguments.length; i++) {
        p = 0;
        c = -1;
        if (ret.childNodes.length == 0)
            return null;
        do {
            m = ret.childNodes[p++];
            try {
                if (m.tagName)
                    c++;
            } catch (e) {
                c++;
            }
        } while (c < whitesup.arguments[i])
        ret = m
    }
    return ret;
}

function _pv() {
    var o = null, re = '';
    var de = '';
    for (var i = 0; i < _pv.arguments.length; i++) {
        if (o = _ob(_pv.arguments[i])) {
            re += (re == '' ? '' : '&');
            re += o.id + "=" + o.value.trim();
        } else {
            eval('de=' + _pv.arguments[i]);
            re += (re == '' ? '' : '&');
            re += _pv.arguments[i] + "=" + de;
        }
    }
    return re;
}

function long2ip(w) {
    var d = false;
    if (!isNaN(w) && (w >= 0 || w <= 4294967295)) {
        d = Math.floor(w / Math.pow(256, 3)) + '.' + Math.floor((w % Math.pow(256, 3)) / Math.pow(256, 2)) + '.' + Math.floor(((w % Math.pow(256, 3)) % Math.pow(256, 2)) / Math.pow(256, 1)) + '.' + Math.floor((((w % Math.pow(256, 3)) % Math.pow(256, 2)) % Math.pow(256, 1)) / Math.pow(256, 0));
    }
    return d;
};