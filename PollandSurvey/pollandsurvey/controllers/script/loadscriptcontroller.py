# -*- coding: utf-8 -*-
"""Survey Controller"""

from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context,validate
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from pollandsurvey import model
from pollandsurvey.controllers.secure import SecureController
from pollandsurvey.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from pollandsurvey.lib.base import BaseController
from pollandsurvey.controllers.error import ErrorController

import sys;


from tg import tmpl_context
from pollandsurvey.widget.movie_form import create_movie_form

__all__ = ['ScriptController']


class ScriptController(BaseController):
    
    @expose()
    def index(self, came_from=lurl('/')):
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)
    
    @expose(content_type = 'text/plain; charset=windows-874')
    def loadLang(self, lang=None ,**kw):
        reload(sys);
        sys.setdefaultencoding("utf-8");
        language = "en";
        if( lang is not None):
            language = lang;
            
        label = model.LanguageLabel.getAll(1);
        

        str = 'Ext.namespace("opina.locale");\n';
        for l in label:
            str = str + l.module + '.' + l.default_label + '="'  + l.getLang(language)+'";' + '\n';
            print str;
        
        return str;
            
    
    @expose(content_type="text/plain")
    def loadExtjs(self,**kw):
        str = """
        
        (function() {
            function getQueryParam(name) {
                var regex = RegExp('[?&]' + name + '=([^&]*)');
        
                var match = regex.exec(location.search) || regex.exec(path);
                return match && decodeURIComponent(match[1]);
            }
        
            function hasOption(opt, queryString) {
                var s = queryString || location.search;
                var re = new RegExp('(?:^|[&?])' + opt + '(?:[=]([^&]*))?(?:$|[&])', 'i');
                var m = re.exec(s);
        
                return m ? (m[1] === undefined || m[1] === '' ? true : m[1]) : false;
            }
        
            function getCookieValue(name){
                var cookies = document.cookie.split('; '),
                    i = cookies.length,
                    cookie, value;
        
                while(i--) {
                   cookie = cookies[i].split('=');
                   if (cookie[0] === name) {
                       value = cookie[1];
                   }
                }
        
                return value;
            }
        
            var scriptEls = document.getElementsByTagName('script'),
                path = scriptEls[scriptEls.length - 1].src,
                rtl = getQueryParam('rtl'),
                theme = getQueryParam('theme') || 'crisp',
                includeCSS = !hasOption('nocss', path),
                useDebug = hasOption('debug'),
                hasOverrides = !hasOption('nooverrides', path) && !!{
                    // TODO: remove neptune
                    neptune: 1,
                    classic: 1,
                    gray: 1,
                    'neptune-touch': 1,
                    crisp: 1,
                    'crisp-touch': 1
                }[theme],
                repoDevMode = getCookieValue('ExtRepoDevMode'),
                packagePath,
                themePath,
                i = 3,
                overridePath, extPrefix;
        
            rtl = rtl && rtl.toString() === 'true';
        
            while (i--) {
                path = path.substring(0, path.lastIndexOf('/'));
            }
            // path == root of ext
            path = "/javascript/extjs/"    
            theme = 'ext-theme-' + theme;
            packagePath = path + '/packages/' + theme + '/build/';
            themePath = packagePath + 'resources/' + theme + (rtl ? '-all-rtl' : '-all');
             
            if (includeCSS) {
                document.write('<link rel="stylesheet" type="text/css" href="' +
                                    themePath + '-debug.css"/>');
            }
        
            extPrefix = useDebug ? '/ext' : '/ext-all';
            
            document.write('<script type="text/javascript" src="' + path + extPrefix +
                                    (rtl ? '-rtl' : '') + '.js"></script>');
        
            if (hasOverrides) {
                // since document.write('<script>') does not block execution in IE, we need to 
                // makes sure we prevent ext-theme-neptune.js from executing before ext-all.js
                // normally this can be done using the defer attribute on the script tag, however
                // this method does not work in IE when in repoDevMode.  It seems the reason for
                // this is because in repoDevMode ext-all.js is simply a script that loads other
                // scripts and so Ext is still undefined when the neptune overrides are executed.
                // To work around this we use the _beforereadyhandler hook to load the neptune
                // overrides dynamically after Ext has been defined.
                overridePath = packagePath + theme + (repoDevMode ? '-debug' : '') + '.js';
        
                if (repoDevMode &&  window.ActiveXObject) {
                    Ext = {
                        _beforereadyhandler: function() {
                            Ext.Loader.loadScript({ url: overridePath });
                        }
                    };
                } else {
                    document.write('<script type="text/javascript" src="' +
                                    overridePath + '" defer></script>');
                }
            }
        
        })();
        
        """;
        
        return str;
    
    
    
    