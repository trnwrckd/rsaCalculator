//uggh
function mod( m, n ){	
    //alert("m="+m+"n="+n);	
    var _q = Math.floor(m/n);
    var _qq = m-(n*_q);
    return _qq; 
}

function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}
//
function getPrime(){
    var v1 = Math.floor(Math.random() * 1000+127);
    var v2 = Math.floor(Math.random() * 200+127);
    if(is_prime(v1) && is_prime(v2)){
        pickRandom(v1,v2);
    } else getPrime();
}
function pickRandom(v1,v2){

    $("#p").val(v1);
    $("#q").val(v2);
    $("#pval").html(v1);
    $("#qval").html(v2);
    pq();
}
function info (valu,place){
    var v = valu;
    //console.log="ok from info" + valu + place;
    var place = place;
    if(valu!= ''){
        place.html(v);
    } else place.html("");
}
function is_prime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++){
      if (num % i === 0) return false;
    }
    return true;
}
function primeFactor(num){
    const list = [];
    for (let i = 2; i <= num; i++){
        while (is_prime(i) && num % i === 0) {
            if (!list.includes(i)) list.push(i);
            num /= i;
    }
  }
  return list;
}
function pq(){
    $("#warning").html("");
    $("#pq").fadeOut(250);
    $("#candidates").fadeOut(250);
    p = $("#p").val(); 
    q=$("#q").val();  

    if(p!="" && q!=""){
        if( p== q){
            $("#warning").html("p & q can't be equal");
            $("#pq").fadeOut(250);
        }else{
        var pq = p* q;
        $("#pqval").html (pq);
        var _pq = (p-1)*(q-1);
        $("#fi").html (_pq);
        //candidate list
        const cand = [];
        var j = 1;

        for (var i = 0; i < 30; i++) {
            var x = (_pq * j) + 1;
            cand.push(x);
            j++;
        }
        var msg = cand.join(" ");
        $("#list").html(msg);
        $("#pq").fadeIn(250);
        $("#candidates").fadeIn(500);}
    }
    
    else if(p=="" && q==""){
        $("#pqval").html ("");
        $("#fi").html("");
    } 
    else if(!is_prime(p) && !is_prime(q)){
        $("#pq").fadeOut(500);
        $("#candidates").fadeOut(250);
    }
    

}
$(document).ready(function()    {
    const enc = [];
    const dec = [];
    console.log("ok");
    $("#rando").on("click", getPrime);
    $("#p").keyup( ()=>{
        var x = $("#p").val();
        var y = $("#pval"); 
        if(!is_prime(x)){
            $("#pval").html("Not prime");
            $("#pq").fadeOut(500);
            $("#candidates").fadeOut(250);
        }
        else{
            info( x, y);
            pq();
        }
    });
    $("#q").keyup( ()=>{
        var x = $("#q").val();
        var y = $("#qval"); 
        if(!is_prime(x)){
            $("#qval").html("Not prime");
            $("#pq").fadeOut(500);
            $("#candidates").fadeOut(250);
        }else{
            info(x, y);
            pq();
        }
    });
    $("#first").on("click",()=>{$("#rsa").fadeOut(500);$("#proceed").fadeOut(500);});
    $("#k").keyup( ()=>{
        var x = $("#k").val();
        if(x!= ""){
            if(is_prime(x)){ $("#kval").html("the value you chose for k is prime"); }
            else{
                var pf = primeFactor(x);
                var txt = pf.join("*");
                $("#kval").html("Possible values for e & d: "+txt);
            }
        } else $("#kval").html("");

    });
    $("#check").on("click",function(event){
            event.preventDefault();
            var e = $("#e").val();
            var d = $("#d").val();
            var fi = $("#fi").html();
            var accpt = (e*d)%fi;
            
            if(accpt==1){
                $("#accpt").css("color","green");
                $("#accpt").html("the values of e & d are acceptable");
                $("#accpt").fadeIn(500);
                $("#accpt").fadeOut(2000,()=>{
                $("#proceed").fadeIn(100);

            });
            } else{
                $("#accpt").css("color","red");
                $("#accpt").html("the values of e & d are not acceptable");
                $("#accpt").fadeIn(500);
                $("#accpt").fadeOut(2000);
            }
            
    });
    $("#encMsg").on("click", ()=>{
        $("#encfnl").slideUp(250);
    });
    $("#decMsg").on("click", ()=>{
        $("#decfnl").slideUp(250);
    });
    $("#encBtn").on("click",function (event) {
        event.preventDefault();
        var encMsg = $("#encMsg").val();
        var exp = $("#e").val();
        var mod = $("#pqval").html();
        var exp2 = $("#d").val();
        for (var i = 0; i < encMsg.length; i++) {
            var x = encMsg.charCodeAt(i);
            var y = powerMod(x, exp, mod);
            enc.push(y);
        }
        var msg2 = String.fromCharCode(...enc);
        var numForm = enc.join( ",");
        $("#encodeResult").val(msg2);
        $("#EncNumForm").val(numForm);
        enc.length = 0;
        $("#encfnl").slideDown(500);
    });

//    take encrypted message from user and decrypt
    
    $("#decBtn").on("click",function (event) {
        event.preventDefault();
        var msg = $("#decMsg").val();
        var d = $("#d").val();
        var n = $("#pqval").html();
        var isNumber = /^[0-9,]*$/.test(msg);
        if (isNumber) {
            const binaryArray = msg.split(',').map(Number);
            for (var i = 0; i < binaryArray.length; i++) {
                var z = powerMod(binaryArray[i], d, n);
                dec.push(z);
            }
            var msg2 = String.fromCharCode(...dec);
            var numForm = dec.join( ",");
            $("#decodeResult").val(msg2);
            $("#decNumForm").val(numForm);
            dec.length = 0;
        } else {
            for (var i = 0; i < msg.length; i++) {
                var x = msg.charCodeAt(i);
                var z = powerMod(x, d, n);
                dec.push(z);
            }
            var msg2 = String.fromCharCode(...dec);
            $("#decodeResult").val(msg2);
            var numForm = dec.join( ",");
            $("#decNumForm").val(numForm);
            dec.length = 0;
        }
        $("#decfnl").slideDown(500);
    });
    });
