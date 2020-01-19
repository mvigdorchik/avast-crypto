var alphabet = "abcdefghijklmnopqrstuvwxyz";

function addToChar(char, n) {
	if (char.match(/[a-z]/i)) {
	    var ascii = char.charCodeAt(0);

	    // The extra % operator deals with when the ascii becomes negative which javascript handles stupidly
	    if ((ascii >= 65) && (ascii <= 90))
		char = String.fromCharCode(((((ascii - 65 + n) % 26) + 26) % 26) + 65);
	    if ((ascii >= 97) && (ascii <= 122))
		char = String.fromCharCode(((((ascii - 97 + n) % 26) + 26) % 26) + 97);

	    return char;
	}
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
