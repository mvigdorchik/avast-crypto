var alphabet = "abcdefghijklmnopqrstuvwxyz";

var passwords = [
    "PASSWD",
    "HELLO",
    "H311O",
    "CHEESE",
    "N1GHT"
];

function addToChar(char, n) {
    var result = '';
    if (char.match(/[a-z]/i)) {
	var ascii = char.charCodeAt(0);
	
	// The extra % operator deals with when the ascii becomes negative which javascript handles stupidly
	if ((ascii >= 65) && (ascii <= 90))
	    result = String.fromCharCode(((((ascii - 65 + n) % 26) + 26) % 26) + 65);
	else if ((ascii >= 97) && (ascii <= 122))
	    result = String.fromCharCode(((((ascii - 97 + n) % 26) + 26) % 26) + 97);
	
	return result;
    } else
	return char;
}
function caesarCipher(s, n) {
    if (n < 0)
	return caesarCipher(s, n + 26);

    var result = '';

    for (var i = 0; i < s.length; i++) {
	var char = s[i];
	char = addToChar(char, n);

	result += char;
    }

    return result;
}

function vigenereCipher(s, key) {
    var result = '';

    for (var i = 0; i < s.length; i++) {
	var char = s[i];
	var ascii = key.charCodeAt(i % key.length);

	if ((ascii >= 65) && (ascii <= 90))
	    ascii = (((ascii - 65) % 26) + 26) % 26;
	if ((ascii >= 97) && (ascii <= 122))
	    ascii = (((ascii - 97) % 26) + 26) % 26;
	char = addToChar(char, ascii + 1);

	result += char;
    }
    
    return result;
}

function atbashCipher(s) {
    var result = '';
    var reversed = alphabet.split("").reverse().join("");

    for (var i = 0; i < s.length ; i++) {
	var posUpper = alphabet.toUpperCase().indexOf(s[i]);
	var posLower = alphabet.indexOf(s[i]);
	if (posLower === -1) {
	    if (posUpper === -1)
		result += s[i];
	    else
		result += reversed.toUpperCase()[posUpper];
	}
	else
	    result += reversed[posLower];
    }

    return result;
}
function gcd(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
	return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
	var t = y;
	y = x % y;
	x = t;
    }
    return x;
}

function RSA(p, q, M) {
    var n = p * q;
    var totient = (p-1) * (q - 1);
    var e;
    for (e = 2; e < totient; e++)
    {
	if (gcd(e,totient) == 1)
	    break;
    }
    var d = 1;
    while (true) {
	if ((d*e) % totient === 1) break;

	d++;
    }

    return [n, e, d, Math.pow(M,e) % n];
}

function RSADecrypt(c,d,n) {
    return Math.pow(c,d) % n;
}

function getPrimes(n) {
    var result = [];
    var count = 0;
    var i = 2;
    while (count != n) {
	var prime = true;
	for (var j = 2; j < i; j++) {
	    if (i % j === 0) {
		prime = false;
		break;
	    }
	}
	if (prime) {
	    count++;
	    result.push(i);
	}
	i++;
    }

    return result.slice(-2);
}
