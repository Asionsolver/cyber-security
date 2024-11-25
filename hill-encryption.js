function hillCipherEncrypt(plainText, keyMatrix) {
    // Convert plaintext to uppercase and remove spaces
    plainText = plainText.toUpperCase().replace(/\s+/g, '');

    // Calculate the size of the key matrix
    const keySize = keyMatrix.length;

    // Ensure the plaintext length is a multiple of the key size
    while (plainText.length % keySize !== 0) {
        plainText += 'X'; // Padding with 'X'
    }

    // Convert plaintext into numerical representation (A=0, B=1, ..., Z=25)
    const textVector = Array.from(plainText).map(char => char.charCodeAt(0) - 65);

    // Break plaintext into chunks and encrypt each chunk
    let cipherText = '';
    for (let i = 0; i < textVector.length; i += keySize) {
        const chunk = textVector.slice(i, i + keySize);

        // Multiply the chunk vector by the key matrix
        const encryptedChunk = keyMatrix.map(row => 
            row.reduce((sum, value, index) => sum + value * chunk[index], 0) % 26
        );

        // Convert numerical results back to letters
        cipherText += encryptedChunk.map(num => String.fromCharCode(num + 65)).join('');
    }

    return cipherText;
}

// Example usage
const keyMatrix = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15]
];

const plainText = "ASHIS";
const encryptedText = hillCipherEncrypt(plainText, keyMatrix);

console.log("Encrypted Text:", encryptedText);
