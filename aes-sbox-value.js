// Generate AES S-Box
function generateSBox() {
    const sBox = new Array(256);
    const inverse = new Array(256);

    // Calculate multiplicative inverse for all 256 bytes
    inverse[0] = 0; // 0 has no inverse in GF(2^8)
    for (let i = 1; i < 256; i++) {
        let a = i, b = 0x11b; // Irreducible polynomial: x^8 + x^4 + x^3 + x + 1
        let result = 1;

        while (a > 1) {
            if (a & 1) result ^= b; // XOR with the polynomial if LSB of a is 1
            a >>= 1; // Divide by x (shift right)
            b = (b << 1) ^ (b & 0x80 ? 0x11b : 0); // Multiply by x modulo polynomial
        }
        inverse[i] = result;
    }

    // Affine transformation
    for (let i = 0; i < 256; i++) {
        let x = inverse[i];
        let affine = x ^ (x << 1) ^ (x << 2) ^ (x << 3) ^ (x << 4); // Multiply by the affine matrix
        affine = (affine ^ 0x63) & 0xff; // Add constant and mask to byte
        sBox[i] = affine;
    }

    return sBox;
}

// Print the S-Box in a 16x16 matrix without "0x" prefix
function printSBox(sBox) {
    console.log("AES S-Box (16x16):");
    for (let row = 0; row < 16; row++) {
        const rowValues = sBox.slice(row * 16, (row + 1) * 16).map(
            value => `${value.toString(16).toUpperCase().padStart(2, "0")}`
        );
        console.log(rowValues.join(" "));
    }
}

// Find Row and Column values for a given item value
function findRowAndColumn(item, sBox) {
    const index = sBox.indexOf(item); // Find the index of the item in the S-Box

    if (index === -1) {
        throw new Error(`Item ${item.toString(16)} not found in the S-Box.`);
    }

    const row = Math.floor(index / 16); // Calculate row
    const col = index % 16; // Calculate column

    return { row, col };
}

// Example Usage
const sBox = generateSBox(); // Generate S-Box
printSBox(sBox); // Print the S-Box without "0x" prefix

const item = 0x28; // User-specified item (in hex format)

// Find the row and column for the item
try {
    const { row, col } = findRowAndColumn(item, sBox);
    console.log(
        `For Item ${item.toString(16).toUpperCase()}, the Row: ${row}, Column: ${col}`
    );
} catch (error) {
    console.error(error.message);
}
