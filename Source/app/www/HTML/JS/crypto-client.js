/*
 * @project: TERA
 * @version: Development (beta)
 * @copyright: Yuriy Ivanov 2017-2019 [progr76@gmail.com]
 * @license: MIT (not for evil)
 * Web: http://terafoundation.org
 * GitHub: https://github.com/terafoundation/wallet
 * Twitter: https://twitter.com/terafoundation
 * Telegram: https://web.telegram.org/#/im?p=@terafoundation
*/

var MAX_SUPER_VALUE_POW = 2 * (1 << 30);

function GetHashWithValues(r,e,t,n)
{
    var a;
    return (a = n ? r : r.slice())[0] = 255 & e, a[1] = e >>> 8 & 255, a[2] = e >>> 16 & 255, a[3] = e >>> 24 & 255, a[4] = 255 & t,
    a[5] = t >>> 8 & 255, a[6] = t >>> 16 & 255, a[7] = t >>> 24 & 255, shaarr(a);
};

function GetPowPower(r)
{
    for(var e = 0, t = 0; t < r.length; t++)
    {
        var n = Math.clz32(r[t]) - 24;
        if(e += n, 8 !== n)
            break;
    }
    return e;
};

function GetPowValue(r)
{
    var e = 2 * (r[0] << 23) + (r[1] << 16) + (r[2] << 8) + r[3];
    return e = 256 * (e = 256 * e + r[4]) + r[5];
};

function CreateNoncePOWExtern(r,e,t,n)
{
    for(var a = [], o = 0; o < r.length; o++)
        a[o] = r[o];
    n || (n = 0);
    for(var T = 0, _ = MAX_SUPER_VALUE_POW, E = n; E <= n + t; E++)
    {
        var i = GetPowValue(GetHashWithValues(a, E, e, !0));
        i < _ && (T = E, _ = i);
    }
    return T;
};

function CreateHashBody(r,e,t)
{
    var n = r.length - 12;
    r[n + 0] = 255 & e, r[n + 1] = e >>> 8 & 255, r[n + 2] = e >>> 16 & 255, r[n + 3] = e >>> 24 & 255, r[n + 4] = 0, r[n + 5] = 0,
    r[(n = r.length - 6) + 0] = 255 & t, r[n + 1] = t >>> 8 & 255, r[n + 2] = t >>> 16 & 255, r[n + 3] = t >>> 24 & 255, r[n + 4] = 0,
    r[n + 5] = 0;
    for(var a = sha3(r), o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    T = 0; T < TR_TICKET_HASH_LENGTH; T++)
        o[T] = a[T];
    return WriteUintToArrOnPos(o, e, TR_TICKET_HASH_LENGTH), sha3(o);
};

function GetBlockNumTr(r)
{
    var e = window.DELTA_FOR_TIME_TX + GetCurrentBlockNumByTime();
    if(r[0] === TYPE_TRANSACTION_CREATE)
    {
        var t = 10 * Math.floor(e / 10);
        t < e && (t += 10), e = t;
    }
    return e;
};
window.TYPE_TRANSACTION_CREATE = 100, window.TR_TICKET_HASH_LENGTH = 10, window.DELTA_FOR_TIME_TX = 0, window.MIN_POWER_POW_TR = 0,
window.MIN_POWER_POW_ACC_CREATE = 0, window.CONSENSUS_PERIOD_TIME = 1e3, window.FIRST_TIME_BLOCK = 15304464e5, window.SetBlockChainConstant = function (r)
{
    var e = new Date - r.CurTime;
    r.DELTA_CURRENT_TIME || (r.DELTA_CURRENT_TIME = 0), window.DELTA_CURRENT_TIME2 = r.DELTA_CURRENT_TIME - e, window.MIN_POWER_POW_TR = r.MIN_POWER_POW_TR,
    window.MIN_POWER_POW_ACC_CREATE = r.MIN_POWER_POW_ACC_CREATE + 3, window.FIRST_TIME_BLOCK = r.FIRST_TIME_BLOCK, window.CONSENSUS_PERIOD_TIME = r.CONSENSUS_PERIOD_TIME,
    window.GetCurrentBlockNumByTime = function ()
    {
        var r = Date.now() + DELTA_CURRENT_TIME2 - FIRST_TIME_BLOCK;
        return Math.floor((r + CONSENSUS_PERIOD_TIME) / CONSENSUS_PERIOD_TIME);
    }, window.NWMODE = r.NWMODE;
}, window.GetCurrentBlockNumByTime = function ()
{
    return 0;
};
var LastCreatePOWTrType = 0, LastCreatePOWBlockNum = 0, LastCreatePOWHash = [255, 255, 255, 255];

function CreateHashBodyPOWInnerMinPower(r,e)
{
    var t = r[0], n = GetBlockNumTr(r);
    void 0 === e && (e = MIN_POWER_POW_TR + Math.log2(r.length / 128));
    for(var a = 0; ; )
    {
        var o = CreateHashBody(r, n, a);
        if(e <= GetPowPower(o) && !(LastCreatePOWBlockNum === n && LastCreatePOWTrType === t && 0 < CompareArr(LastCreatePOWHash, o)))
            return LastCreatePOWBlockNum = n, LastCreatePOWTrType = t, LastCreatePOWHash = o, a;
        ++a % 2e3 == 0 && (n = GetBlockNumTr(r));
    }
};

function CalcHashFromArray(r,e)
{
    void 0 === e && r.sort(CompareArr);
    for(var t = [], n = 0; n < r.length; n++)
        for(var a = r[n], o = 0; o < a.length; o++)
            t.push(a[o]);
    return 0 === t.length ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : 32 === t.length ? t : shaarr(t);
};

function GetArrFromValue(r)
{
    var e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    e[0] = 255 & r, e[1] = r >>> 8 & 255, e[2] = r >>> 16 & 255, e[3] = r >>> 24 & 255;
    var t = Math.floor(r / 4294967296);
    return e[4] = 255 & t, e[5] = t >>> 8 & 255, e;
};

function LoadLib(r)
{
    var e = document.createElement("script");
    e.type = "text/javascript", e.src = r, document.getElementsByTagName("head")[0].appendChild(e);
};

function IsMS()
{
    return 0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv\:11\./) ? 1 : 0;
};

function LoadSignLib()
{
    window.SignLib || LoadLib("./JS/sign-lib-min.js");
};
