function hillCipherDecrypt(cipherText, keyMatrix) {
    const mod = 26;

    // Ensure ciphertext length is divisible by the key matrix size
    const keySize = keyMatrix.length;
    if (cipherText.length % keySize !== 0) {
        throw new Error("Ciphertext length must be a multiple of the key size.");
    }

    // Convert ciphertext to numerical representation
    const textVector = Array.from(cipherText).map(char => char.charCodeAt(0) - 65);

    // Get the inverse key matrix modulo 26
    const inverseKeyMatrix = invertKeyMatrix(keyMatrix, mod);
    if (!inverseKeyMatrix) {
        throw new Error("Key matrix is not invertible modulo 26.");
    }

    // Decrypt in blocks
    let plainText = '';
    for (let i = 0; i < textVector.length; i += keySize) {
        const block = textVector.slice(i, i + keySize);

        // Multiply the inverse key matrix with the block vector
        const decryptedBlock = inverseKeyMatrix.map(row =>
            row.reduce((sum, value, index) => sum + value * block[index], 0) % mod
        );

        // Convert numbers back to letters
        plainText += decryptedBlock.map(num => String.fromCharCode((num + mod) % mod + 65)).join('');
    }

    // Remove trailing 'X' padding characters
    plainText = plainText.replace(/X+$/, '');

    return plainText;
}

function invertKeyMatrix(matrix, mod) {
    const size = matrix.length;

    // Calculate determinant of the matrix
    let determinant = calculateDeterminant(matrix) % mod;
    if (determinant < 0) determinant += mod;

    // Calculate modular inverse of the determinant
    const determinantInverse = modularInverse(determinant, mod);
    if (determinantInverse === -1) return null; // Matrix not invertible

    // Compute adjugate (transpose of cofactor matrix)
    const adjugate = adjugateMatrix(matrix);

    // Multiply each element of adjugate by determinant inverse modulo 26
    const inverseMatrix = adjugate.map(row =>
        row.map(value => (value * determinantInverse) % mod).map(num => (num + mod) % mod)
    );

    return inverseMatrix;
}

function calculateDeterminant(matrix) {
    const size = matrix.length;
    if (size === 2) {
        // Determinant for 2x2 matrix: ad - bc
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let determinant = 0;
    for (let i = 0; i < size; i++) {
        determinant += matrix[0][i] * cofactor(matrix, 0, i);
    }
    return determinant;
}

function cofactor(matrix, row, col) {
    const minor = matrix
        .filter((_, r) => r !== row)
        .map(r => r.filter((_, c) => c !== col));
    return ((row + col) % 2 === 0 ? 1 : -1) * calculateDeterminant(minor);
}

function adjugateMatrix(matrix) {
    const size = matrix.length;
    const adjugate = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            adjugate[j][i] = cofactor(matrix, i, j); // Transpose of cofactors
        }
    }
    return adjugate;
}

function modularInverse(a, mod) {
    for (let x = 1; x < mod; x++) {
        if ((a * x) % mod === 1) return x;
    }
    return -1; // No modular inverse exists
}

// Example Usage
const keyMatrix = [
    [6, 24, 1],
    [13, 16, 10],
    [20, 17, 15]
];
const cipherText = "XUVJYF"; // Encrypted text
const decryptedText = hillCipherDecrypt(cipherText, keyMatrix);
console.log("Decrypted Text:", decryptedText);
