function conv() {
	const SYSnum = document.getElementById("NUMsys").value;
	let inp_element = document.getElementById("inp_element").value.toUpperCase(); 
	let number;
	try {
		switch (SYSnum) {
			case "decimal":
				number = BigInt(inp_element);
				document.getElementById("dec").value = "chosen";
				break;
			case "binary":
				number = BigInt("0b" + inp_element);
				document.getElementById("bin").value = "chosen";
				break;
			case "octal":
				number = BigInt("0o" + inp_element);
				document.getElementById("oct").value = "chosen";
				break;
			case "hexadecimal":
				number = BigInt("0x" + inp_element);
				document.getElementById("hex").value = "chosen";
				break;
			default:
				alert("Invalid numeral system");
				return;
		}
	} catch (e) {
		alert("Invalid input for the selected numeral system");
		return;
	}
	if (SYSnum !== "decimal") {
		document.getElementById("dec").value = number.toString(10);
	}
	if (SYSnum !== "binary") {
		document.getElementById("bin").value = number.toString(2);
	}
	if (SYSnum !== "octal") {
		document.getElementById("oct").value = number.toString(8);
	}
	if (SYSnum !== "hexadecimal") {
		document.getElementById("hex").value = number.toString(16).toUpperCase();
	}
}







//second page and 3rd


   function findTwosComplement(binStr) {
            let invertedBinStr = '';
            for (let i = 0; i < binStr.length; i++) {
                invertedBinStr += binStr[i] === '0' ? '1' : '0';
            }

            let carry = 1;
            let twosComplement = '';
            for (let i = invertedBinStr.length - 1; i >= 0; i--) {
                if (invertedBinStr[i] === '1' && carry === 1) {
                    twosComplement = '0' + twosComplement;
                } else if (invertedBinStr[i] === '0' && carry === 1) {
                    twosComplement = '1' + twosComplement;
                    carry = 0;
                } else {
                    twosComplement = invertedBinStr[i] + twosComplement;
                }
            }

            if (carry === 1) {
                twosComplement = '1' + twosComplement;
            }
            return twosComplement;
        }

		
        function binaryAddition(bin1, bin2) {
            let result = '';
            let carry = 0;
            let maxLength = Math.max(bin1.length, bin2.length);

            bin1 = bin1.padStart(maxLength, '0');
            bin2 = bin2.padStart(maxLength, '0');

            for (let i = maxLength - 1; i >= 0; i--) {
                let bit1 = parseInt(bin1[i]);
                let bit2 = parseInt(bin2[i]);

                let sum = bit1 + bit2 + carry;
                if (sum >= 2) {
                    result = (sum % 2) + result;
                    carry = 1;
                } else {
                    result = sum + result;
                    carry = 0;
                }
            }

            if (carry === 1) {
                result = '1' + result;
            }

            return result;
        }

        function cal1() {
            const bin1 = document.getElementById('bininp1').value;
            const bin2 = document.getElementById('bininp2').value;

            if (!/^[01]+$/.test(bin1) || !/^[01]+$/.test(bin2)) {
                alert("Invalid binary number");
                return;
            }

            const twosComplementBin2 = findTwosComplement(bin2);
            let result = binaryAddition(bin1, twosComplementBin2);

            if (result.length > bin1.length) {
                result = result.substring(1);
            }

			document.getElementById('binres').value = result;
			document.getElementById("twosComplement").value = findTwosComplement();
			
        }
