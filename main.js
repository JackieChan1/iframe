/**
 * Created by Pain on 16.02.2016.
 */
var myObject = (function () {

    var cons = function () {
        index.DOM.ready(function () {
            for (var i in index.tasks) {
                index.tasks[i].apply(this);
            }
        });
    };

    var index = {
        DOM: {
            clas: function (el, className) {

                    return el.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(el.className);

            },

            createBtn: function (txt, callback) {
                var btn = document.createElement('button');
                btn.innerHTML = txt;
                index.DOM.addEvent(btn, 'click', callback);
                document.getElementById('buttons').appendChild(btn);
            },
            addEvent: function (el, evType, fn) {

                if (el.addEventListener) {
                    el.addEventListener(evType, fn, false);
                }
                else {
                    if (el.attachEvent) {
                        el.attachEvent('on' + evType, fn);
                    }
                }
            },

            getTable: function () {
                var tables = document.getElementsByTagName('table');
                for (var i in tables) {
                    var table = tables[i];
                    if (index.DOM.clas(table, 't1')) {
                        return table;
                    }
                }
            },

            cloneTable: function () {
                var newTable = index.DOM.getTable();
                newTable = newTable.cloneNode(true);

                return newTable;

            },

            ready: function (callback) {
                if (document && document.readyState && document.readyState === "complete") {
                    return callback();
                }
                if (window.addEventListener) {
                    window.addEventListener("DOMContentLoaded", callback, false);
                }

                return true;
            }

        },

        xml: {
            xmlHttp: function () {
                var x;
                try {
                    x = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        x = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (E) {
                        x = false;
                    }
                }
                if (!x && typeof XMLHttpRequest != 'undefined') {
                    x = new XMLHttpRequest();
                }
                return x;
            },
            get: function (url) {
                var xmlHttp = index.xml.xmlHttp();
                xmlHttp.open("GET", url + '?r=' + Math.random(), true);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4) {
                        if (xmlHttp.status == 200) {
                            alert(xmlHttp.responseText);
                        }
                    }
                    return xmlHttp.send(null);
                }
            }
        },

        mCookie: {

            get: function (name) {
                var regexp = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)");
                var matches = document.cookie.match(regexp);
                return matches ? decodeURIComponent(matches[1]) : undefined;
            },
            set: function (name, value, opt) {
                opt = opt || {};

                var expires = opt.expires;

                if (typeof expires == "number" && expires) {
                    var date = new Date();
                    date.setTime(date.getTime() + expires * 1000);
                    expires = opt.expires = date;
                }
                if (expires && expires.toUTCString) {
                    opt.expires = expires.toUTCString();
                }

                value = encodeURIComponent(value);

                var updatedCookie = name + "=" + value;

                for (var propName in opt) {
                    updatedCookie += "; " + propName;
                    var propValue = opt[propName];
                    if (propValue !== true) {
                        updatedCookie += "=" + propValue;
                    }
                }
                document.cookie = updatedCookie;
                return value;
            },

            'delete': function (name) {
                index.cookie.set(name, '', {expires: -1});
            }
        },

        tasks: {

            1: function () {
                var newTable;
                var newClass = 't2';
                index.DOM.createBtn('task_1', function () {
                    newTable = index.DOM.cloneTable();
                    newTable.className = newClass;
                    for (var i = 0, r = [], rs = newTable.rows; i < rs.length, r = rs[i]; i++) {
                        r.insertBefore(r.children[2], r.children[1]);
                        for (var c = 0, col = [], cols = r.cells; c < cols.length, col = cols[c]; c++) {
                            col.className = newClass;
                        }
                    }
                    document.getElementById('tables').appendChild(newTable);
                });
            },

            2: function () {
                var newTable, newClass = 't2';
                index.DOM.createBtn('task_2', function () {
                    newTable = index.DOM.cloneTable();
                    newTable.className = newClass;
                    for (var r = 0, row, rows = newTable.rows; r < rows.length;  r++) {
                        row = rows[r];
                        for (var c = 0, col, cols = row.cells; c < cols.length; c++) {
                            col = cols[c];
                            col.className = newClass;

                            if (c == (cols.length - 1)) {
                                var newCol = col.cloneNode(true);
                                var lastCol = parseInt(col.innerHTML) + 1;
                                var col1 = parseFloat(cols[1].innerHTML);
                                var col2 = parseFloat(cols[2].innerHTML);

                                newCol.innerHTML = !r ? lastCol : (col1 + col2);
                                row.appendChild(newCol);
                                break;
                            }
                        }
                    }
                    document.getElementById('tables').appendChild(newTable);
                });
            },

            3: function () {
                var nCookie = index.mCookie.get('siteCookie');
                if (nCookie === undefined) {
                    nCookie = index.mCookie.set('siteCookie', 43, {expires: 24 * 24});
                }
                index.DOM.createBtn('task_3', function () {
                    var tables = document.getElementsByTagName('table');

                    for (var t = 0, table; t < tables.length, table = tables[t]; t++) {
                        for (var i = 1, r, rs = table.rows; i < rs.length, r = rs[i]; i++) {
                            for (var c = 1, col, cols = r.cells; c < cols.length, col = cols[c]; c++) {
                                col.innerHTML -= nCookie;
                            }
                        }
                    }
                });
            },

            4: function () {
                index.DOM.createBtn('task_4', function () {
                    var tables = document.getElementsByTagName('table');
                    var parm = [];
                    for (var t = 0, table; t < tables.length, table = tables[t]; t++) {
                        if (!index.DOM.clas(table, 't1')) {
                            continue;
                        }
                        for (var r = 1, i = 0, row, rows = table.rows; r < rows.length, row = rows[r]; r++) {
                            var cols = row.cells;
                            var p2 = parseFloat(cols[1].innerHTML);
                            var p3 = parseFloat(cols[2].innerHTML);
                            var ps = p2 + p3;
                            if (ps > 5) {
                                parm.push('r[' + i + '][p1]=' + cols[0].innerHTML);
                                parm.push('r[' + i + '][ps]=' + ps);
                                i++;
                            }
                        }
                        break;
                    }
                    if (parm.length) {
                        var url = 'http://domain.com?' + parm.join('&');
                        alert(url);
                        index.xml.get(url);
                    }
                });
            },

            5: function () {
                var i = 0;
                index.DOM.createBtn('task_5', function () {
                    var iframe = document.createElement('iframe');
                    var iframeId = 'iframe' + i++;
                    var url = document.URL;
                    iframe.id = iframeId;
                    iframe.style.width = "800px";
                    iframe.style.height = "800px";
                    iframe.src = url;
                    document.getElementById('iframes').appendChild(iframe);

                });
            },

            6: function () {
                var i = 0;
                index.DOM.createBtn('task_6', function () {
                    var iframe = document.createElement('iframe');
                    var id = 'iframe' + i++;
                    var url = document.URL + (document.URL.match(/\?/) ? '&' : '?');

                    iframe.id = iframe.name = id;
                    iframe.style.width = "800px";
                    iframe.style.height = "800px";
                    iframe.src = url;
                    document.getElementById('iframes').appendChild(iframe);
                });
            },

            7: function () {
                index.DOM.createBtn('task_7', function () {
                    var regexp = /<!--\s*js:[ ]*(.*)?-->/i, matches;
                    if (comm = document.documentElement.innerHTML.match(regexp)) {
                        alert(comm[1]);
                    }
                });
            }
        }
    };
    cons.prototype = index;
    return cons;
})();

new myObject;