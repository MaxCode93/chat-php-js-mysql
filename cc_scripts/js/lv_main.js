////////////////////////////////////////
//            LiveMessenger           // 
//   @Package LiveMessenger v18.8.1   //
//         Powered By Maxwell         //
////////////////////////////////////////
var AJAX = new server("./cc_clases/lv_main", arrival, failed);

var init = now();
var myses = null;
var oln = -1;
var me = null;
var dest = '*';
var lspp = null;
var zonetab = null;
var lt = null;
var lns = 1;
var thef = Array();
var thes = Array();
var moreifo = Array();
var sum = 0;
var tag = null;
var adm = null;
var seluser = null;
var data = null;
var thuser = null;
var thphoto = null;
var mysfriends = null;

var stts = Array('No-Registrado', 'Registrado', 'Usuario Nivel 1', 'Usuario Nivel 2','Usuario Estrella','CiberChica','CiberChico','Supervisor', 'Princesa', 'Admin', 'Admin-SalaPublica');

var star = Array('(Ninguna)', '1 Estrella', '1 Estrellas y Media', '2 Estrellas', '2 Estrellas y Media', '3 Estrellas','3 Estrellas y Media', '4 Estrellas', 'Supervisor', 'Princesa', 'Admin', 'Admin-SalaPublica', 'Maxwell');

function admincp(i) {

    var wt = '<table width="100%" cellpadding="0" cellspacing="0" height="28px;"><tr><td class="topmyzone" style="padding:3px;padding-left:10px;color:#FFFFFF;"><b>Usuario:</b>&nbsp;' + i.user + '';

    if ((me.max & 1) == 1) {
        wt += '&nbsp;(' + i.wt + ')';
    }

    wt += '</td></tr></table><br>';

    var a = ((me.priv & 32) == 32) ? '' : 'disabled';
    var b = ((me.priv & 64) == 64) ? '' : 'disabled';
    var c = ((me.priv & 128) == 128) ? '' : 'disabled';
    var d = (me.priv == 255) ? 7 : 8;

    if ((me.priv & 255) == 255) {
        var d = (me.priv == 255) ? 12 : 10;
    }

    if (a == '') {
        wt += '&nbsp;&nbsp;<b><img height="18" width="18" align="top" src="./cc_recursos/home/menu/acp-iconos.png">&nbsp;Iconos:</b><br>&nbsp;&nbsp;<select name="mstar" id="mstar" >';
        for (var t = 0; t < d; ++t) {
            ck = (i.att == t) ? 'Selected' : '';
            wt += '<option value="' + t + '" ' + ck + '>' + star[t] + '</option>';
        }
        wt += '</select><input style="position:absolute;right:5px;" class="btn btn-primary btn-submit" type="button" value="Salvar" onClick="chglev(\'' + i.user + '\');"><br><br> ';
    }
    if (b == '') {
        wt += '&nbsp;&nbsp;<b><img height="18" width="18" align="top" src="./cc_recursos/home/menu/acp-privi.png">&nbsp;Status:</b><br>&nbsp;&nbsp;<select name="thestt" id="thestt">';
        var lgt = (me.priv & 128) == 128 ? stts.length : 7; // Se me ocurrio y funciono para user sin 255 no ven mas de 4 estrellas (Max!!)
		  for (var t = 0; t < lgt; ++t) {
            var ck = (i.stt == t) ? 'Selected' : '';
            wt += '<option value="' + t + '" ' + ck + '>' + stts[t] + '</option>';
        }
        wt += '</select>';
        wt += '<input style="position:absolute;right:5px;" class="btn btn-primary btn-submit" type="button" value="Salvar" onClick="chgstt(\'' + i.user + '\');"><br><br>';
    }
    if (c == '') {
        wt += '&nbsp;&nbsp;<b>Privilegios:</b><br>';
        var p = 128;
        for (var t = 0; t < 1; ++t) {
            var ck = ((p & i.priv) == p) ? 'checked' : '';
            var ck = ((i.priv & 1) == 1) ? 'checked' : '';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk1" ' + c + ' ' + ck + '/> Ver IP y Horas<br>'; //Añadidas tambien las horas(max!!)
            var ck = ((i.priv & 2) == 2) ? 'checked' : '';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk2" ' + c + ' ' + ck + '/> Banear y Expulzar<br>';
            var ck = ((i.priv & 4) == 4) ? 'checked' : '';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk3" ' + c + ' ' + ck + '/> Desbanear<br>';
            var ck = ((i.priv & 8) == 8) ? 'checked' : '';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk4" ' + c + ' ' + ck + '/> Aprobar Ficheros<br>';
            var ck = ((i.priv & 16) == 16) ? 'checked' : '';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk6" ' + c + ' ' + ck + '/> Control Stars<br>';
            var ck = ((i.priv & 64) == 64) ? 'checked' : 'disabled';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk7" ' + c + ' ' + ck + '/> Control de Estados<br>';
            var ck = ((i.priv & 128) == 128) ? 'checked' : 'disabled';
            wt += '&nbsp;&nbsp;<input type="checkbox" id="chchk8" ' + c + ' ' + ck + '/> Control de Privilegios';

            p = p / 2;
        }
        wt += '<input style="position:absolute;right:5px;" class="btn btn-primary btn-submit" type="button" value="Salvar" onClick="chgprv();" ' + c + '><br><br><br>';
    }
    $('#winrunner').html(wt)
}
function start_sound(w) {
    var i = Array('no_sound', 'enter_user', 'exit_user', 'mes_priv', 'notify_user', 'sol_friend', 'user_men');
    if (varnosound != '1') {
       $('#start_sound').html('<audio id="chatAudio"><source src="cc_data/sonidos/' + i[w] + '.wav" type="audio/wav" hidden="true"></audio>');
       $('#chatAudio')[0].play();
}
}
$(function() {
    mytitle();
    createflagrules();

    $('#wt_user').val($.cookie('wt_user'));

    document.oncontextmenu = function(e) {
        return false;
    }

    setInterval(interval, 1000);

    addinfo('initialize', '&loc=' + locate(), 1, 0);
    
    $('#theradio').mouseenter(function() {
        $('#theradio').animate({
            top: 11
        });
    });

    $(window).resize(function(e) {
        hidemepopup();
    });

    if ($(document.body).width() > 1024) {
        $('#thetim,#time_y,#time_y1').css('display', 'none');
        $('#time_x').css('display', '');
        $('#ply').attr('width', 228);
    }

    $('#actlist A').click(function() {
        var vs = $(this).attr('vis');
        addinfo('state', '&lnk=' + vs, 1, 0);
        hidemepopup();
    })

    $('#lookthumb').click(function() {
        downnow(thphoto, thuser);
    })

    $(document.body).click(function(e) {

        $('#dvcontmnu').hide();

    })

    $(document.body).mouseup(function(e) {

        var bt = (e.which < 2) ? 0 : 1;
        var w = (e.target) ? e.target : e.srcElement;

        hidemepopup(w);

        if (oln == 1) $('#theradio').animate({
            top: -18
        });
    })

});

function downnow(w, v) {
    hidemepopup();
    $('#downnow').attr('src', 'files.php?act=download&thumb=' + w + '&nameuser=' + v);
}

$('#my_thumb').mouseenter(function() {
    if ($('#photo_esp').css('display') == 'none') {
        $('#chg_thumb').css('opacity', '.60');
        $('#camera_line').fadeOut(200);
        $('#chg_thumb').css('display', '').animate({
            height: 35
        }, 80).mouseenter(function() {
            $('#chg_thumb').css('opacity', '.90');
        }).mouseleave(function() {
            $('#chg_thumb').css('opacity', '.60');
        })
    }
}).mouseleave(function() {
    $('#chg_thumb').css('display', 'none').animate({
        height: 2
    }, 80);
    $('#camera_line').show();
});

function quees(w) {

    alert(w);

}

window.onunload = function() {
    if (oln > 0) {
        addinfo('s_exit', '&q=1&thumb=' + me.thumb, 1, 0);
    }
}

function mytitle() {
    this.xOffset = -10;
    this.yOffset = -35;
    $(".mytitle").unbind().hover(
        function(e) {
            this.t = this.title;
            this.title = '';
            this.top = (e.pageY + yOffset);
            this.left = (e.pageX + xOffset);
            $('body').append('<p id="mytitle"><img id="mytitle_arrow" />' + this.t + '</p>');
            $('#mytitle #mytitle_arrow').attr('src', 'cc_recursos/mytitle.png');
            $('#mytitle').css("top", this.top + "px").css("left", this.left + "px").fadeIn("slow");
        },
        function() {
            this.title = this.t;
            $("#mytitle").fadeOut("slow").remove();
        }
    ).mousemove(
        function(e) {
            this.top = (e.pageY + yOffset);
            this.left = (e.pageX + xOffset);
            $("#mytitle").css("top", this.top + "px").css("left", this.left + "px");
        }
    );
};

function writing() {
    if ($('#txmess').val() != '' && dest != '*' && wri == false) {
        wri = true;
        addinfo('s_write', '&dest=' + dest, 1);
    }
}

function locate() {
    return encodeURI(location.href.trim().encodeHTML());
}

zonetabs('tabs', 'tabsclick');

function zonetabs(w, v) {
    zonetab = create_zone(w, 'wtzone');
    _sa(zonetab, 'oclick', v);
    addtab(zonetab, 'tbwel', '<label id="chat"></label>&nbsp;<a id="chat2"></a><label slmx="0" class="mx" style="display:none" id="**" />');
   	clicktab(_go('tbwel'));
}


function addtab(w, i, t, c) {
    w = _ob(w);
    if (c == null) c = 'tab';
    var to = 0,
        tabl = whitesup(w, 0, 0, 0, 0, 0);
    if (t == null) t = i;
    var nw = _ce('td');
    nw.innerHTML = t;
    _sa(nw, 'tab', c);
    nw.onclick = function() {
        clicktab(this)
    }
    nw.ondblclick = function() {
        clstab(this)
    }
    nw.id = i;
    _cn(nw, c + '2');
    _ac(tabl, nw);
    return nw;
}

var cfv = 0;

function notification(w, m, v) {
    var d = cfv++;
    var i = extract(w);
    var t = (i.sex != 'M') ? 'a' : 'o';
    var n = (v == 1) ? '- te ha mencionado' : '- tu amig' + t;
    var time = datetime();
    var tt = _ce('div');
    time2 = now();
    var nf = '<table id="ntc' + d + '" class="ntc" time=' + time2 + ' style="background:#2c3e50;z-index:257;width:100%;margin-bottom:3px;border-radius:4px;"><td valign="top"><img onclick="look(\'' + i.thumb + '\',\'' + i.user + '\')" style=\"cursor:pointer;\" title="Ver Foto" src="./cc_data/44x42/th-' + i.thumb + '" width="46" height="46" ></td><td align="center" onclick="clicknotif(\'' + d + '\');"><span id="q_call" style="color:white;font-size:9px;">' + i.user + ' ' + n + '</span><br>&nbsp;&nbsp;<span style="font-size:12px;" id="mns" title=' + time + '><a style="color:white;font-weight:bold;">' + m + '</a></span><br></td></table>'
    $(tt).html(nf);
    $('#call').append(tt);
    var x = $('.zne-us').width() - 8;
    y = $('.zne-us').width();
    $('#call').css({
        'width': x,
        'margin-left': -y
    }).show();
}

function notificationpv(w, m, v) {  // Notifica entrada de usuarios con privilegios admin (Max!!)
    var d = cfv++;
    var i = extract(w);
    var time = datetime();
    var tt = _ce('div');
    time2 = now();
    var nf = '<table id="ntc' + d + '" class="ntc" time=' + time2 + ' style="background:#2c3e50;z-index:257;width:100%;margin-bottom:3px;border-radius:4px;"><td valign="top"><img onclick="look(\'' + i.thumb + '\',\'' + i.user + '\')" style=\"cursor:pointer;\" title="Ver Foto" src="./cc_data/44x42/th-' + i.thumb + '" width="46" height="46"></td><td align="center" onclick="clicknotif(\'' + d + '\');"><span id="q_call" style="color:white;font-size:9px;">' + m + '</span><br>&nbsp;&nbsp;<span style="font-size:12px;" id="mns" title=' + time + '><a style="color:white;font-weight:bold;">' + i.user + '</a></span><br></td></table>'
    $(tt).html(nf);
    $('#call').append(tt);
    var x = $('.zne-us').width() - 8;
    y = $('.zne-us').width();
    $('#call').css({
        'width': x,
        'margin-left': -y
    }).show();
}

function clicknotif(w) {
    $('#ntc' + w).remove();
}

function checkonline() {
    var now1 = now();
    $('.ntc').each(function() {
        if (parseInt($(this).attr('time')) < (now1 - (1000 * 20))) $(this).remove();
    })
}


function clstab(w) {
    var n = _next(w);
    if (w.id == 'tbwel') return;
    if (n == null) n = _ps(w);
    if (n != null) {
        clicktab(n);
        $(w).remove();
    }
}

function clicktab(w) {
    var addtab = '';
    var pa = _p10(w, 6);
    var cl = _ga(pa, 'oclick');
    var tb = _ga(w, 'tab');
    if (lt != null) _cn(lt, tb + '0');
    _cn(w, tb + '1');
    lt = w;
    if (cl != null) try {
        eval(cl + '(w);');
    } catch (e) {}
    var mx = _go("_" + dest + "_mx");
    _sa(mx, 'mx', 0);
    $(mx).css('display', 'none');
}

function tabsclick(w) {
    if (lspp != null) lspp.innerHTML = _go('wrimain').innerHTML;
    dest = (w.id == 'tbwel') ? '*' : w.id.substr(1);
    var mtr = (dest == '*') ? whitesup(_go('tbusers'), 0, 0) : _go(dest + "_");
    var spp = whitesup(mtr, 0, 1);
    _go('wrimain').innerHTML = spp.innerHTML;
    lspp = spp;
    maxscroll();
    _go('txmess').focus();
    checkinout();
    putstyle();
}

function create_zone(w, n) {
    w = _ob(w);
    var add = '<div id="' + n + '" class="dvzone0"><div class="dvzone1"><div class="dvzone2"><table height="100%" border="0" cellpadding="0" cellspacing="3"><tr></tr></table></div></div></div>';
    w.innerHTML = add;
    return _go(n);
}


function myfb(w) {
    var id = "https://www.facebook.com/" + w;
    return '-<font color="A63B00"> Facebook: <a href="' + id + '" target="_blank"><label class="myfb"></label></a> </font>';
}

function enteruser(w, f, m, s, n) {
    var i = extract(w);
    var nu = insertuser(w);
    var rew = revise(i.user);
    $(nu).fadeIn(300);
    var us = formate(i, 2);
    if (f != '') {
        us += myfb(f);
    }
    if (moreifo[i.user]) {
        us += " <font color=666666>" + moreifo[i.user] + "</font>";
        delete(moreifo[i.user]);
    }
    var es = formate(i, 9);
    var thb = formate(i, 5);
    var onclick = (i.user != me.user) ? 'profile_offline(\'' + i.user + '\');' : 'opclick("prof");';
    var tx = '<table class="mainpub"><td><table><tr><td><img onclick=' + onclick + ' src="cc_data/44x42/th-' + thb + '" title="Entra" style="cursor:pointer;" class="avatar" align="absmiddle"></td></table></td><td><table><tr><td valign="top">' + es + '</td></tr><tr><td><label class="log-in"></label>&nbsp; ' + us + '</td></tr></table></td></table>';
    writeon('*', tx);	
    checkinout();
    thetotal();
    time = now();
    var ust = formate(i, 6);
    var thb = formate(i, 5);
    var thb1 = '<img src="cc_data/44x42/th-' + thb + '"/>';
    var thb2 = thb.split('\.');
    thb2 = thb2[0];
    var ex = $('#w' + thb2).get(0);
    if (ex == null) {
        $('#float-mnu4').append('<span title="' + ust + '" onclick=' + onclick + ' time="' + time + '" id="w' + thb2 + '" class="usernew">' + thb1 + '</span>');
        $('.usernew').each(function() {
            if ($('.usernew').length <= 10) return;
            $(this).remove();
        })
    }
    _sa("_" + i.user + "_im", 'class', 'ust' + i.lnk);
    if (i.user == me.user) {
        if (m > 0) {
            $('#messenger').css('display', '');
            $('#messenger').html(m);
        }
    }
    if (i.user == me.user) {
        if (n > 0) {
            $('#notify').css('display', '');
            $('#notify').html(n);
        }
    }
    if (i.user == me.user) {
        if (s > 0) {
            $('#pendientes').css('display', '');
            $('#pendientes').html(s);
        }
    }
    if (rew == -1) {} else {
        notification(w, 'Se ha Conectado al Chat...'); // Notificaciones y sonidos segun los privilegios (Max!!)
         
			}
if (i.user != me.user)	{		
	if (i.stt == 7 && i.user != me.user){
        notificationpv(w, '<a style="font-weight:bold;">Se ha Conectado al Chat el Supervisor...');
        
			}
	if (i.stt == 8 && i.user != me.user){
        notificationpv(w, '<a style="font-weight:bold;">Se ha Conectado al Chat la Princesa...');
        
		}
	if (i.stt == 9 && i.user != me.user){
        notificationpv(w, '<a style="font-weight:bold;">Se ha Conectado al Chat el Admin...');
      
		}
	if (i.stt == 10 && i.user != me.user){
        notificationpv(w, '<a style="font-weight:bold;">Se ha Conectado al Chat el Admin-SalaPublica...');
       
		}
	if(i.stt == 11 && i.user != me.user){
        notificationpv(w, '<a style="font-weight:bold;">Se ha Conectado al Chat el Jefe del Staff...');
    	}	
    }		
}

function revise(w) {
    return $.inArray(w, mysfriends);
}


function s_usonline(w) {
    var us = insertuser(w);
    $(us).show();
}

function now() {
    return new Date().getTime()
}

function chgprf(w) {
    var i = extract(w);
    if (i.user == me.user)
        retok(i);
    insertuser(w);
    var tx = '<font color="A63B00">*** <b>' + i.user + '</b> se registra en el Chat...</font>';
    writeon('*', tx);
    $('#wait').hide();
}

function chgthumb(w) {
    var i = extract(w);
    if (i.user == me.user)
        retok(i);
    insertuser(w);
    var tx = '<font color="A63B00">*** <b>' + i.user + '</b> cambio su Foto de Perfil...</font>';
    writeon('*', tx);
    $('#up_thumb').attr("src", 'cc_data/prfl/pf-' + me.thumb + '');
    $('#wtphoto').attr("src", 'cc_data/44x42/th-' + me.thumb + '');
    $('#photo_back,#photo_esp').hide();
    $('#camera').show();
    $('#bsphoto').attr('disabled', false);
}

function s_changprof(w) {
    var i = extract(w);
    if (i.user == me.user)
        retok(i);
    insertuser(w);
    $('#wait').hide();
}

function s_changprofile(u, s, a, w, v) {
    var tx = '';
    var sexs = {
        'M': 'masculino',
        'F': 'femenino'
    };
    tx = (tx == '') ? '<b>' + u + '</b> modific&oacute; su perfil...' : tx + ".";
    writeon('*', '<font color="A63B00">*** ' + tx + '</font>');
}

function chgst(w) {
    var i = extract(w);
    var ni = i.user + "_";
    if (nu = _go(ni)) {
        insertuser(w);
		var tx = '<font color=A63B00>*** <b>' + i.oper + '</b> cambia estado [' + stts[i.stt] + '] a <b>' + i.user + "</b>...";
        tx += "<br>";
        if (i.user == me.user)
            retok(i);
        writeon('*', tx);
    }
}

function chgpriv(w) {
    var i = extract(w);
    var ni = i.user + "_";
    if (nu = _go(ni)) {
        insertuser(w);
		var tx = '<font color=A63B00>*** <b>' + i.oper + '</b> modifica privilegios a <b>' + i.user + "</b>...";
        tx += "<br>";
        if (i.user == me.user)
            retok(i);
        writeon('*', tx);
    }
}

function chgatt(w) {
    var i = extract(w);
    var ni = i.user + "_";
    if (nu = _go(ni)) {
        insertuser(w);
	    var tx = '<font color=A63B00>*** <b>' + i.oper + '</b> modifica stars de <b>' + i.user + '</b> a ' + star[i.att] + '...';
        if (i.user == me.user)
            retok(i);
        writeon('*', tx);
    }
}

function usermenu(i) {  //Añadidas las fotos al menu(Max!!)
    var w = '';
    w += '<div id="usermenu">';
    w += '<a onClick="showprofile(data);"><center><img height="16" width="16" align="top" src="./cc_recursos/home/menu/acp-perfil.png">&nbsp;Ver Perfil&nbsp;</center></a>';
    if ((me.priv & 2) == 2) {
        w += '<a onClick="banuser(0,data);"><center><img height="16" width="16" align="top" src="./cc_recursos/home/menu/acp-ban.png">&nbsp;&nbsp;Expulsar/Banear&nbsp;</center></a>';
    }
    if ((me.priv & 32) == 32) {
        w += '<a onClick="showcpanel(data);"><center><img height="16" width="16" align="top" src="./cc_recursos/home/menu/acp-privi.png">&nbsp;Privilegios&nbsp;</center></a>';
    }
    w += '</div>';
    $('#mainmenu2').html(w);
}

function formate(i, c) {
    var w = i.cou,
        e = cou(w);
    var re = '<a class="stt' + i.stt + '" onclick="nickclick(\'' + i.user + '\');">' + i.user + '</a>';
    if ((c & 4) == 4) {
        re = thumb(i.thumb, 46, 46, i.user);
    }
    if ((c & 5) == 5) {
        re = i.thumb;
    }
	if ((c & 2) == 2) {
        re = '<font color="A63B00"><font color="A63B00"></label>Usando: <label class="nav' + i.nav + '"></label></font>&nbsp;<font color="666666">' + navType[i.nav] + '</font>';
    }
	    if ((c & 6) == 6) {
        re = i.user;
    }
	return re;
}


function nickclick(w) {
    if (oln == 1) {
        var te = $('#txmess').val();
        te += (te == '') ? w + ' ' : ' ' + w + " ";
        $('#txmess').val(te).focus();
    }
}

function thumb(s, w, h, e) {
    var onclick = (me.user != e) ? 'profile_offline(\'' + e + '\');' : 'opclick("prof");';
    return '<img onclick=' + onclick + ' src="cc_data/44x42/th-' + s + '" style="cursor:pointer;" class="avatar" width="' + w + '" height="' + h + '" align="absmiddle"/> ';
}

function stdimg(s, w, h) {
    return '<img src="cc_recursos/' + s + '" align="absmiddle" width="' + w + '" height="' + h + '" /> ';
}

function wait() {
    $('#wait').center().show();
}

function up_upload() {
    $('#camera').hide();
    $('#photo_esp').show();
    $('#photo_back').show();
}

function thetotal() {
    var tu = whitesup(_go('tbusers'), 0, 0);
    var c = 0;
    do {
        if (_dis(tu) != 'none') c++;

        tu = _next(tu);
    } while (tu != null);
    $('#maxusers, #maxusersfuera').html(c);
    return c;
}

function reu(p, u) {
    var un = u.user.toLowerCase();
    var su = parseInt(u.stt);
    var w = whitesup(p, 0);
    w = _next(w);
    while (w != null) {
        var us = $(w).attr('user').toLowerCase();
        if (us != un) {
            var st = parseInt($(w).attr('stt'));
            if (st < su)
                break;
            else if (st == su)
                if (us > un)
                    break;
        }
        w = _next(w);
    }
    return w;
}

function serverinuse() {
    addinfo('sessionend', '&q=1', 1, 0);
}

function server_conected(w) {
    $.cookie('val', myses);
    $.cookie('lns', '0');
    oln = 0;
    lns = $.cookie('lns');
    if (lns == null) {
        lns = 1;
        $.cookie('lns', '1');
    }
}

var txb = 0,
    txi = 0,
    txu = 0,
    txc = 0,
    txg = '0000';

function textt(v, w) {
    var q = $(v).attr('check');
    q = (q == 1) ? 0 : 1;
    _sa(v, 'check', q);
    if (q == 1) {
        $(v).attr('class', 'on_buttom buttom button-radius');
    } else {
        $(v).attr('class', 'buttom button-radius');
    }
    switch (w) {
        case 0:
            txb = q;
            break;
        case 1:
            txi = q;
            break;
        case 2:
            txu = q;
            break;
    }
    $('#txmess').focus();
    putstyle();
}

function putstyle() {
    var v = '',
        w = '';
    $('#writing').remove();
    $('#looking').remove();
    if (dest != '*') w = _ga("_" + dest, 'write');
    if (txb == 1) v = 'tb ';
    if (txi == 1) v += 'ti ';
    if (txu == 1) v += 'tu ';
    if (txc != 0) v += 'tx' + txc;
    if (w == '1') {
        var i = extract($($("#" + dest + "_").get(0)).attr('data'));
        writeon(dest, '<table class="mainpub"><td><table><tr><td><img src="cc_data/44x42/th-' + i.thumb + '" style="cursor:pointer;" class="avatar" align="absmiddle"/></td></table></td><td><table><tr><td><label class="write_on" title="Est&aacute; Escribiendo..." style="position:relative;left:-7px;"></label></td></tr></table></td></table>', dest, 'writing');
        _sa("_" + dest + "_im", 'class', 'ust3');
    }
    $('#txmess').attr('class', v);
    txg = txb + '' + txi + '' + txu + '' + txc;
}

function getclass(w) {
    var v = '';
    if (w.charAt(0) != '0')
        v = 'tb ';
    if (w.charAt(1) != '0')
        v += 'ti ';
    if (w.charAt(2) != '0')
        v += 'tu ';
    if (w.charAt(3) != '0')
        v += 'tx' + w.charAt(3);
    return v;
}

function loguser(w) {
    var us = ['LiveMessenger', 'livemessenger', 'BLOODLUST', 'BLOOD_LUST', 'blood_lust', 'El_Virus', 'Sistema', 'sistema', 'Root', 'root', '_root', 'XdPaZ', 'XdPaz', 'el_indomableee', 'lokotee', 'perra', 'puta', 'lokoo', 'loco', 'culo', 'culoo', 'VOLTAGE', 'VoLtaGe', 'loko', 'Loko', 'Lokos', 'lokos','Puzzy','puzzy','_Puzzy','Diablo','diablo','Drakula','drakula','dracula','_maxwell_','_Maxwell'];
    return $.inArray(w, us);
}

function chgprv() {
    var p = 1;
    sum = 0;
    for (var t = 1; t < 9; ++t) {
        var ck = _go('chchk' + t);
        if (ck.checked == true)
            sum = sum + p;
        p += p;
    }
    var st = _pv('seluser', 'sum');
    addinfo('chgprv', '&' + st, 1);
}

function s_login() {  //Agregada la compobacion para bots(o se puede agregar un captcha) (Max!!)
    if ($('#checkbox2').attr('checked') == 'checked') {
            var us = $('#wt_user').val();
            var val = loguser(us);
            if (us.length > 3 && us.length < 16) {
            if (val == -1) {
            if (isv(us) == true) {
                addinfo('login', '&' + _pv('wt_user', 'wt_pw', 'myses', 'lns'), 1);
                
                $('#loading').css('display', '');
            } else
notif({
	           msg: "<b>Oops!</b> Ha ocurrido un error!",
	           type: "error",
	           position: "center"
            });
        } else
notif({
	           msg: "<b>Oops!</b> Nick no permitido!",
	           type: "error",
	           position: "center"
            });
    } else
notif({
	           msg: "<b>Oops!</b> El Nick debe tener como minimo 4 caracteres!",
	           type: "error",
	           position: "center"
            });    
} else {
notif({
	           msg: "<b>Oops!</b> Se te ha olvidado marcar Soy Humano! O eres un bot!",
	           type: "error",
	           position: "center"
            });
 }
}

var lki = 0,
    da = null;

function start_complete(w, m, a) {
    me = extract(w), oln = 1, adm = a, lki = now();
    if (m == 0) $.cookie('lns', parseInt(lns) + 1);
    if (me.adjunto == 0) $('#butt4,#adjuntos').hide();
	if ((me.adjunto == 1) || (me.priv == 255)){ 
	$('#butt4,#adjuntos').show();
		}else{
    $('#butt4,#adjuntos').hide();
    }
	if ((me.acp & 1) == 1) $('#runner').show();
    if (me.reg < 1) $('#welcome').center().show(450);
	if (me.reg == 0) $('#pref,#perfil,#friends,#dmensajes,#ushoras,#usrules,#chgpass').hide();
	if (me.reg == 0) $('#register').show();
	if (me.reg == 1) $('#chgpass').show();
	if (me.reg == 1) {
    $('#pref,#perfil,#friends,#dmensajes,#ushoras,#usrules,#chgpass').show();
	$('#register').hide();
	}
	if ((me.priv & 4) == 4) $('#lookbanus,#hr1').show();
    if ((me.priv & 16) == 16) $('.buttl').show();
	if ((me.priv & 255) == 255) $('#sendhours').show();
    var sv = $('#save_user').get(0);
    $.cookie('wt_user', me.user);
    $('#userslist,#zne-tabs,#writetr,#float-mnu').show();
    $('#thetim,#thetim2').html(numtotim());
    $('#stars_ok,#wricont').css('display', '');
    $('#wrilogin').hide();
    $('#loading').css('display', 'none');
    retok(me);
    $('#pub1').attr('class', '');
    $('#theradio').animate({
        top: -18
    }, 600);
    $('#wt_user,#wt_pw,#login_ok').attr('disabled', false);
    if ((me.reg & 1) == 0) {
        $('#backdiv').show(); 
		$('#inimessop').show();
        var x = $('#init').offset().right;
        var y = $('#init').offset().top - $('#inimess').height() - 10;
        $('#inimess').css({
            'right': x,
            'top': y
        }).show();
    }
	if ((me.reg & 1) == 0) {
     	$('#inimessop').show();
       }

    acttitle();
    divpin();
}

function ocultarmess() {
  $('#inimessop').hide(); 
}

function ocultarmessinit() {
  $('#inimess').hide(); 
}

function showvismenu() {
    var x = $('#ameself').offset().left + $('#ameself').width() - $('#actlist').width() + 1;
    var y = $('#ameself').offset().top + $('#ameself').height() + 12;
    $('#actlist').css({
        'left': x,
        'top': y
    }).show();
    $('#user').attr('class', 'user_active');
    popup = $('#actlist');
}

function privuser(w) {
    var us = $(w).attr('user');
    var lk = $(w).attr('lnk');
    if (us == me.user) return;
    var ex = _go("_" + us);
    if (ex == null)
	    ex = addtab(zonetab, "_" + us, '<label id="_' + us + '_im" class="ust' + lk + '"></label> ' + us + '<label mx="0" class="mx" style="display:none" id="_' + us + '_mx"></label>');
   	clicktab(ex);
	    _go('txmess').focus();
}

function privuser_from_cell(w) {
    var i = extract(w);
    var us = i.user
    var lk = i.lnk
    if (us == me.user) return;
    var ex = _go("_" + us);
    if (ex == null)
	    ex = addtab(zonetab, "_" + us, '<label id="_' + us + '_im" class="ust' + lk + '"></label> ' + us + '<label mx="0" class="mx" style="display:none" id="_' + us + '_mx"></label>');
    clicktab(ex);
   _go('txmess').focus();
}

function credits(w) {
    tx = '<FONT color=#A63B00>' + w + '</font>';
    writeon('*', tx);
}

function m_topic(w) {
    tx = '<h3 class="topic2"><font color=#ec6558>*** TOPIC: </font><font color=#176093>' + w + '</font></h3>';
    $('#wtopic').val(w);
    writeon('*', tx);
}

function m_acttopic() {
    addinfo('m_chgtopic', '&m_wtopic=' + $('#wtopic').val(), 1);
notif({
  msg: "<b>Éxito:</b> Topic modificado correctamente!",
  type: "success",
  position: "center"
});
}

function isv(w) {
    if (w.match(/^([A-Za-z0-9_]{4,8})+$/)) {
        try {
            eval("var " + w + "=1;");
            return true;
        } catch (e) {}
    }
    return false;
}

function sendcls() {
    $('#superalert').fadeOut(200);
    $('#shot').hide(200);
    $('#backdiv').hide();
}


var emoticon = false;

function showemot() {
    if (emoticon == false) {
        emoticon = true;
        $('#dv_icons').html(tab_emot());
    }
    var x = $('.butt3').offset().left;
    var y = $('.butt3').offset().top - $('#dv_icons').height() - 6;
    $('#dv_icons').css({
        'left': x,
        'top': y
    }).show();
    $('#emoticons').attr('class', 'emoticons_active');
    $('.butt3').attr('class', 'butt3_active');
    popup = $('#dv_icons');
}

function showemot_more() {
    emoticon = false;
    $('#dv_icons').html(tab_emot_more());
}

function showfiles() {
    $('#dvfiles').html(createfiles());
    var x = $('.butt4').offset().left;
    var y = $('.butt4').offset().top - $('#dvfiles').height() - 2;
    $('#dvfiles').css({
        'left': x,
        'top': y
    }).show();
    $('#adjuntos').attr('class', 'adjuntos_active');
    $('.butt4').attr('class', 'butt4_active');
    popup = $('#dvfiles');
}

function showcol() {
    $('#dv_color').html(selectcolor());
    var x = $('.butt6').offset().left;
    var y = $('.butt6').offset().top - $('#dv_color').height() - 2;
    $('#dv_color').css({
        'left': x,
        'top': y
    }).show();
    $('#colors').attr('class', 'colors_active');
    $('.butt6').attr('class', 'butt6_active');
    popup = $('#dv_color');
}

function filerecived(n, s) {
    for (var t = 0; t < thef.length; ++t) {
        if (thef[t].toLowerCase() == n.toLowerCase()) {
            thes[t] = s;
            sfiles();
            break;
        }
    }
}

function errormess(n, s) {
    for (var t = 0; t < thef.length; ++t) {
        if (thef[t].toLowerCase() == n.toLowerCase()) {
            thes[t] = s;
            sfiles();
            notif({
               msg: "<b>Oops!</b> Imagen demasiado grande o extensión no permitida!",
               type: "error",
               position: "center"
            });
            break;
        }
    }
}

function errorfilemax(n, s) {
    for (var t = 0; t < thef.length; ++t) {
        if (thef[t].toLowerCase() == n.toLowerCase()) {
            thes[t] = s;
            sfiles();
            notif({
               msg: "<b>Oops!</b> Solo puedes tener máximo 10 adjuntos!",
               type: "error",
               position: "center"
            });
            break;
        }
    }
}
 
function createfiles() {
    if (me.stt > 0) {
        var t = 0;

        var noadj = (tt != 0) ? '' : '<tr><td>&nbsp;&nbsp;<i><font color=666666>(No hay ficheros adjuntos...)</font></i></td></tr>';
        var tb = '<form id="sendf" name="sendf" action="./cc_clases/upload.php" enctype="multipart/form-data" method="post"><table cellspacing="0"><tr><td align="left" height="20" class="topbutt" colspan="2"><span style="font-weight:bold;color:#FFFFFF;font-size:9px;">(Max. 1mb, Ext. jpeg, jpg, png y se eliminan en 1 mes)</span></td></tr><tr><td><input fil="1" class="adjuntar" type="file" name="asfiles" id="asfiles" size="45" onchange="lookthef(this);"></td><div style="display:none;" id="err">sssdddd</div></tr>';
        var tt = 0;
        for (t = 0; t < thef.length; ++t) {
			
            if (parseInt(thes[t]) > -1) {
                var del = thes[t] == 0 ? '<img width="13" height="13" src="./cc_recursos/loading.gif" fil="1" align="absmiddle"> Adjuntando: <b> ' : '';
                var href = thes[t] == 0 ? '' : 'class="myblue" onclick="javascript:sendtfile(\'' + thef[t] + '\')"';
                tb += '<tr><tr><td> &nbsp;' + del + '<label class="adjt" align="absmiddle"/><a ' + href + '>' + thef[t] + '</a></td></tr></tr>';
                tt++;
            }
        }
        tb += noadj + "</table></form>";
    } else {
        var tb = '<table><tr><td salign="left" height="20" class="topbutt" colspan="2"><span style="font-weight:bold;color:#FFFFFF;font-size:9px;">&nbsp;Enviar un fichero:</span></td></tr><tr><td><i><font color=666666>(Debes estar registrado en el chat...)&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</font></i></td></tr><tr><td style="border-bottom:solid 1px #CDD1E3;"></td></tr></table>';
    }

    return tb;
}

function lookthef(w) {
    if (me == null || oln == 0) return;
    var tf = w.value.split("\\");
    var fi = tf[tf.length - 1];
    for (var t = 0; t < thef.length; ++t) {
        if (thef[t].toLowerCase() == fi.toLowerCase())
            return;
    }
    thef.unshift(fi);
    thes.unshift('0');
    sendfile();
}

var fu = 0;

function sendfile() {
    fu++;
    var md = 'fupload' + fu;
    var fr = null;
    try {
        fr = _ce('<IFRAME name="' + md + '">');
    } catch (e) {
        fr = _ce('IFRAME');
    }
    fr.id = md;
    fr.name = md;
    $(fr).hide();
    _app(document, fr);
    var frm = _go('sendf');
    frm.target = md;
    frm.submit();
    sfiles();
}

function sfiles() {
    showfiles(_go('butt4'), true);
}

var filcc = 0;

function sendtfile(w) {
    if (me.stt > 0) {
        filcc++;
        var b = '<div id="file' + filcc + '" file="' + w + '"></div>';
        var tb = '<table cellspacing="0" style="width:auto;min-width:137px;"><tr><td align="left" height="20" class="topbutt">&nbsp;<a style="color:#FFFFFF;font-weight:bold;font-size:10px;">Enviar un fichero:</a></td></tr><tr><td style="padding:7px">&nbsp;&nbsp;Compartir: <label class="presi" align="absmiddle"/>&nbsp;<b>' + w + '</b></td></tr><tr><td>&nbsp;&nbsp;<input type="button" onclick="hidemepopup();confirm_file(\'file' + filcc + '\');" value="Confirmar envio..." class="btn btn-primary btn-submit"><br><br></td></tr><tr><td>&nbsp;&nbsp;<input class="myblue btn btn-primary btn-submit" type="button" value="Eliminar" onclick="hidemepopup();delfile(\'' + w + '\')"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="myblue btn btn-default btn-reset" type="button" value="Cancelar" onclick="hidemepopup();" ></a></td></tr><tr><td style="border-bottom:dashed 1px #CCCCCC;"></td></tr></table>';
    } else {
        tb = '<table style=\"width:180px;\"><tr><td style="background:#BAC1DB;color:FFFFFF;">No se pudo compartir el fichero...</td></tr><hr><tr><td><input type="button" onclick="hidemepopup();" value="Aceptar"></td></tr></table>';
    }
    var x = $('#butt4').offset().left;
    var y = $('#butt4').offset().top - $('#butt4').height() - 102;
    $('#dvfiles').css({
        'left': x,
        'top': y
    }).html(tb).show();
    writeon(dest, b);

}

function delfile(w) {
swal({   
		title: "¿Deseas eliminar el fichero?",   
		text: " " + w + " ",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "¡Si!",   
		cancelButtonText: "No",   
		closeOnConfirm: true,   
		closeOnCancel: true }, 

		function(isConfirm){   
			if (isConfirm) {     
            delfileok(w);
			notif({
                 msg: "<b>Éxito:</b> Archivo eliminado!",
                 type: "success",
				 position: "center"
              });
			
			}  
		});

	
}


function delfileok(w) {
    addinfo('delfile', '&f=' + w, 1);
}

function confirm_file(w) {
    var fi = _ga(w, 'file');
    var addtab = '';
    if ((me.priv & 8) != 8 && dest == '*') {
        addtab += '<a><font color=666666>*** Se ha compartido el fichero <a class="myblue">' + fi + '</a> un operador debe aprobarlo en p&uacute;blico...</font></a>';
    } else {
        addtab += '<a><font color=666666>*** Se ha compartido el fichero <a class="myblue">' + fi + '</a> </font>';
    }
    addinfo('sendfile', '&f=' + fi + "&dest=" + dest, 1);
    writeon(dest, addtab);
}

function filesendto(w) {
    var i = extract(w);
    var al = null,
        madd = "",
        ms = null;
    if (al = _go(i.fr + "_")) {
        var di = extract(_ga(al, 'data'));
       	if(i.prev==''){
			     var th = 'adjunto.jpg';
			}
			else{
		         var th = i.prev;
			}
        var adj = (th == '') ? 'adjunto.jpg' : th;
        if (i.dest == '*') {
            if ((me.priv & 8) == 8) {
                madd = '  <b onclick="fileaprobe(\'' + w + '\')" class="myblue"><font color="A63B00"><u>Aprobar</u></font></b>';
                ms = '<font color="A63B00">*** <b>' + i.fr + '</b> intenta compartir el fichero <img width="44" height="42" src="cc_data/tmp/' + th + '"/> <a onclick="ver_file(\'' + w + '\')" target="ifphoto" class="myblue"><label class="adjt"></label>' + i.f + '</a>' + madd + '</font>';
            }
        } else {
            ms = '<font color="A63B00">*** <b>' + i.fr + '</b></font><font color=666666> comparte el fichero </font><a onclick="ver_file(\'' + w + '\')" target="ifphoto" class="myblue"><label class="adjt"></label>' + i.f + '</a>' + madd + '';
            addinfo('savefile', '&from=' + i.fr + '&dest=' + i.dest + '&file=' + i.f, 1);
        }
        if (ms != null) {
            needtab(i);
            writeon(i.dest, ms, i.fr);
        }
    }
}

function fileaprobe(w) {
swal({   
		title: "Aprobar Fichero: ",   
		text: "Esta seguro de aprobar el fichero?",   
		type: "success",   
		showCancelButton: true,   
		confirmButtonColor: "green",   
		confirmButtonText: "¡Si!",   
		cancelButtonText: "No",   
		closeOnConfirm: true,   
		closeOnCancel: true }, 

		function(isConfirm){   
			if (isConfirm) {     
            aprobe(w);  
			}  
		});
		
}

function ver_file(w) {
    var i = extract(w);

    var th = i.prev;
    var adj = (th == '') ? 'adjunto.jpg' : th;
	var img1 = '<img src="cc_data/tmp/' + adj + '"/>';
swal({   
		title: "Descargar Fichero: ",   
		text: "Descargar Fichero: "+ i.f +" " ,   
		type: "success",   
		showCancelButton: true,   
		confirmButtonColor: "green",   
		confirmButtonText: "¡Si!",   
		cancelButtonText: "No",   
		closeOnConfirm: true,   
		closeOnCancel: true }, 

		function(isConfirm){   
			if (isConfirm) {
            location.href = "./cc_clases/download.php?au=" + i.au + "";				
			}  
		});
}

function aprobe(w) {
    var i = extract(w);
    addinfo('aprobfile', '&f=' + i.f + '&dest=*&u=' + i.fr + '&au=' + i.au, 1);
}

function fileaprobed(w) {
    var i = extract(w);
    var al = null;
	var th = i.prev;
    if (al = _go(i.ap + "_")) {
        var ii = extract(_ga(al, 'data'));
        if(th==''){
		if (ii.priv & 8 == 8) {
            var ms = '<font color="A63B00">*** <b>' + i.u + '</b></font><font color=666666> comparte el fichero</font><a onclick="ver_file(\'' + w + '\')" target="ifphoto" class="myblue"><label class="adjt"></label>' + i.f + '</a> <font color=666666>aprobado por: </font> <font color=993300><b>' + i.ap + '</b></font></div>';
            var tx = '' + ms + '<br>';
            writeon('*', tx);
        }
		
		}else{
		if (ii.priv & 8 == 8) {
            var ms = '<font color="A63B00">*** <b>' + i.u + '</b></font><font color=666666> comparte el fichero</font>  <img width="44" height="42" onclick="ver_file(\'' + w + '\')" target="ifphoto" class="myblue" src="cc_data/tmp/' + th + '"/><a onclick="ver_file(\'' + w + '\')" target="ifphoto" class="myblue"><label class="adjt"></label>' + i.f + '</a> <font color=666666>aprobado por: </font> <font color=993300><b>' + i.ap + '</b></font></div>';
            var tx = '' + ms + '<br>';
            writeon('*', tx);
        }	
    }
}

}


var msg = '',
    wri = false;

function sendtxt() {

    wri = false, text = $('#txmess').val().trim(), gf = contchar(text, '(');

    if (me == null) {
        return false;
    }

    if (gf > 3) {
        notif({
               msg: "<b>Oops!</b> Solo se permiten máximo 3 emoticons!",
               type: "error",
               position: "center"
    });
        return false;
    }

    if (text != '') {
        msg = encodeURI(text.encodeHTML());
        _go('txmess').value = '';
        var tx = _pv('msg', 'txg', 'dest');
        addinfo('s_mess', '&fr=' + me.user + '&' + tx + '&itv=' + intval(), 1);
        createtxt('s_mess&fr=' + me.user + '&' + tx + '&itv=' + intval());
    }

    if (($.cookie('shping')) != '1') {
        if (text.substr(0, 1) != "/") {
            var mess = (text.length > 35) ? text.substr(0, 35) + "..." : text;
            mess = unescape2(mess);
            $('#dvtemp DIV').append('<a id="x_send" style="display:none;"><b>Enviado</b>: ' + mess + '</a>');
            $('#dvtemp A').show();
            if ($('#dvtemp A').length > 1) $('#x_send').remove();
        }
    }

    putstyle();
    return false;
}

function unescape2(w) {
    w = unescape(w);
    w = w.replace(/</g, '&lt;');
    w = w.replace(/>/g, '&gt;');
    return w;
}

function stat_one() {}

function intval() {
    return parseInt((now() - init) / 100);
}

function force_disconect() {
    discall();
}

function noanswer() {
    var ad = '',
        nr = '',
        da = '';
    var tt = noanswer.arguments.length;
    for (var i = 0; i < tt; i++) {
        var us = noanswer.arguments[i];
        nr += (nr == '') ? '' : ', ';
        nr += us;
        $('#' + us + '_').fadeOut(300);
    }
    if (tt > 1) {
        ad = "N", da = "n";
    }
    var tx = '<font color="A63B00">*** SALE' + ad + ': <font color="666666"><i>' + nr + '</i></font> <font color=666666><i>[no responde' + da + ']</i></font><br>';
    thetotal();
    writeon('*', tx);
    checkinout();
}

function checkinout() {
    var ssbn = whitesup(zonetab, 0, 0, 0, 0, 0).cells;
    for (var t = 1; t < ssbn.length; ++t) {
        var cl = 'tab0';
        var ust = ssbn[t];
        if (lt == ust) cl = "tab1";
        var mi = _go(ust.id.substr(1) + "_");
        if (mi != null) {
            if (_dis(mi) != '') cl += " gray";
        } else cl += " gray";
        if (_gcn(ust) != cl && _gcn(ust) != 'tab2') $(ust).attr('class', cl);
    }
}

function banuser(w, i) {
    $('#ckban').attr('checked', (w == 1) ? 'checked' : false);
    $('#backdiv').show();
    $('#banuser').center().show();
    $('#expuser').html(i.user);
}

function u_exit(w) {
    var i = extract(w),
        ms = '';
    var rew = revise(i.user);
    us = i.user;
    user = $('#' + us + '_').attr('data');
    switch (i.tag) {
        case 'exp':
            ms = 'expulsa';
            break;
        case 'ban':
            ms = 'banea';
            break;
    }
    if (rew == -1) {} else {
        if (i.tag == '0') txt = 'Se ha Desconectado del Chat...';
        if (i.tag == 'exp') txt = 'Ha sido expulsada del Chat...';
        if (i.tag == 'ban') txt = 'Ha sido baneada del Chat...';
        notification(user, txt);
	    }
    var mo = decodeURI(i.motiv.decodeHTML());
    var addtab = (me.priv == 255) ? '[' + i.ip + ']' : '';
    if (i.tag != '0') {
        var tx = '<font color="A63B00">*** <b>' + i.oper + '</b> ' + ms + ' a ' + us + '</font> <font color="666666">[Motivo: ' + mo + ' ]</font><br>';
    } else {
        var tx = '<table class="mainpub"><td><table><tr><td><img src="cc_data/44x42/th-' + i.thumb + '" title="Sale" style="cursor:pointer;" class="avatar" onclick="javascript:profile_offline(\'' + us + '\');" align="absmiddle"></td></table></td><td><table><tr><td valign="top"><font color="666666"><i>' + us + '</i></font></td></tr><tr><td><label class="log-out"></label>&nbsp;&nbsp; <font color="666666"><i>[' + mo + '] ' + addtab + '</i></font></td></tr></table></td></table>';
    }
    var us_ = _go(us + "_");
    if (_dis(us_) == '') {
        writeon('*', tx);
        $('#' + us + '_').css('display', 'none');
        _sa("_" + us + "_im", 'class', 'ust5');
        var ti = i.oper + '&nbsp;te&nbsp;' + ms + '&nbsp;del Chat';
        if (us == me.user) {
            systemalert(0, ti, 'Motivo: [ ' + mo + ' ]');
           	lns = 0;
            $.cookie('lns', '1');
            discall();
        }
        checkinout();
        thetotal();
    }
}

function discall() {
    ifo = '';
    oln = 0;
    me = null;
    deleteallu();
    $('#wrilogin').show();
    $('#runner,#oper,.buttl,#topic,#lookbanus,#float-mnu').hide();
    $('#theradio').animate({
        top: -20
    });
}

function deleteallu() {
    var tu = whitesup(_go('tbusers'), 0, 0);
    var nw = _next(tu),
        ns = null;
    do {
        ns = _next(nw);
        $(nw).remove();
    } while (nw = ns);
}

function textarrived(tx) {
    var i = extract(tx);
    needtab(i);
    if (i.fr != me.user) createtxt(tx);
    if (i.dest != "*") start_sound(3);
    var w = null;
    if (i.dest != '*')
	       if (i.fr != dest) {
            var w = $("#_" + i.fr + "_mx").get(0);
            $(w).show();
            var mx = parseInt($(w).attr('mx')) + 1;
      		$(w).html(mx);
            $(w).attr('mx', mx);
        }
}

function needtab(i) {
    if (i.dest == me.user) {
        var pv = null;
        pv = $("#_" + i.fr).get(0);
        if (pv == null) {
            var ufr = $("#" + i.fr + "_").get(0);
            var da = $(ufr).attr('data');
            var q = extract(da);
            if (varnopv == '1' && (q.priv & 255) != 255) {
                addinfo('nopv', '&dest=' + i.fr);
            } else {
                pv = addtab(zonetab, "_" + i.fr, '<label id="_' + i.fr + '_im" class="ust' + q.lnk + '"></label> ' + i.fr + '<label mx="0" class="mx" style="display:none" id="_' + i.fr + '_mx"></label>');
            }
        }
    }
}

function nopriv(w) {
    var i = extract(w);
    var tx = '<font color="A63B00">*** <b>' + i.fr + '</b> no acepta privados...</font>';
    writeon(i.fr, tx);
}

function moreinfo(w) {
    var i = extract(w);
    var tx = '<font color="666666">' + decodeURI(i.info.decodeHTML()) + '</font>';
    moreifo[i.us] = tx;
}

function nogreat(msg) {
    var prt = msg.split(' ');
    for (var t = 0; t < prt.length; ++t) {
        if (prt[t].length > 25) prt[t] = prt[t].substr(0, 24) + "...";
    }
    return prt.join(' ');
}

function createtxt(w) {
    var i = extract(w),
        a1 = '',
        a2 = '',
        mc = '',
        ufr = null;
    if (varformat == '0') mc = getclass(i.txg);
    else i.msg = i.msg.toLowerCase();
    a1 = '<a style="font-size:14px;" class="' + mc + '">';
    a2 = "</a>";
    var msg = decodeURI(i.msg.decodeHTML());
    msg = nogreat(msg);
    msg = emot(msg);
    ufr = $("#" + i.fr + "_").get(0);

    if (ufr != null) {
        var da = $(ufr).attr('data');
        var q = extract(da);
        if (_dis(ufr) == '') {
            var nick = formate(q, 1);
            var thumb = formate(q, 4);
            if (q.user != me.user) {
                var fl = '<label class="fl"></label>'
            } else {
                var fl = '<label class="fl1"></label>'
            }
            if (msg.indexOf(me.user) != -1) {
                if (i.dest == '*') {
                    if (dest != '*') {
                        notification(da, msg, 1);
                    }
                }
                fl = '<label class="fl2"></label>'
                msg = colour(msg, me.user);
                tx = msg;
                start_sound(6);
            }
            var tx = '<table class="mainpub"><td><table><tr><td>' + thumb + '</td></table></td><td><table><tr><td valign="top">' + nick + '&nbsp;<label class="m_msg"></label>&nbsp;<a class="mtime">' + datetime() + '</a></td></tr><tr><td>' + fl + '&nbsp;' + a1 + msg + a2 + '</td></tr></table></td></table>'
            if (i.fr != me.user) {
                _sa("_" + i.fr, 'write', '');
                _sa("_" + i.fr + "_im", 'class', 'ust' + q.lnk);
            }
            putstyle();
            writeon(i.dest, tx, i.fr);
        }
    }

    var thb2 = q.thumb.split('\.');
    thb2 = thb2[0];
    if (i.dest == '*') {
        var ex = $('#x' + thb2).get(0);
        time = now();
        var thb0 = '<img src="cc_data/44x42/th-' + q.thumb + '"/>';
        var onclick = (me.user != q.user) ? 'profile_offline(\'' + q.user + '\');' : 'opclick("prof");';
        if (ex == null) {
            $('#float-mnu2').append('<span title="' + q.user + '" onclick=' + onclick + ' time="' + time + '" id="x' + thb2 + '" class="uactive">' + thb0 + '</span>');
        } else {
            $(ex).attr('time', time);
        }
    }
}

function checkactive() {
    var now1 = now();
    $('.uactive').each(function() {
        if (parseInt($(this).attr('time')) < (now1 - (1000 * 300))) $(this).remove();
    })
}

function datetime() {
    var ttim = new Date();
    var mins = ttim.getMinutes();
    var ho = ttim.getHours();
    if (ho > 12) {
        ho = ho - 12;
    }
    return ho + ":" + ((mins >= 10) ? mins : '0' + mins);
}

function emot(w) {
    for (var i = 0; i < 127; ++i) {
        var c = i;
        var em = "(" + c + ")";
        var gf = '<img src="cc_recursos/emot/i' + c + '.gif" style="vertical-align:middle;" width="33" height="33" />';
        w = w.replace(em, gf);
    }
    return w;
}

function tab_emot() {
    var addtab = '',
        c = 0;
    addtab += '<table cellspacing="0" border="0" cellpadding="0">';
    addtab += '<tr><td align="left" height="25" class="topmyzone" valign="top"><span style="font-weight:bold;font-size:10px;color:#FFFFFF;position:relative;top:4px;" >&nbsp;&nbsp;Emoticones:</span><span style="font-weight:bold;font-size:10px;color:#FFFFFF;cursor:pointer;position:absolute;top:6px;right:8px;" onclick="showemot_more();" align="right">Siguientes</span></td></tr>';
    addtab += '<tr><td><div>'
    for (var t = 1; t < 10; t++) {
        addtab += '<table cellspacing="0" cellpadding="1">'
        addtab += '<tr>';
        for (var i = 1; i < 10; i++) {
            c++;
            addtab += '<td><img onclick="selemot(' + c + ');" src="./cc_recursos/emot/i' + c + '.gif" class="whitesup_emot"></td>';
        }
        addtab += "</tr>";
        addtab += '</table>';
    }
    addtab += '</div></td></tr>';
    return addtab;
}

function tab_emot_more() {
    var addtab = '',
        c = 45;
    addtab += '<table cellspacing="0" border="0" cellpadding="0">';
    addtab += '<tr><td align="left" height="25" class="topmyzone" valign="top"><span style="font-weight:bold;font-size:10px;color:#FFFFFF;position:relative;top:4px;" >&nbsp;&nbsp;Emoticons:</span><span style="font-weight:bold;font-size:10px;color:#FFFFFF;cursor:pointer;position:absolute;top:6px;right:8px;" onclick="showemot();" align="right">Atras</span></td></tr>';
    addtab += '<tr><td><div>'
    for (var t = 1; t < 10; t++) {
        addtab += '<table cellspacing="0" cellpadding="1">'
        addtab += '<tr>';
        for (var i = 1; i < 10; i++) {
            c++;
            addtab += '<td><img onclick="selemot(' + c + ');" src="./cc_recursos/emot/i' + c + '.gif" class="whitesup_emot"></td>';
        }
        addtab += "</tr>";
        addtab += '</table>';
    }
    addtab += '</div></td></tr>';
    return addtab;
}


function selemot(w) {
    $('#txmess').val($('#txmess').val() + "(" + w + ")");
    $('#txmess').focus();
    hidemepopup();
}

function contchar(str1, str2) {
    ret = 0;
    var a = str1.indexOf(str2);
    while (a != -1) {
        ret++;
        str1 = str1.substr(a + str2.length);
        var a = str1.indexOf(str2)
    }
    return ret;
}

function colour(w, n) {
    var ret = ''
    for (var t = 0; t < n.length; ++t) {
        ret += '<b class="tx' + parseInt(Math.random() * 9 + 1) + '">' + n.substr(t, 1) + "</b>";
    }
    w = w.replace(n, "<b>[" + ret + "]</b>");
    return w;
}

function writeon(to, tx, fr, id) {
    if (fr == null) {
        fr = to;
    }
    var ds = null,
        q = null,
        dst = null;
    if (to == dest || (to == me.user && dest == fr)) {
        ds = _go('wrimain');
    } else {
        if (to == '*') dst = whitesup(_go('tbusers'), 0, 0);
        else {
            dst = _go(fr + "_");
        }
        ds = whitesup(dst, 0, 1);
        var ths = _go("_" + fr);
        if (ths != null) {
            if ($(ths).attr('user') != dest && to != '*') $(ths).attr('class', 'tab2');
        }
    }
    while (ds.children.length > 100) {
        ds.removeChild(ds.firstChild);
    }

    id = (id == null) ? '' : id;
    var ms = _ce('div');
    ms.id = id;
    $(ms).html(tx);
    _app(ds, ms);
    maxscroll();
}

function maxscroll() {
    var ob = $('#wriscroll').get(0);
    ob.scrollTop = ob.scrollHeight;
}

function showcpanel(i, c) {
    if (i.stt == 0) {
        noreg();
    }

    if (i.stt != 0) {
        showpanel();
    }
}

function noreg() {
    $('#noreg').html('No registrado...');
    $('#noreg').center().show();
    popup = $('#noreg');
}


function showpanel() {
    $('#cpanel').center();
    admincp(data);
    $('#cpanel').center().show();
}

function submenu(e, w) {
    data = extract($(w).attr('data'));
    seluser = data.user;
    usermenu(data);
    var bt = (e.which < 2) ? 0 : 1;
    if (bt == 1) {
        var x = e.clientX;
        var y = e.clientY;
        $('#dvcontmnu').css({
            'left': x,
            'top': y
        }).show();
    }
}

function selectcolor() {
    var wr = '<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">';
    wr += '<tr><td colspan="5" align="center" height="20" class="topbutt" style="font-weight:bold;font-size:9px;color:FFFFFF;">Color de la Letra:</td></tr><tr><td><div>'
    wr += '<table height="100%" width="100%" border="0" cellspacing="1" cellpadding="0" id="tbformat">'
    wr += '<tr>'
    wr += '<td class="zcol1" clr="1"><a>&nbsp;</a></td>'
    wr += '<td class="zcol2" clr="2"><a>&nbsp;</a></td>'
    wr += '<td class="zcol3" clr="3"><a>&nbsp;</a></td>'
    wr += '<td class="zcol4" clr="4"><a>&nbsp;</a></td>'
    wr += '<td class="zcol5" clr="5"><a>&nbsp;</a></td>'
    wr += '<tr>'
    wr += '<td class="zcol6" clr="6"><a>&nbsp;</a></td>'
    wr += '<td class="zcol7" clr="7"><a>&nbsp;</a></td>'
    wr += '<td class="zcol8" clr="8"><a>&nbsp;</a></td>'
    wr += '<td class="zcol9" clr="9"><a>&nbsp;</a></td>'
    wr += '<td class="zcolA" clr="A"><a>&nbsp;</a></td>'
    wr += '<tr>'
    wr += '<td class="zcolB" clr="B"><a>&nbsp;</a></td>'
    wr += '<td class="zcolC" clr="C"><a>&nbsp;</a></td>'
    wr += '<td class="zcolD" clr="D"><a>&nbsp;</a></td>'
    wr += '<td class="zcolE" clr="E"><a>&nbsp;</a></td>'
    wr += '<td class="zcolF" clr="F"><a>&nbsp;</a></td>'
    wr += '<tr>'
    wr += '<td class="zcolG" clr="G"><a>&nbsp;</a></td>'
    wr += '<td class="zcolH" clr="H"><a>&nbsp;</a></td>'
    wr += '<td class="zcolI" clr="I"><a>&nbsp;</a></td>'
    wr += '<td class="zcolJ" clr="J"><a>&nbsp;</a></td>'
    wr += '<td class="zcolK" clr="K"><a>&nbsp;</a></td>'
    wr += '<tr>'
    wr += '<td class="zcolL" clr="L"><a>&nbsp;</a></td>'
    wr += '<td class="zcolM" clr="M"><a>&nbsp;</a></td>'
    wr += '<td class="zcolN" clr="N"><a>&nbsp;</a></td>'
    wr += '<td class="zcolO" clr="O"><a>&nbsp;</a></td>'
    wr += '<td class="zcolP" clr="P"><a>&nbsp;</a></td>'
    wr += '<tr>'
    wr += '<td class="zcolQ" clr="Q"><a>&nbsp;</a></td>'
    wr += '<td class="zcolR" clr="R"><a>&nbsp;</a></td>'
    wr += '<td class="zcolS" clr="S"><a>&nbsp;</a></td>'
    wr += '<td class="zcolT" clr="T"><a>&nbsp;</a></td>'
    wr += '<td class="zcolU" clr="U"><a>&nbsp;</a></td>'
    wr += '</tr>'
    wr += '</table></td></tr>'
    wr += "</table>";
    return wr;
}

function look(w, v) {
    thuser = v, thphoto = w;
    $('#lookthumb').attr('src', 'cc_data/prfl/pf-' + w);
    $('#lookthumbil').center().show();
    popup = $('#lookthumbil');
}

function clsthumb() {
    $('#dvmain').hide();
    $('#backdiv,#backdivmnu').hide();
}

function addban() {
    tag = ($('#ckban').attr('checked') == 'checked') ? 'ban' : 'exp';
    var st = _pv('seluser', 'tag');
    addinfo('adminact', '&' + st + '&motiv=' + encodeURI($('#motiv').val()));
    $('#banuser,#backdiv').hide();
}

function chgstt(w) {
    addinfo('chgstt', '&seluser=' + w + '&thestt=' + $('#thestt').attr('value'), 1);
}

function chglev(w) {
    addinfo('chglev', '&seluser=' + w + '&mstar=' + $('#mstar').attr('value'), 1);
}

function numtotim() {
    t = mycount();
    var s = t % 60;
    s = (s < 10) ? '0' + s : s + '';
    var m = parseInt(t / 60);
    var h = parseInt(m / 60);
    m = m % 60;
    m = (m < 10) ? '0' + m : m + '';
    return h + ":" + m + "<span>&nbsp;:&nbsp;" + s + "</span>";
}

function checktimer() {
    if (oln == 1) {
        $('#thetim').html(numtotim());
        $('#thetim2').html(numtotim());
    }
}

function mycount() {
    if (me != null) {
        try {
            var ntim = now();
            return parseInt(parseInt(me['ttim']) + (ntim - lki) / 1000);
        } catch (e) {
            return parseInt(parseInt(me['ttim']));
        }
    } else {
        return 0;
    }
}

function showprofile(i) {
    if (i.user == me.user) {
        opclick('prof');
    }

    if (i.user != me.user) {
        profile('look_profile', $('#dvmain'), true, i.user);
    }
}

function profile(a, w, f, u) {
    var datos = $(w).attr('getdata');
    if (datos != null && f != true) {
        us_profile(datos);
    } else {
        $('#wait').center().show();
        $.get('./cc_clases/lv_perfil.php?act=' + a + '&user=' + u + '&im=' + me.user, function(data) {
            $(w).attr('getdata', data);
            profile(a, w);
        });
    }
}

function profile_offline(w) {
    profile('look_profile', $('#dvmain'), true, w);
}

function us_profile(w) {
    var i = extract(w),
        a = i.cou,
		d = cou(a),
        t = tim(i.ttim);
    if (i.sex == 'M') stt = ((i.stt) == 11) ? 'Super_Admin' : stts[i.stt];
    else stt = ((i.stt) == 11) ? 'Super_Admin' : stts[i.stt];
    var s = ((i.sex) == 'F') ? 'Femenino' : 'Masculino';

	if (i.user != me.user && me.reg == 1 &&  i.stt > 0){
        var friends = (i.friend != 1) ? '<li onclick="add_friend(\'' + i.user + '\');" id="addfriend"><label class="add" style="position:absolute;left:25px;"></label><a style="position:relative;top:-3px;">Agregar a mis Amigos</a></li>' : '<li onclick="pos_delete_friend(\'' + i.user + '\', 1);" id="addfriend"><label class="delf" style="position:absolute;left:24px;"></label><a style="position:relative;top:-3px;">Eliminar de mis Amigos</a></li>'
    } else {
        var friends = '';
    }
    $('#showDET').html('<table class="alignver" width="460" height="285"><tr><td width="236" rowspan="3" valign="top"><div id="photo"><img src="./cc_data/prfl/pf-' + i.thumb + '" width="195"><div id="nick">' + i.user + '</div></div></b><ul>' + friends + '<li onclick="look_buddy_list(\'' + i.user + '\');" id="addfriend"><label class="add" style="position:absolute;left:25px;"></label><a style="position:relative;top:-3px;">Ver su lista de Amigos</a></li></ul></td><td width="290" valign="top" height="100%" style=" padding:5px; border:#CCCCCC 1px solid;background:#F7F7F7;"><table width="240" height="200" border="0" style="height:0px;"><tr><td colspan="2"><b><span class="sty1">Datos Generales:</span></b></td></tr><tr><td align="right"><span class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/edad.png">&nbsp;Edad:</span></td><td>' + i.age + '</td></tr><tr><td align="right"><span class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/sex.png">&nbsp;Sexo:</span></td><td>' + s + '</td></tr><tr><td align="right"><span class="sty"><img height="20" width="20" align="top" src="./cc_recursos/home/menu/acp-perfil.png">&nbsp;Estado:</span></td><td>' + stt + '</td></tr><tr><td align="right"><span class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/email.png">&nbsp;Email:</span></td><td><a href="mailto:' + i.mail + '" style="text-decoration:none;">' + i.mail + '</a></td></tr>  <tr><td align="right"><span class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/profile_facebook.png">&nbsp;Facebook:</span></td><td>' + i.fb + '</td></tr>   <tr id="hrs"><td align="right"><span class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/horas.png">&nbsp;Horas:</span></td><td>' + t + '</td></tr><tr><td colspan="2"><br><br><b><span class="sty1">Informaci&oacute;n del Usuario:</span></b></td></tr><tr><td width="40%" align="right"><span class="sty">Acerca de mi:</span></td><td width="71%">' + i.ac + '</td></tr><tr><td width="29%" align="right"><span class="sty">Intereses:</span></td><td width="71%">' + i.it + '</td></tr><td align="right"><label id="ip1"><span><font color="4B4BF9">IP:</font></span></label></td><td><label id="ip">' + long2ip(i.ip) + '</label></td></table></td></table></table></td></table>');
    if ((me.priv & 1) !== 1) _vi(true, 'ip'), _vi(true, 'ip1');
       $('#photo').mouseenter(function() {
        $('#chg_thumb_pf').css('opacity', '.60');
        $('#camera_line_pf').fadeOut(200);
        $('#chg_thumb_pf').css('display', '').animate({
            height: 35
        }, 80).mouseenter(function() {
            $('#chg_thumb_pf').css('opacity', '.90');
        }).mouseleave(function() {
            $('#chg_thumb_pf').css('opacity', '.60');
        })
    }).mouseleave(function() {
        $('#chg_thumb_pf').css('display', 'none').animate({
            height: 2
        }, 80);
        $('#camera_line_pf').show();
    });
    $('#backdivmnu,#dvmain').fadeIn(150);
    $('#dvmain').center();
    $('#resultado').hide();
    $('#wait').hide();
    hidemepopup();
}

function showbuddylist(a, w, f, u) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        datos = pr.split(',');
        if (u != me.user) {
            buddylist(datos[0], datos[1], datos[2], datos[3]);
        } else {
            my_buddylist(datos[0], datos[1]);
        }
    } else {
        $.get('./cc_clases/lv_friends.php?act=' + a + '&user=' + u + '&mi=' + me.user, function(data) {
            $(w).attr('getdata', data);
            showbuddylist(a, w, '', u);
        });
    }
}

function look_buddy_list(w) {
    showbuddylist('look_buddy_list', $('#buddy_list'), true, w);
    $('#wait').center().show();
    $('#dvmain').hide();
    $('#backdivmnu').hide();
}

function pos_delete_friend(w, v) {
    if (v == 1) {
        $('#dvmain,#backdivmnu').hide();
        $('#shot').show();
        $('#backdiv').show();
        var tb = '<table cellpadding="0" cellspacing="0" style=\"width:300px;\"><tr><td align="left" height="23" class="topbutt">&nbsp;<a style="font-size:10px;font-weight:bold;color:#FFFFFF;">Eliminar de mis Amigos:</a> </td></tr><tr><td style="padding:8px;">&nbsp;&nbsp;Est&aacute; seguro de eliminar a ' + w + ' ?</td></tr><tr><td style="padding-top:1px;padding:5px;border-top:#E4E4E4 solid 1px;"><input type="submit" onclick="sendcls();delete_friend(\'' + w + '\');" value="Confirmar" class="btn btn-primary btn-submit">&nbsp;&nbsp;<input type="submit" onclick="sendcls();" value="Cancelar" class="btn btn-default btn-reset"></td></tr></table>';
        $('#superalert').html(tb).center().fadeIn(200);
    } else {
        if ($('#del_' + w).attr('value') != 'Confirmar') $('#del_' + w).attr('value', 'Confirmar');
        else delete_friend(w);
    }
}

function delete_friend(w, v) {
    if (v == 1) {
        addinfo('delfriend', '&friend=' + w + '&user=' + me.user + '&tim=' + datetime());
    } else {
        addinfo('delfriend', '&friend=' + w + '&user=' + me.user + '&tim=' + datetime());
        $('.mybuddy_' + w).remove();
    }
    $('#dvmain,#backdivmnu').hide();
}

function delete_friend_ok(w, v) {
    if (w == me.user) {
        var tx = '<font color="A63B00">***<b> ' + v + '</b> ya no pertenece a tu lista de amistades ...</font>';
        writeon('*', tx);
    }
}

function buddylist(w, v, y, k) {
    var ret = '<table id=\"look_popups\" cellpadding="0" cellspacing="0"><tr><td colspan=\"2\" style=\"color:#FFFFFF;\" height="30" class="topmyzone"><b>&nbsp;&nbsp;Lista de Amigos de ' + y + ':</b></td></tr></table><tr><div style="overflow:auto;max-height:400px;padding-bottom:1px;"><table>';
    m = 1, nn = [];
    var a = w.split(";");
    for (var b in a) {
        var i = a[b].split("-");
        var c = (i[0] != null) ? i[0] : '';
        var cc = (i[1] != '') ? i[1] : '00000.png';
        var x = (v == 0) ? '' : '<img onclick="javascript:profile_offline(\'' + i[0] + '\');" src="./cc_data/44x42/th-' + cc + '" width=\"50\" height=\"50\" style=\"padding-left:2px;padding-right:5px;\" />';
        var friend = (i[0] != me.user) ? '<input type=\"button\" class=\"lok_pf\" value=\"Ver Perfil\" onclick="profile_offline(\'' + c + '\');">' : '';
        var zz = (i[0] != '') ? friend : "";
        nn[m] = '<table id="look_popup" cellpadding="0" cellspacing="0" width=\"100%\" style=\"border-bottom:#E9E9E9 solid 1px;padding-top:1px;padding-bottom:1px;\"><tr><td width="52">' + x + '</td><td style="font-family:Arial, Helvetica, sans-serif;font-size:12px;vertical-align:text-top;font-style:italic;color:#666666;" valign="top"><br>' + c + '</td><td style=\"font-size:11px;\" align="right"><span style="position:relative;float:right;margin-right:9px;">' + zz + '</td></tr></table>';
        m++;
    }
    for (var r = 1; r < 300; r++) {
        var f = (nn[r] != null) ? nn[r] : "";
        ret += f;
    }
    ret += '</table></div><table><tr><td align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b id=\"buddy\">Total de Friends: ' + v + '</b></td></tr>';
    ret += '</table>';
    $('#buddy_list').html(ret);
    $('#backdiv').show();
    $('#buddy_list').center().show();
    popup = $('#buddy_list');
    $('#wait').hide();

}

function my_buddylist(w, v) {
    var ret = '<table id=\"look_popups\" cellpadding="0" cellspacing="0"><tr><td colspan=\"2\" style=\"color:#FFFFFF;\" height="30" class="topmyzone"><b>&nbsp;&nbsp;Mi lista de Amigos:<span style=\"position:absolute;right:10px;\">Amigos: ' + v + '&nbsp;</span></b></td></tr></table><tr><div style="overflow:auto;max-height:400px;padding-bottom:1px;"><table>';
    m = 1, nn = [];
    var a = w.split(";");
    for (var b in a) {
        var i = a[b].split("-");
        var c = (i[0] != null) ? i[0] : '';
        var cc = (i[1] != '') ? i[1] : '00000.png';
        var x = (v == 0) ? '' : '<img onclick="javascript:profile_offline(\'' + i[0] + '\');" src="./cc_data/44x42/th-' + cc + '" width=\"50\" height=\"50\" style=\"padding-left:2px;padding-right:5px;\" />';
        var zz = (i[0] != '') ? '<input type=\"button\" class=\"lok_pf\" id=\"del_' + c + '\" value=\"Eliminar\" onclick="pos_delete_friend(\'' + c + '\');">' : '';
        nn[m] = '<table id="look_popup" class="\mybuddy_' + c + '\"cellpadding="0" cellspacing="0" width=\"100%\" style=\"border-bottom:#E9E9E9 solid 1px;padding-top:1px;padding-bottom:1px;\"><tr><td width="52">' + x + '</td><td style="font-family:Arial, Helvetica, sans-serif;font-size:12px;vertical-align:text-top;font-style:italic;color:#666666;" valign="top"><br>' + c + '</td><td style=\"font-size:11px;\" align="right"><span style="position:relative;float:right;margin-right:9px;">' + zz + '</td></tr></table>';
        m++;
    }
    for (var r = 1; r < 300; r++) {
        var f = (nn[r] != null) ? nn[r] : "";
        ret += f;
    }
    ret += '</table></div>'
    ret += '</table>';
    $('#buddy_list').html(ret);
    $('#backdiv').show();
    $('#buddy_list').center().show();
    popup = $('#buddy_list');
    $('#wait').hide();
}

function add_friend(w) {
    addinfo('addfriend', '&friend=' + w);
    $('#dvmain').hide();
    $('#backdiv,#backdivmnu').hide();
}

function add_friend_pendiente(w, s, i) {
    if (me.user == s) tx = '<font color="A63B00">***<b> ' + w + '</b> debe de aprobar su solicitud de amistad ...</font>';
    writeon('*', tx);
}

function reload_pendient(w, s) {
    if (w == me.user) {
        if (s > 0) {
            $('#pendientes').css('display', '');
            start_sound(5);
			$('#pendientes').html(s);
        } else {
            $('#pendientes').css('display', 'none');
            $('#pendientes').html(0);
        }
    }
}

function exits_friend(w, v, y) {
    if (y == 1) {
        if (w == me.user) {
            var tx = '<font color="A63B00">***<b> ' + v + '</b> espera su aprobacion imposible agregar , acepte ...</font>';
            writeon('*', tx);
        }
    } else {
        if (w == me.user) {
            var tx = '<font color="A63B00">***<b> ' + v + '</b> aun no ha aprobado su solicitud ...</font>';
            writeon('*', tx);
        }
    }
}

function reload_notify(w, s) {
    if (w == me.user) {
        if (s > 0) {
            $('#notify').css('display', '');
            $('#notify').html(s);
            start_sound(4);
        } else {
            $('#notify').html(0);
        }
    }
}


function aprobe_friend_ok(w, s) {
    addinfo('aprobefriend', '&friend=' + w + '&aprobe=' + me.user + '&user=' + s + '&tim=' + datetime(), 1);
    $('.friend_' + w).remove();
}

function rechaze_friend(w, s) {
    addinfo('rechazefriend', '&friend=' + w + '&aprobe=' + me.id + '&user=' + s + '&tim=' + datetime(), 1);
    $('.friend_' + w).remove();
}

function add_friend_ok(w, s) {

    if (me.user == w) {
        var tx = '<font color="A63B00">***<b> ' + s + '</b> a aceptado tu Solicitud...</font>';
    }

    if (me.user == s) {
        var tx = '<font color="A63B00">***<b> ' + w + '</b> comienza a formar parte de tus Amigos...</font>';
    }
    writeon('*', tx);
}

function rechaze_friend_ok(w, s) {

    if (me.user == s) {
        var tx = '<font color="A63B00">***<b> ' + w + '</b> ha sido rechazado(a)...</font>';
    }

    if (me.user == w) {
        var tx = '<font color="A63B00">***<b> ' + s + '</b> ha rechazado su solicitud...</font>';
    }

    writeon('*', tx);

}

function show_pendient(w) {
    $('.solicitudes_friends').attr('class', 'solicitudes_friends_active');
    if (w == 1) {
        showpendient('pendient_mas', $('#popups'), true);
    } else {
        showpendient('pendient', $('#popups'), true);
    }
}

function showpendient(a, w, f) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        look_pendient(pr);
    } else {
        $('#move_triangle').attr('style', 'position:absolute;top:-12px;left:100%;margin-left:-90px;');
        var x = $('#notyfy').offset().left + $('#notyfy').width() - $('#popups_wait').width() + 4;
        var y = $('#notyfy').offset().top + $('#notyfy').height() + 11;
        $('#popups_wait').css({
            'left': x,
            'top': y
        }).show();
        $.get('./cc_clases/lv_friends.php?act=' + a + '&user=' + me.user, function(data) {
            $(w).attr('getdata', data);
            showpendient(a, w);
        });
    }
}

function look_pendient(w) {
    var ret = '<table id=\"look_popups\"><label style=\"position:absolute;top:-12px;left:100%;margin-left:-90px;\" class=\"triangle\"></label><tr><td colspan=\"2\" style=\"background:#FFFFFF;font-size:10px;height:25px;border-bottom:#DDDDDD solid 1px;\"><b>&nbsp;&nbsp;Solicitudes de Amistad: </b></td></tr></table><tr><div style="overflow:auto;max-height:400px;"><table>';
    m = 1, nn = [];
    var a = w.split(";");

    var look = (a.length > 4) ? '<td onclick="show_pendient(1);" align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b>Ver m&aacute;s Solicitudes</b></td>' : '<td align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b>Solicitudes Pendientes</b></td>';

    for (var b in a) {
        var i = a[b].split(",");
        var d = i[0];
        var c = (i[1] != null) ? '<b style=\"color:#425F9B;\">' + i[1] + '</b>:&nbsp;<i>te ha enviado una solicitud</i>' : "<b style=\"color:#425F9B;\">Alerta:</b>";
        var cc = i[1];
        var z = i[2];
        var x = (i[3] != null) ? '<img onclick="javascript:profile_offline(\'' + i[1] + '\');" src="./cc_data/44x42/th-' + i[3] + '" width=\"50\" height=\"50\" />' : '<img src="./cc_data/44x42/th-00000.png" width=\"50\" height=\"50\" />';
        var zz = (i[1] != null) ? '<input type=\"button\" class=\"lok_pf\" style=\"position:relative;top:-2px;\" value=\"Aceptar\" onclick="aprobe_friend_ok(\'' + cc + '\',\'' + z + '\');">&nbsp;&nbsp;&nbsp;&nbsp;<input style=\"position:relative;top:-2px;\" type=\"button\" class=\"lok_pf\"  value=\"Rechazar\" onclick="rechaze_friend(\'' + cc + '\',\'' + me.user + '\');">' : "&nbsp;<label style=\"position:relative;top:-2px;\" class=\"fl3\" />&nbsp;No hay solicitudes pendientes...";
        nn[m] = '<table id="look_popup" class=\"friend_' + cc + '\"style=\"border-bottom:#E9E9E9 solid 1px;padding-top:1px;padding-bottom:1px;\"><tr><td valign="top">' + x + '</td><td width="99%" style="font-family:Arial, Helvetica, sans-serif;font-size:11px;vertical-align:text-top;font-style:italic;color:#666666;" valign="top">' + c + '<hr>' + zz + '</td></tr></table>';
        m++;
    }
    for (var r = 1; r < 300; r++) {
        var f = (nn[r] != null) ? nn[r] : "";
        ret += f;
    }
    ret += '</table></div><table><tr>' + look + '</tr>'
    ret += '</table>';
    $('#popups').html(ret);
    var x = $('#notyfy').offset().left + $('#notyfy').width() - $('#popups').width() + 4;
    var y = $('#notyfy').offset().top + $('#notyfy').height() + 12;
    $('#popups').css({
        'left': x,
        'top': y
    }).show();
    popup = $('#popups');
    $('#popups_wait').hide();
    $('#pendientes').css('display', 'none');
    $('#pendientes').html(0);
}

function actpref() {
    thefast = $('#prefvelcon').val();
    $.cookie('fast', $('#prefvelcon').val());
    $('#dvmain,#backdiv').hide();
    notif({
           msg: "<b>Éxito:</b> Preferencias Actualizadas!",
           type: "success",
		   position: "center"
         });
}

var varformat = ($.cookie('format')) ? $.cookie('format') : '0';
var varnosound = ($.cookie('sound')) ? $.cookie('sound') : '0';
var varnopv = ($.cookie('nopv')) ? $.cookie('nopv') : '0';
var thefast = ($.cookie('fast')) ? $.cookie('fast') : '6';
var shipping = ($.cookie('shping')) ? $.cookie('shping') : '0';

function opclick(act) {
    hidemepopup();
    switch (act) {
        case 'pass':
            $('#showDET').html('<table width="460" height="285" id="chgpass" name="chgpass" ><td width="236" rowspan="3" valign="top"><center><div id="photo_user"><img id="avatar" width="195"><div id="nick">' + me.user + '</div></div></center></b></td><td width="290" valign="top" height="100%" style=" padding:5px; border:#CCCCCC 1px solid;background:#F7F7F7;"><table width="240" height="200" border="0" style="height:0px;"><br><br><br><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/pass-n.png">&nbsp;Nueva Clave:</a></td><td><input class="radius-input" name="pwrnew" type="password" required="required" id="pwrnew" size="15" maxlength="15" ></td></tr><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/pass-r.png">&nbsp;Repetir Clave:</a></td><td><input class="radius-input" name="pwrnewr" type="password" required="required" id="pwrnewr" size="15" maxlength="15" ></td></tr><br><tr><td height="37" align="right">&nbsp;</td><td><input class="btn btn-primary btn-submit" type="button" style="font-size:11px;" name="pwrbut" id="pwrbut" onClick="sendprof();"></td></tr><tr><td colspan="2" align="right" id="profmess">&nbsp;</td></tr></table></td></table>');
            $('#avatar').attr("src", './cc_data/prfl/pf-' + me.thumb);
            $('#backdiv,#dvmain').show();
            $('#dvmain').center();
            $('#welcome').hide();
            $('#pwrbut').attr("value", 'Cambiar');
            break;
        case 'register':
            $('#showDET').html('<table width="460" height="285" id="register" name="register" ><td width="236" rowspan="3" valign="top"><center><div id="photo_user"><img id="avatar" width="195">reg<div id="nick">' + me.user + '</div></div></center></b></td><td width="290" valign="top" height="100%" style=" padding:5px; border:#CCCCCC 1px solid;background:#F7F7F7;"><table width="240" height="200" border="0" style="height:0px;"><br><br><br><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/pass-n.png">&nbsp;Nueva Clave:</a></td><td><input class="radius-input" name="pwrnewreg" type="password" required="required" id="pwrnewreg" size="15" maxlength="15" ></td></tr><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/pass-r.png">&nbsp;Repetir Clave:</a></td><td><input class="radius-input" name="pwrnewregr" type="password" required="required" id="pwrnewregr" size="15" maxlength="15" ></td></tr><br><tr><td height="37" align="right">&nbsp;</td><td><input class="btn btn-primary btn-submit" type="button" style="font-size:11px;" name="pwrbut" id="pwrbut" onClick="register();"></td></tr><tr><td colspan="2" align="right" id="profmess">&nbsp;</td></tr></table></td></table>');
            $('#avatar').attr("src", './cc_data/prfl/pf-' + me.thumb);
            $('#backdiv,#dvmain').show();
            $('#dvmain').center();
            $('#welcome').hide();
            $('#pwrbut').attr("value", 'Registrarme')
            break;
        case 'pref':
            $('#showDET').html('<table width="460" height="285"><td width="236" rowspan="3" valign="top"><center><div id="photo_user"><img id="thumb" width="195"><div id="nick">' + me.user + '</div></div></center></b></td><td width="290" valign="top" height="100%" style=" padding:5px; border:#CCCCCC 1px solid;background:#F7F7F7;"><table width="240" height="200" border="0" style="height:0px;"><br>&nbsp;&nbsp;<a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/preferencias.png">&nbsp;Preferencias del chat:</a><br><tr><td align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="tdnopv" id="tdnopv" onClick="opclick(1);"></td><td align="left"><a class="sty">No Aceptar Privados</a></td></tr><tr><td align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="tdformat" id="tdformat" onClick="opclick(2);"></td><td align="left"><a class="sty">No Ver Colores</a></td></tr><tr><tr><td align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="tdnosound" id="tdnosound" onClick="opclick(3);"></td><td align="left"><a class="sty">Silenciar Notificaciones</a></td></tr></tr><tr></tr><tr><td colspan="2" height="32"><a class="sty">&nbsp;&nbsp;&nbsp;<img height="16" width="16" align="top" src="./cc_recursos/home/menu/conex.png">&nbsp;Conexion:</a></td></tr><tr><td align="right"><a class="sty">Velocidad:</a></td><td align="left"><select style="font-size:11px;" name="prefvelcon" id="prefvelcon"><option value="5">Lenta</option><option value="6" >Normal</option><option value="7" >Rapida</option></select></td></tr><br><tr><td height="37" align="right">&nbsp;</td><td><br><input type="button" class="btn btn-primary btn-submit" style="font-size:11px;" value="Guardar" onClick="actpref();"></td></tr><tr><td colspan="2" align="right" id="profmess">&nbsp;</td></tr></table></td></table>');
            $('#thumb').attr("src", './cc_data/prfl/pf-' + me.thumb);
            $('#backdiv,#dvmain').show();
            $('#dvmain').center();
			if (varnosound == '1') $('#tdnosound').attr('checked', true);
            if (shipping == '1') $('#shopin').attr('checked', true);
            if (varnopv == '1') $('#tdnopv').attr('checked', true);
            if (varformat == '1') $('#tdformat').attr('checked', true);
            if (thefast == '5') $('#prefvelcon').attr('value', '5');
            if (thefast == '6') $('#prefvelcon').attr('value', '6');
            if (thefast == '7') $('#prefvelcon').attr('value', '7');
            break;
        case 'prof':
            $('#showDET').html('<table width="460" height="285"><td width="236" rowspan="3" valign="top"><div id="photo_user"><img id="avatar" width="195"><div id="nick">' + me.user + '</div></div></b></td><td width="290" valign="top" height="100%" style=" padding:5px; border:#CCCCCC 1px solid;background:#F7F7F7;"><table width="240" height="200" border="0" style="height:0px;"><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/sex.png">&nbsp;Sexo:</a></td><td><select style="color:#515151;" name="pf_s" id="pf_s"><option value="M">Hombre</option><option value="F">Mujer</option></select></td></tr><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/email.png">&nbsp;Email:</a></td><td><input name="pf_m" style="color:#515151;" type="text" id="pf_m" size="15" maxlength="30" ></td></tr><tr><td align="right"><a class="sty">Acerca de Mi:</a></td><td><textarea style="width:150px;height:35px;color:#515151;font-size:12px;" name="pf_p" type="text" id="pf_p" maxlength="100" ></textarea></td></tr><tr><td align="right"><a class="sty">Mis Intereces:</a></td><td><textarea style="width:150px;height:35px;color:#515151;font-size:12px;" name="pf_i" type="text" id="pf_i" maxlength="50" ></textarea></td></tr><tr><td align="right"><a class="sty">facebook.com/:</a></td><td><input name="pf_fb" type="text" id="pf_fb" size="10" style="color:#515151;" maxlength="35" ></td></tr><tr><td align="right"><a class="sty"><img height="18" width="18" align="top" src="./cc_recursos/home/menu/edad.png">&nbsp;Edad:</a></td><td><input name="pf_a" type="text" id="pf_a" size="4" style="color:#515151;" maxlength="2" ></td></tr>     <tr><td height="37" align="right"><br>&nbsp;</td><td><input type="button" class="btn btn-primary btn-submit" name="pwrbut" id="pwrbut" style="font-size:11px;" value="Guardar Datos"  onClick="sendmydata();"></td></tr><tr><td colspan="2" align="right" id="profmess">&nbsp;</td></tr></table></td></table>');
            $('#avatar').attr("src", './cc_data/prfl/pf-' + me.thumb);
            _go('pf_s').value = me.sex;
            _go('pf_a').value = me.age;
            _go('pf_m').value = me.mail;
            _go('pf_p').value = me.ac;
            _go('pf_i').value = me.it;
            _go('pf_fb').value = me.fb;
            $('#backdiv,#dvmain').fadeIn(150);
            $('#dvmain').center();
            break;
        case 'thumb':
            if (me.stt != 0) {
                 $('#upload').show();
                 $('#up_thumb').attr("src", 'cc_data/prfl/pf-' + me.thumb + '');
                popup = $('#upload');
            } else {
           notif({
              msg: "<b>Oops!</b> No estas registrado, registrate para poner un avatar!!",
              type: "error",
              position: "center"
           });
            }
            $('#inimess').fadeOut(200);
            break;
       case 'rules':
            var w = adm.substr(1, 2);
            v = adm.substr(1, 1);
            x = adm.substr(7, 2);
            y = adm.substr(11, 1);
            u = adm.substr(13, 3);
            $('#shoadm').html('<table width="750px" height="500px" border="0"><iframe src="reglas.php" frameborder="0" width="750px" height="500px" ></iframe></table>');
            $('#backdiv,#admin1').show();
			$('#welcome').hide();
            $('#admin1').center();
            break;
        case 'm_chg_tp':
            $("#tutopic").center();
            $("#backdiv").show();
            $('#tutopic').show();
            break;
        case 'look_ban':
            if ((me.priv & 4) == 4) {
                addinfo('lookban', '', 1);
            } else {
               notif({
                      msg: "<b>Oops!</b> Privilegios insuficientes!",
                      type: "error",
                      position: "center"
            });
            }
            break;
        case 't_hrs':
            if (me.priv & 255 ) {
                $('#wait').center().show();
                showtransf('transf', $('#poput'), true, me.user);
            } else {
           notif({
              msg: "<b>Oops!</b> No tiene privilegios para trasferir horas!",
              type: "error",
              position: "center"
           });
            }
            break;
        case 'friends':
            if (me.stt != 0) {
                showbuddylist('look_buddy_list', $('#buddy_list'), true, me.user);
                $('#wait').center().show();
            } else {
           notif({
              msg: "<b>Oops!</b> Error actualizando los datos!",
              type: "error",
              position: "center"
           });
            }
            break;
        case 'send_menssenger':
            if (me.stt != 0) {
                open_mesenger('open_mensseger', $('#poput'), true);
            } else {
           notif({
              msg: "<b>Oops!</b> Error actualizando los datos!",
              type: "error",
              position: "center"
           });
            }
            break;
        case 1:
            if ($('#tdnopv').attr('checked') == 'checked') {
                varnopv = '1';
            } else {
                varnopv = '0';
            }
            $.cookie('nopv', varnopv);
            break;
        case 2:
            if ($('#tdformat').attr('checked') == 'checked') {
                varformat = '1';
            } else {
                varformat = '0';
            }
            $.cookie('format', varformat);
            break;
		case 3:
            if ($('#tdnosound').attr('checked') == 'checked') {
                varnosound = '1';
            } else {
                varnosound = '0';
            }
            $.cookie('sound', varnosound);
            break;
        case 4:
            if ($('#shopin').attr('checked') == 'checked') {
                shipping = '1';
            } else {
                shipping = '0';
            }
            $.cookie('shping', shipping);
            break;
        case 'out':
		    swal({   
		    title: "Salir?",   
		    text: "¿Seguro que deseas salir?",   
		    type: "warning",   
		    showCancelButton: true,   
		    confirmButtonColor: "#DD6B55",   
		    confirmButtonText: "¡Si!",   
		    cancelButtonText: "No",   
		    closeOnConfirm: true,   
		    closeOnCancel: true }, 

		function(isConfirm){   
			if (isConfirm) {     
                out();
		}  
		});
    }
}

function open_mesenger(a, w, f) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        open_menssenger(pr);
    } else {
        $('#wait').center().show();
        $.get('./cc_clases/lv_mensajes.php?act=' + a + '&user=' + me.user, function(data) {
            $(w).attr('getdata', data);
            open_mesenger(a, w);
        });
    }
}

function isvalid(w) {
    var val = isimage(w);
    if (val == -1) {
        notif({
	           msg: "<b>Oops!</b> No es una imagen!",
	           type: "warning",
	           position: "center"
            });
        return false;
    }
    $('#ifrupthumb').submit();
    return true;
}

function isimage(w) {
    w = $(w).val();
    var imgs = ['gif', 'jpg', 'png'];
    var pt = w.split("\.");
    var ext = pt.pop().toLowerCase();
    return $.inArray(ext, imgs);
}

function cls_up() {
    $('#upload,#backdiv').hide();
}

function showMenu() {
    var x = $('#show_menu').offset().left + $('#show_menu').width() - $('#mainmenu').width() + 8;
    var y = $('#show_menu').offset().top + $('#show_menu').height() + 18;
    $('#mainmenu').css({
        'left': x,
        'top': y
    }).show();
       popup = $('#mainmenu');
}

function showMenuG() {
    var x = $('#show_menug').offset().left + $('#show_menug').width() - $('#mainmenugames').width() + 8;
    var y = $('#show_menug').offset().top + $('#show_menug').height() + 18;
    $('#mainmenugames').css({
        'left': x,
        'top': y
    }).show();
       popup = $('#mainmenugames');
}

function out() {
    addinfo('s_exit', '&q=2&thumb=' + me.thumb, 1, 0);
    discall();
	$('#errorlog').css('display', 'none');
	$('#erroruser').css('display', 'none');
	$('#errorpass').css('display', 'none');
}

function tim(w) {
    t = w;
    var s = t % 60;
    s = (s < 10) ? '0' + s : s + '';
    var m = parseInt(t / 60);
    var h = parseInt(m / 60);
    m = m % 60;
    m = (m < 10) ? '0' + m : m + '';
    return h + ":" + m + "";
}

function rating(w) {
    var m = 0;
    var ret = '<table width="100%" border="0" cellpadding="2" cellspacing="1" id="tb_rating">'
    f = 1, array = [];
    var uu = w.split(";");
    for (var uw in uu) {
        var e = uu[uw].split(",");
        var n = e[4];
        var a = (e[0] == '') ? '0000' + n + '.png' : e[0];
        var b = e[2];
        var c = e[1];
        var l = e[3];
        m++;
        array[f] = '<td><font color=\"666666\"><img src=\"cc_data/44x42/th-' + a + '\" class=\"thumb_rtk\" align=\"absmiddle\" width=\"28\" height=\"26\">&nbsp;' + m + '.-<font color=\"666666\">&nbsp;&nbsp;<i>' + c + '</i></font></td><td><b><font color=\"666666\"><center><a style=font-size:10px;>' + tim(b) + '</a></b>&nbsp;<i><a style=font-size:8px;>horas</font></center></a></td>';
        f++;
    }
    for (var t = 1; t < 11; t++) {
        var c1 = (array[t] != null) ? array[t] : "&nbsp;";
        var c2 = (array[t + 10] != null) ? array[t + 10] : "&nbsp;";
        ret += "<tr>" + c1 + c2 + "</tr>";
    }
    ret += "</table>";
    $('#rtk').html('<b><a style=font-size:11px;><font color=#94ABCB>Ranking de Usuarios</font></a></b>');
    $('#dvslide').html(ret);
}

function showtransf(a, w, f, u) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        horas(pr);
    } else {
        $.get('./cc_clases/lv_friends.php?act=' + a + '&user=' + u, function(data) {
            $(w).attr('getdata', data);
            showtransf(a, w, '', u);
        });
    }
}

function horas(w) {
    var ret = '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td colspan=\"5\" align="left" height="30" class="topmyzone" valign="top"><b style="position:relative;top:5px;color:#FFFFFF;">&nbsp;&nbsp;Transferir Horas</b><label onclick="clsmsg();" align="right" class="close" style=\"margin-right:5px;top:5px;\"></label></td></tr><tr><td style=\"padding-top:5px;\"> <blockquote>Transferir de mis <b>' + tim(me.ttim) + '</b> Horas<br> <input id=\"ttot\" size=\"2\" maxlength=\"4\" value=\"10\" /> A: <select id=\"trfuser\" name=\"trfuser\"><option>Seleccione un Nick</option>';
    m = 1, nn = [];
    var uu = w.split(";");
    for (var uw in uu) {
        var wt = uu[uw].split(",");
        var id = wt[0];
        var user = (wt[1] != null) ? wt[1] : "No hay usuarios onlines";
        nn[m] = '<option value=\"' + user + '\">' + user + '</option>';
        m++;
    }
    for (var r = 1; r < 300; r++) {
        var d = (nn[r] != null) ? nn[r] : "";
        ret += "" + d + "";
    }
    ret += '</select>&nbsp;<input class=\"btn btn-primary btn-submit\" type=\"button\" style=\"position:relative;top:-2px;margin-left:10px;font-size:11px;\"  value=\"Transferir\" onclick=\"transhours();\" /><br><a class=\"tf_gray\">(Tu transferencia se le notificara al usuario...)</a> </blockquote></td></tr></table>';
    $('#poput').center();
    $('#backdiv').show();
    $('#poput').html(ret);
    $('#poput').center();
    $('#poput').fadeIn(200);
    $('#wait').hide();
}

function transhours() {
    if ($('#trfuser').val() != "Seleccione un Nick") {
        addinfo('hours', '&idu=' + $('#trfuser').val() + '&tot=' + $('#ttot').val());
    } else {
        notif({
               msg: "<b>Oops!</b> Selecciona un nick!",
               type: "warning",
               position: "center"
    });
    }
}


function s_transf(uu, tt, hh) {
    var tx = '<font color=A63B00>*** <b>' + uu + '</b> transfiere ' + hh + ' hora(s) a <b>' + tt + '</b>...';
    writeon('*', tx);
	notif({
          msg: "<b>Éxito!</b> Horas transferidas correctamente!",
          type: "success",
		  position: "center"
});
	 clsmsg();
}

function reload(w) {
    var i = extract(w);
    if (i.user == me.user)
        retok(i);
    insertuser(w);
}

function googlearuser(w) {
    if (w == 1) {
        showgoogle('google_more', $('#resultado'), true);
    } else {
        showgoogle('google', $('#resultado'), true);
    }
}

function showgoogle(a, w, f) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        s_google(pr);
    } else {
        $.get('./cc_clases/lv_busqueda.php?act=' + a + '&search=' + $('#google').val(), function(data) {
            $(w).attr('getdata', data);
            showgoogle(a, w);
        });
    }
}

function s_google(w) {
    var ret = '<table class="result_google">';
    m = 1, nn = [];
    var a = w.split(";");
    for (var b in a) {
        var i = a[b].split("\|");
        var thumb = (i[1] == null) ? '00000.png' : i[1];
        var sex = i[3];
        var user = (i[2] != null) ? i[2] : "No se encuentran resultados...";
        var click = (user == 'No se encuentran resultados...') ? '' : 'javascript:profile_offline(\'' + user + '\');';

        nn[m] = '<tr><td onclick="' + click + '"><img style="width:50px;" src="cc_data/44x42/th-' + thumb + '"/></td><td onclick="' + click + '" style="position:relative;padding-left:8px;" width="100%" >' + user + '</td></tr>';
        m++;
    }
    for (var r = 1; r < 10; r++) {
        var f = (nn[r] != null) ? nn[r] : "";
        ret += f;
    }
    ret += '<tr><td onclick="googlearuser(1);" align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;\"><b>Ver m&aacute;s resultados para ' + $('#google').val() + '</b></td></tr>'
    ret += '</table>';
    $('#resultado').html(ret);
    var x = $('#google').offset().left + $('#google').width() - $('#resultado').width() + 2;
    var y = $('#google').offset().top + $('#google').height() + 5;
    $('#resultado').css({
        'left': x,
        'top': y
    }).show();
    popup = $('#resultado');
}


function allban(w) {
    var ret = '<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%\"><tr><td colspan=\"6\" class=\"topmyzone\" style=\"color:#FFFFFF;width:600px;height:25px;font-size:11px;border-radius: 5px 5px 0px 0px;\"><b>&nbsp;&nbsp;Lista de Usuarios Baneados&nbsp;</b></td></tr>';
    ret += '<tr><td>&nbsp;</td><td style=\"padding-top:5px;\"><b>Usuario&nbsp;&nbsp;</b></td><td style=\"padding-top:5px;\"><b>IP&nbsp;&nbsp;</b></td><td style=\"padding-top:5px;\"><b>Motivo</b></td><td style=\"padding-top:5px;\"><b>Operador&nbsp;&nbsp;</b></td></tr>'
    m = 1, nn = [];
    var uu = w.split("\|");
    for (var uw in uu) {
        var wt = uu[uw].split("\&");
        var id = (wt[0] != null) ? wt[0] : "";
        var user = (wt[1] != null) ? wt[1] : "No-user";
        var ip = (wt[2] != null) ? wt[2] : "0.0.0.0";
        var motiv = (wt[3] != null) ? wt[3] : "Sin-Motiv";
        var oper = (wt[4] != null) ? wt[4] : "LiveMessenger";
        nn[m] = '<td>&nbsp;&nbsp;<input type=\"checkbox\" num=\"' + id + '\" class=\"tounban\"></td><td>' + user + '&nbsp;</td><td>' + ip + '&nbsp;</td><td>&nbsp;<i>' + motiv + '</i></td><td>' + oper + '</td>';
        m++;
    }
    for (var r = 1; r < 26; r++) {
        var d = (nn[r] != null) ? "<tr>" + nn[r] + "</tr>" : "";
        ret += d;
    }
    ret += '<tr><td colspan="5" style="border-top:#CCCCCC 1px solid;padding-left:5px;padding-bottom:5px;padding-top:5px;"><input class="button-radius btn btn-primary btn-submit" type="button" style="font-size:11px;" value="Quitar Ban" onclick="unbansel();$(\'#desban,#backdiv\').hide();">&nbsp;<input class="btn btn-default btn-reset button-radius" type="button" style="font-size:11px;" value="Cancelar" onclick="$(\'#desban,#backdiv\').hide();"></td></tr></table>';
    $('#backdiv').fadeIn(200);
	$('#desban').html(ret);
    $('#wait').hide();
}

function unbansel() {
	  var w = '';
	  $(".tounban:CHECKED").each(function() {
        w += ((w == '') ? '' : ',') + $(this).attr('num');
    })
    if (w == '') return;
    addinfo('ubanuser', '&fid=' + w);
    hidemepopup();
	swal({   
		title: "Desban",   
		text: "Usuario(s) desbaneados con exito!" ,   
		type: "success",   
		showCancelButton: false,   
		confirmButtonColor: "green",   
		confirmButtonText: "OK!",   
		cancelButtonText: "No",   
		closeOnConfirm: true,   
		closeOnCancel: true }); 

}

function my_anuncios() {
    $('#wait').center().show();
    $('#anno').attr('class', 'anno_active');
    $('.buttl').attr('class', 'buttl_active');
    addinfo('my_anuncios', '', 1);
}

function show_announce(w) {
    addinfo('my_announce', '&aid=' + w, 1, 0);
    hidemepopup();
}

function my_announce(w) {
    var uu = w.split(";");
    var us = me.user; 
	
    for (var uw in uu) {
        var v = uu[uw].split("\|");
        var t = v[1];
        var a = v[2];
    }
    var tx = '<table class="wtxbambi"><tr><td style="width:90px;"><img class="avatar" onclick="javascript:profile_offline(\'' + us + '\');" src="cc_data/44x42/th-' + me.thumb + '" width=\"50\" height=\"50\" /></td><td style="padding-left:10px;padding-right:5px;" width="91%"> ' + a + '</td></tr></table>';
    writeon('*', tx);
}

function announ(w) {
    var ret = '<table id="anunciar" cellpadding="0" cellspacing="0"><tr><td style=\"background:#428bca;font-size:11px;height:25px;\" colspan=\"6\" ><b style=\"color:#FFFFFF;\">&nbsp;&nbsp;Enviar Anuncio:</b></td></tr>';
    m = 1, nn = [];
    var a = w.split(";");
    for (var b in a) {
        var i = a[b].split("\|");
        var b = i[0];
        var c = i[1];
        var d = i[2];
        var e = (me.acp == 1) ? b : '';
        nn[m] = '<tr><td style="border-right:none;" onclick="show_announce(\'' + b + '\');"><img style="width:50px;" title="' + e + '" src="cc_data/annonce/' + c + '"/></td><td onclick="show_announce(\'' + b + '\');">' + d + '</td></tr>';
        m++;
    }
    for (var r = 1; r < 15; r++) {
        var f = (nn[r] != null) ? nn[r] : "";
        ret += f;
    }
    ret += '</table>';
    $('#poput').center();
    $('#backdiv').show();
    $('#poput').fadeIn(200);
    $('#poput').html(ret);
    $('#poput').center();
    $('#wait').hide();
    popup = $('#poput');
}

function shownotify(a, w, f, u) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        look_notify(pr);
    } else {
        $('#this_pop').html('Notificaciones:');
        $('#move_triangle').attr('style', 'position:absolute;top:-12px;left:100%;margin-left:-25px;');
        var x = $('#notyfy').offset().left + $('#notyfy').width() - $('#popups_wait').width() + 4;
        var y = $('#notyfy').offset().top + $('#notyfy').height() + 12;
        $('#popups_wait').css({
            'left': x,
            'top': y
        }).show();
        $.get('./cc_clases/lv_notificaciones.php?act=' + a + '&user=' + me.user + '&notifi=' + u, function(data) {
            $(w).attr('getdata', data);
            shownotify(a, w);
        });
    }
}

function show_notify(w) {
    $('.notification').attr('class', 'notification_active');
    switch (w) {
        case 1:
            shownotify('notify', $('#popups'), true);
            break;
        case 2:
            shownotify('notify_look_mas', $('#popups'), true);
    }
}

function look_notify(w) {
    var ret = '<table id=\"look_popups\"><label style=\"position:absolute;top:-12px;left:100%;margin-left:-25px;\" class=\"triangle\"></label><tr><td colspan=\"2\" style=\"background:#FFFFFF;font-size:10px;height:25px;border-bottom:#DDDDDD solid 1px;\"><b>&nbsp;&nbsp;Notificaciones: (Doble Clic Para Borrar)</b></td></tr></table><tr><div style="overflow:auto;max-height:400px;"><table>';
    m = 1, nn = [];
    var a = w.split("\||");

    var look = (a.length > 4) ? '<td onclick="show_notify(2);" align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b>Ver m&aacute;s Notificaciones</b></td>' : '<td align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b>Notificaciones</b></td>';

    for (var b in a) {
        var i = a[b].split("\|");
        var id = (i[0] != null) ? i[0] : "";
        var c = (i[1] != null) ? i[1] : "<b style=\"color:#425F9B;\">Alerta</b>";
        var d = (i[2] != null) ? '<img onclick="javascript:profile_offline(\'' + c + '\');" src="cc_data/44x42/th-' + i[2] + '" width=\"50\" height=\"50\" />' : '<img src="cc_data/44x42/th-00000.png" width=\"50\" height=\"50\"  />';
        var g = (i[3] != null) ? i[3] : "No se encuentran Notificaciones...";
        var h = (i[4] != null) ? i[4] : "";
        nn[m] = '<table id="look_popup" style=\"border-bottom:#E9E9E9 solid 1px;padding-top:1px;padding-bottom:1px;\"><tr id="ntofy_' + id + '"onDblClick=\"delete_notify(\'' + id + '\');\"><td valign="top">' + d + '</td><td style="font-family:Arial, Helvetica, sans-serif;font-size:11px;vertical-align:text-top;font-style:italic;color:#666666;" width="99%" valign="top"><b style=\"color:#425F9B;\">' + c + ':</b>&nbsp;<span style=\"font-size:9px;color:#4A69A0;\">' + h + '</span><hr>&nbsp;<label style=\"position:relative;top:-2px;\" class=\"fl3\" />&nbsp;' + g.substr(0, 50) + '...</td></tr></table>';
        m++;
    }
    for (var r = 1; r < 300; r++) {
        var f = (nn[r] != null) ? nn[r] : "";
        ret += f;
    }
    ret += '</table></div>'
    ret += '<table><tr>' + look + '</tr></table>';
    $('#popups').html(ret);
    var x = $('#notyfy').offset().left + $('#notyfy').width() - $('#popups').width() + 4;
    var y = $('#notyfy').offset().top + $('#notyfy').height() + 12;
    $('#popups').css({
        'left': x,
        'top': y
    }).show();
    popup = $('#popups');
    $('#popups_wait').hide();
    $('#notify').css('display', 'none');
    $('#notify').html(0);

}

function delete_notify(w) {
    $.post('./cc_clases/lv_notificaciones.php?act=delete_notify&notifi=' + w + '&user=' + me.user);
    $('#ntofy_' + w).remove();
    }

function showmesenger(a, w, f) {
    var pr = $(w).attr('getdata');
    if (pr != null && f != true) {
        look_menssenger(pr);
        popup = $('#popups');
    } else {
        $('#move_triangle').attr('style', 'position:absolute;top:-11px;left:100%;margin-left:-58px;');
        var x = $('#notyfy').offset().left + $('#notyfy').width() - $('#popups_wait').width() + 4;
        var y = $('#notyfy').offset().top + $('#notyfy').height() + 11;
        $('#popups_wait').css({
            'left': x,
            'top': y
        }).show();
        $.get('./cc_clases/lv_mensajes.php?act=' + a + '&user=' + me.user, function(data) {
            $(w).attr('getdata', data);
            showmesenger(a, w);
        });
    }
}

function show_messenger(w) {
    $('.messeger').attr('class', 'messeger_active');
    $('#this_pop').html('Mensajes Recientes:');
    switch (w) {
        case 1:
            showmesenger('menssenger', $('#popups'), true);
            break;
        case 2:
            showmesenger('menssenger_look_more', $('#popups'), true);
    }
}

function open_menssenger(w) {
    var ret = '<table width="100%" cellspacing="0" cellpadding="0"><tr><td colspan="2" align="left" height="30" class="topmyzone" valign="top"><span style="font-weight:bold;color:#FFFFFF;position:relative;top:5px;">&nbsp;&nbsp;Dejar Mensaje Pendiente:</span><label onclick="clsmsg();" align="right" class="close" style=\"margin-right:5px;top:5px;\"></label></td></tr><tr><td style="padding:10px;padding-bottom:2px;padding-top:3px;"><select style=\"border:1px #CCCCCC solid;width:150px;border-radius:3px;font-family:Arial;color:#666666;\" id=\"fuser\" name=\"fuser\"><option>Selecciona un Amigo</option>';
    m = 1, nn = [];
    var uu = w.split("\|");
    for (var uw in uu) {
        var wt = uu[uw].split(",");
        var id = wt[0];
        var user = wt[1];
		var nof='Lista vacia';
    if (user == null){
	   nn[m] = '<option value=\"' + nof + '\" disabled>' + nof + '</option>';
       m++;
	       }else{ 
		        nn[m] = '<option value=\"' + user + '\">' + user + '</option>';
                m++;}
    }
    for (var r = 0; r < 300; r++) {
        var d = (nn[r] != null) ? nn[r] : "";
        ret += d;   
    }
    ret += '</select></td><td style="position:relative;left:-50px;"><span style="font-size:11px;color:#B0AFAF;">-> (Solo a tus Amigos...)</span></td></tr><tr><td colspan="2" style="padding-left:10px;padding-right:10px;padding-bottom:8px;"><textarea id=\"mnn\" name=\"mnn\" placeholder=\"&nbsp;Pulsar Enter para Enviar...\" maxlength=\"400\" onkeydown=\"if (event.keyCode==13) send_menssenger();\" style="width:100%;height:50px;border-radius:3px;font-family:Arial;"></textarea></td></tr><tr></tr></table>';
	$('#poput').center();
    $('#backdiv').show();
    $('#messenger').css('display', 'none');
    $('#messenger').html(0);
    $('#poput').html(ret);
    $('#poput').center();
    $('#poput').fadeIn(200);
    $('#wait').hide();
}

function clsmsg() {
    $('#poput,#backdiv').hide();
}

function send_menssenger() {
    if ($('#fuser').val() != "Seleccione un Amigo") {
        var time = datetime();
        addinfo('send_mens', '&us=' + me.user + '&dest=' + $('#fuser').val() + '&msg=' + $('#mnn').val() + '&thb=' + me.thumb + '&time=' + time);
        $('#poput,#backdiv').hide();
    } else {
        notif({
               type: "warning",
               msg: "<b>Atención:</b> Error",
               position: "center"
        });
    }
}

function send_mens_ok() {
    var tx = '<font color="A63B00">***<b> Mensaje</b> Enviado Correctamente...</font>';
    writeon('*', tx);
		notif({
           msg: "<b>Éxito:</b> Mensaje enviado correctamente!",
           type: "success",
		   position: "center"
          });
}

function look_menssenger(w) {
    var ret = '<table id=\"look_popups\"><label style=\"position:absolute;top:-11px;left:100%;margin-left:-58px;\" class=\"triangle\"></label><tr><td colspan=\"3\" style=\"background:#FFFFFF;font-size:10px;height:25px;border-bottom:#DDDDDD solid 1px;\"><b>&nbsp;&nbsp;Mensajes Recientes: (Doble Clic Para Borrar)</b><span style=\"position:absolute;left:68%;color:#4A69A0;\" align=\"left\" onclick=\"send_new_msg();hidemepopup();\">Enviar un Mensaje Nuevo</span></td></tr></table><tr><div style="overflow:auto;max-height:400px;"><table>';
    m = 1, nn = [];
    var a = w.split('\||');

    var look = (a.length > 4) ? '<td onclick="show_messenger(2);" align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b>Ver todos los Mensajes</b></td>' : '<td align=\"center\" colspan=\"6\" style=\"background:#F7F7F7;border-top:#DDDDDD solid 1px;width:501px;height:25px;font-size:11px;color:#425F9B;cursor:pointer;\"><b>Mensajes Recientes</b></td>'

    for (var b in a) {
        var i = a[b].split('\|');
        var id = (i[0] != null) ? i[0] : '';
        var c = (i[1] != null) ? i[1] : 'Alerta';
        var d = (i[2] != null) ? '<img onclick="javascript:profile_offline(\'' + c + '\');" src="cc_data/44x42/th-' + i[2] + '" width=\"50\" height=\"50\" />' : '<img src="cc_data/44x42/th-00000.png" width=\"50\" height=\"50\" />';
        var g = (i[3] != null) ? i[3] : "No se encuentra ningun mensaje reciente";
        var h = (i[4] != null) ? i[4] : "";
        var l = (i[5] != '0') ? '<label title="Leido" class="look_of"></label>' : '<label title="Nuevo" class="look_on"></label>';
        var o = (g.length > 45) ? '<a onclick=\"to_read_more(\'' + id + '\',\'' + g + '\');\" style=\"position:relative;float:right;padding-right:5px;font-size:9px;\" id="more' + id + '">Leer m&aacute;s</a>' : '';
        nn[m] = '<table id="look_popup" style=\"border-bottom:#E9E9E9 solid 1px;padding-top:1px;padding-bottom:1px;\"><tr id="msg_' + id + '" onDblClick=\"delete_mesenger(\'' + id + '\');\"><td valign="top">' + d + '</td><td width="99%" style="\font-family:Arial, Helvetica, sans-serif;font-size:11px;vertical-align:text-top;font-style:italic;color:#666666;\" valign="top"><b style=\"color:#425F9B;\">' + c + ':</b>&nbsp;<span style=\"font-size:9px;color:#666666;\">' + h + '</span><a style=\"position:relative;float:right;padding-right:5px;font-size:9px;\">' + l + '</a><hr>&nbsp;<label style=\"position:relative;top:-2px;\" class=\"fl3\" />&nbsp;<a style="font-family:Arial, Helvetica, sans-serif;font-size:11px;vertical-align:text-top;font-style:italic;color:#666666;" id="xm_' + id + '">' + g.substr(0, 45) + '...</a>' + o + '</td></tr></table>';
        m++;
    }
    for (var r = 1; r < 300; r++) {
        var f = (nn[r] != null) ? nn[r] : '';
        ret += f;
    }
    ret += '</table></div><table><tr>' + look + '</tr>'
    ret += '</table>';
    $('#popups').html(ret);
    var x = $('#notyfy').offset().left + $('#notyfy').width() - $('#popups').width() + 4;
    var y = $('#notyfy').offset().top + $('#notyfy').height() + 11;
    $('#popups').css({
        'left': x,
        'top': y
    }).show();
    popup = $('#popups');
    $('#popups_wait').hide();
    $('#messenger').css('display', 'none');
    $('#messenger').html(0);
}

function to_read_more(w, v) {
    $('#xm_' + w).html(v + '<br>');
    $('#more' + w).hide();
}

function delete_mesenger(w) {
    $.post('./cc_clases/lv_mensajes.php?act=delete_mesenger&mensaje=' + w + '&user=' + me.user);
    $('#msg_' + w).remove();
}

function send_new_msg(w) {
    $('#dvmain').hide();
    if (me.stt != 0) {
        if (w != '') {
            $('#wait').center().show();
            open_mesenger('open_mensseger', $('#poput'), true);
            $('#fuser').val(w);
        } else {
            $('#wait').center().show();
            open_mesenger('open_mensseger', $('#poput'), true);
        }
    } else {
           notif({
              msg: "<b>Oops!</b> Error actualizando los datos!",
              type: "error",
              position: "center"
           });
    }
}

function reload_messenger(w, s) {
    if (w == me.user) {
        if (s > 0) {
            $('#messenger').css('display', '');
            $('#messenger').html(s);
        } else {
            $('#messenger').html(0);
        }
    }
}

function sendmydata() {
    addinfo('chgmydata', '&pf_s=' + $('#pf_s').val() + '&pf_a=' + $('#pf_a').val() + '&pf_m=' + $('#pf_m').val() + '&pf_p=' + $('#pf_p').val() + '&pf_i=' + $('#pf_i').val() + '&pf_fb=' + $('#pf_fb').val() + '&pf_pr=' + $('#pf_pr').val(), 1);
    $('#dvmain,#backdiv').hide();
    wait();
}

var apptitle = "LiveMessenger - Chat Educativo"

function acttitle() {
    w = me.user + " - " + apptitle;
    $(document).attr('title', w);
    $('#wtphoto').attr("src", 'cc_data/44x42/th-' + me.thumb);
}

document.onclick = function(e) {

    var a = _os(e),
        b = a.parentNode,
        c = $(b).attr('clr');

    if (c != null) {
        txc = c;
        hidemepopup();
        putstyle();
        $('#txmess').focus();
    }

}
function errorfull() {
    $('#loading').css('display', 'none');
notif({
	           msg: "<b>Uff!</b> Parece que somos demasiados, intenta mas tarde!",
	           type: "error",
	           position: "center"
            });
}

function errorclose() {
    $('#loading').css('display', 'none');
notif({
	           msg: "<b>Atención!</b> Servidor cerrado por mantenimiento!",
	           type: "error",
	           position: "center"
            });
}

function errorpass() {
    $('#loading').css('display', 'none');
notif({
	           msg: "<b>Login!</b> Error en contraseña de usuario!",
	           type: "error",
	           position: "center"
            });
} 

function errorban() {
    $('#loading').css('display', 'none');
notif({
	           msg: "<b>Oops!</b> Estas baneado del servidor!",
	           type: "error",
	           position: "center"
            });
}

function warnperf() {
     $('#backdiv,#wait').hide();
     notif({
	           msg: "<b>Oops!</b> No se han modificado los datos!",
	           type: "warning",
	           position: "center"
     });
}

function error(w) {
    var msg = ['Error a la hora de actualizar el perfil...', 'Debes estar Registrado en el Chat. Cambia tu contraseña y te registraras.', 'Cambie el Topic correctamente...', 'No se pudo cambiar la contrase&ntilde;a...', 'El usuario debe tener entre 4 y 15 letras...', 'Su nick no esta Permitido...', 'El nombre de usuario es Incorrecto...', 'Error en contrase&ntilde;a de usuario...', 'Est&aacute;s baneado del Servidor...', 'Server full intentelo mas tarde...', 'No es una imagen...', 'No m&aacute;s de 3 emoticones...', 'Privilegios insuficientes...', 'No Repeat en el chat...', 'Servidor Cerrado por Mantenimiento...', 'Seleccione un Nick...', 'Seleccione un amigo antes de enviar...', 'Permitido solo para los Administradores...', 'Upss, se te ha olvidado marcar Soy Humano o eres un Bot!!...'];
    systemalert(0, 'Atencion', msg[w]);
    $('#wt_user,#wt_pw,#login_ok').attr('disabled', false);
    $('#loading').css('display', 'none');
    $('#dvmain').hide("show");
    $('#wait').hide();
}

function pwdok() {
	notif({
           msg: "<b>Éxito:</b> Password cambiada correctamente!",
           type: "success",
		   position: "center"
          });
    $('#dvmain').hide("show");
    $('#backdiv,#wait').hide();
}

function registerok() {
	notif({
           msg: "<b>Éxito:</b> Usuario registrado con exito!",
           type: "success",
		   position: "center"
          });
    $('#dvmain').hide("show");
    $('#backdiv,#wait').hide();
	$('#pref,#perfil,#friends,#dmensajes,#ushoras,#usrules,#chgpass').show();
	$('#register').hide();
}

function pwderrdif() {
	notif({
	           msg: "<b>Oops!</b> Las contraseñas no coinciden!!",
	           type: "error",
	           position: "center"
            });
}
function pwderrc() {
	notif({
	           msg: "<b>Oops!</b> La contraseña debe tener 5 o mas caracteres!!",
	           type: "error",
	           position: "center"
            });
}

function sendprof() {
	var a = document.getElementById("pwrnew").value;
	var b = document.getElementById("pwrnewr").value;
	if(a == ""){
		pwderrc();
		}else{
	if(a != b){
		pwderrdif();
		}else{	
	if (a.length < 5) {
		pwderrc();
		}else{
    addinfo('chgpass', '&pwrnew=' + $('#pwrnew').val() + '&pwrnewr=' + $('#pwrnewr').val(), 1);
    $('#pwrbut').attr('disabled', true);
    $('#dvmain,#backdiv').hide();
    $('#pref,#perfil,#friends,#dmensajes,#ushoras,#usrules,#chgpass').show();
	$('#register').hide();
		}}}
}

function register() {
	var c = document.getElementById("pwrnewreg").value;
	var d = document.getElementById("pwrnewregr").value;
	if(c == ""){
		pwderrc();
		}else{
	if(c != d){
		pwderrdif();
		}else{	
	if (c.length < 5) {
		pwderrc();
		}else{
    addinfo('register', '&pwrnewreg=' + $('#pwrnewreg').val() + '&pwrnewregr=' + $('#pwrnewregr').val(), 1);
    $('#pwrbut').attr('disabled', true);
    $('#dvmain,#backdiv').hide();
    $('#pref,#perfil,#friends,#dmensajes,#ushoras,#usrules,#register').show();
	$('#register').hide();
		}}}
}



function state(w) {
    var i = extract(w);
    if (i.user == me.user)
        retok(i);
    insertuser(w);
    var vis = ['Online', '', 'Fuera', 'Escribiendo', '', 'Jugando'];
    writeon('*', '<font color="A63B00">*** <b>' + i.user + '</b> cambia su status a : <b>' + vis[i.lnk] + '</b>...</font>');
}

function link(w) {
    if ((me.priv & 2) == 2) {
        systemalert(0, 'Alerta', '' + w + ' ha dado un link...');
    }
}

function divpin() {
    var x = $('#wricont').offset().right;
    var y = $('#wricont').offset().top - $('#dvtemp').height() + 2;
    $('#dvtemp').css({
        'right': x,
        'top': y
    }).show();
}

function s_write(w) {
    var ob = _go("_" + w);
    _sa("_" + w + "_im", 'class', 'ust3');
    if (ob != null)
        _sa(ob, 'write', '1');
    putstyle();
}

function insertuser(w) {
    var vis2 = ['Online', '', 'Fuera', 'Escribiendo', '', 'Jugando'];
	var i = extract(w);
    var nu = null;
    var ni = i.user + '_';
    if (i.lnk == null) i.lnk = 0;
    nu = _go(ni);
    var tu = whitesup(_go('tbusers'), 0, 0);
    if (nu == null) {
        nu = tu.cloneNode(true);
        $(whitesup(nu, 0, 1)).html('');
    }
    nu.id = ni;
    _sa(nu, 'lki', now());
    whitesup(nu, 1).onmousedown = function(e) {
        submenu(e, nu);
    }
    $(nu).attr('data', w);
    for (it in i) {
        if (it != 'id') _sa(nu, it, i[it]);
    }
    $(whitesup(nu, 1)).html(i.user);
    $(whitesup(nu, 0, 0)).attr('src', 'cc_data/44x42/th-' + i.thumb);
    if (i.user != me.user) $(whitesup(nu, 0, 0)).attr('onclick', 'profile_offline(\'' + i.user + '\')');
    else $(whitesup(nu, 0, 0)).attr('onclick', 'opclick("prof");');
    $(whitesup(nu, 2, 0)).attr('class', 'us02 star' + i.att);
    $(whitesup(nu, 1)).attr('class', 'us01 stt' + i.stt);
	$(whitesup(nu, 3, 0)).attr('class', 'us03 nav' + i.nav);
    $(whitesup(nu, 0, 0)).mouseenter(function() {
        hidemepopup();
       
        $('#mystt').html('<a class="typet">(' + estado + ')</a>');
        $('#ico_lnk').attr('class', 'ust' + i.lnk);
        $('#mythumb').attr('src', 'cc_data/44x42/th-' + i.thumb);
        $('#mynav').attr('class', 'nav' + i.nav);
		$('#myprov').attr('src', 'cc_recursos/prov/' + i.prov);
        $('#mysex').html(i.sex);
        $('#mystatus').html(vis2[i.lnk]); 
		$('#time_op').show();
		$('#time').show().html(tim(i.ttim));
		if ((me.priv & 1) == 1) {
            $('#myip_op').show();
            $('#myip').show().html(long2ip(i.ip));   
			 }
		if ($('#thetim').css('display') != 'none') {
            var x = $('#thetim').offset().left + $('#thetim').width() - $('#to_look').width() + 10;
            var y = $('#' + i.user + '_').offset().top - $('#to_look').height() + 55;
            $('#to_look').css({
                'left': x,
                'top': y
            }).show();
        } else {
            var x = $('#maxusers, #maxusersfuera').offset().left + $('#maxusers, #maxusersfuera').width() - $('#to_look').width() + 18;
            var y = $('#' + i.user + '_').offset().top - $('#to_look').height() + 55;
            $('#to_look').css({
                'left': x,
                'top': y
            }).show();
        }
        popup = $('#to_look');
    }).mouseleave(function() {
        $('#user').attr('class', 'user');
		$('#show_menug').attr('class', 'games');
        hidemepopup();
    });

    var bef = reu(tu.parentNode, i);
    if (bef == null) {
        _app(tu.parentNode, nu);
    } else {
        _instb(tu.parentNode, nu, bef);
    }
    thetotal();
    return nu;
}

function statist(w, v) {
    var a = w.split(",");
    var e = v.split(",");
    $('#thumb-ej').attr('src', 'cc_data/44x42/th-' + a[0]);
    $('#thumb-pr').attr('src', 'cc_data/44x42/th-' + e[0]);
    $('#us-ej').html(a[1] + ' cuenta con ' + tim(a[2]) + ' horas online...</font></a>');
    $('#us-pr').html(e[1] + ' cuenta con ' + e[2] + ' amigos...')
}

function youtube(w) {
    var a = w.split("\|");
    s_youtube(a[0], a[1], a[2], a[3], a[4], a[5]);
}

function s_youtube(image, ti, de, url, user) {
    var tx = '<table class="emotdiv"><tr><td style="width:90px;" class="playyt"><img onclick="javascript:ytplay(\'' + url + '\');" src="' + image + '" width="90" height="70"></td><td width="100%"><a class="tf_sys">&nbsp;&nbsp;' + user + " Comparte el siguientes Video:</a><br>&nbsp;&nbsp;<label class=\"vidyt\"></label><a href=\"#\" onclick=\"javascript:ytplay('" + url + "');\">http://www.youtube.com/?v=" + url + "</a><br>&nbsp; &nbsp;<b>" + ti + "</b><br>&nbsp; &nbsp;<a class=\"tf_gray\">" + de + "...</a></td></tr></table>";
    writeon('*', tx);
}

var ytc = 0;

function ytplay(w) {
    ytc++;
    var myid = "ytc" + ytc;

    $('#selfpopup').html('<div class="ytcontent" id="' + myid + '"></div>').center().show();
    popup = $('#selfpopup');

    $('#' + myid).tubeplayer({
        width: 640,
        height: 385,
        allowFullScreen: "true",
        initialVideo: w,
        preferredQuality: "default"
    }).tubeplayer('play');

    $('#backdiv').show();
}

function youtubewt() {
    var x = $('.butt2').offset().left + $('.butt2').width() - $('#divyoutube').width() + 7;
    var y = $('.butt2').offset().top - $('#divyoutube').height() - 3;
    $('#divyoutube').css({
        'left': x,
        'top': y
    }).show();
    $('#ytbe').attr('class', 'ytbe_active');
    $('.butt2').attr('class', 'butt2_active');
    popup = $('#divyoutube');
}

function facebook() {
    var x = $('.butt5').offset().left + $('.butt5').width() - $('#faceb').width() + 7;
    var y = $('.butt5').offset().top - $('#faceb').height() - 2;
    //$('#faceb').attr('src', 'http://localhost');
    $('#faceb').css({
        'left': x,
        'top': y
    }).show();
    $('.butt5').attr('class', 'butt5_active');
    $('#face').attr('class', 'face_active');
    popup = $('#faceb');
}

function sendyoutube() {
    if ($('#urlyt').val() == '') {
        error(14);
    } else {
        addinfo('youtube', '&vid=' + $('#urlyt').val() + '&dest=' + dest, 1);
        $('#urlyt').val('');
        hidemepopup();
    }
}

function systemalert(ty, ti, ms) {
    $('#shot').show();
    $('#backdiv').show();
    var ad = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:300px;\"><tr><td class=\"topmyzone\" style=\"color:#FFFFFF;height:25px;font-size:11px;border-radius: 5px 5px 0px 0px;\"><b>&nbsp;&nbsp;" + ti + "</b></td></tr><tr><td style=\"padding:5px;color:#666666;\">&nbsp; &nbsp; " + ms + "</td></tr><tr><td style=\"padding-bottom:5px;padding-top:2px;padding-left:3px;border-top:#EEEEEE solid 1px;\"><input class=\"btn btn-primary btn-submit button-radius\" type=\"button\" onclick=\"$('#superalert').hide();$('#backdiv,#shot').hide()\" value=\"Aceptar\"></td></tr></table>";
    $('#superalert').html(ad).center().show();
}

var repeat = null;

function s_onrepeat(w) {
    repeat = w;
    $('#txmess').attr('disabled', true);
}

function s_ofrepeat() {
    var interv = now() / 1000;
    if (interv >= repeat) {
        $('#txmess').attr('disabled', false);
        repeat = null;
    }
}

var popup = null;

function hidemepopup(w) {
    if (popup != null) {
        var fn = 0;
        $(w).parents().each(function() {
            if (this == popup.get(0)) fn = 1;
        })
        if (fn == 0) {
            closepopup();
        }
    }
}

function closepopup() {
    $(popup).hide();
    $("#backdiv").hide();
    popup = null;
    $('#google').val('');
    $('.messeger_active').attr('class', 'messeger');
    $('#user').attr('class', 'user');
    $('.solicitudes_friends_active').attr('class', 'solicitudes_friends');
    $('.notification_active').attr('class', 'notification');
    $('#emoticons').attr('class', 'emoticons');
    $('#adjuntos').attr('class', 'adjuntos');
    $('#colors').attr('class', 'colors');
    $('#face').attr('class', 'face');
    $('#ytbe').attr('class', 'ytbe');
    $('#anno').attr('class', 'anno');
    $('.butt3_active').attr('class', 'butt3');
    $('.butt4_active').attr('class', 'butt4');
    $('.butt2_active').attr('class', 'butt2');
    $('.butt5_active').attr('class', 'butt5');
    $('.buttl_active').attr('class', 'buttl');
    $('.butt6_active').attr('class', 'butt6');
    $('#photo_back,#photo_esp').hide();
    $("#ytc" + ytc).remove();
}