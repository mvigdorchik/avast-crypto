function caesarCipher(s, n) {
    if (n < 0)
	return caesarCipher(s, n + 26);

    var result = '';

    for (var i = 0; i < s.length; i++) {
	var char = s[i];

	if (char.match(/[a-z]/i)) {
	    var ascii = s.charCodeAt(i);

	    if ((ascii >= 65) && (ascii <= 90))
		char = String.fromCharCode(((ascii - 65 + n) % 26) + 65);
	    if ((ascii >= 97) && (ascii <= 122))
		char = String.fromCharCode(((ascii - 97 + n) % 26) + 97);
	}

	result += char;
    }

    return result;
}
