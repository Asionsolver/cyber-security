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

// Find S-Box item using Row and Column without "0x" prefix
function findSBoxItem(row, column, sBox) {
    const index = row * 16 + column; // Calculate index
    if (index >= 0 && index < 256) {
        return sBox[index]; // Return item
    } else {
        throw new Error("Invalid Row or Column value. Must be between 0 and 15.");
    }
}

// Example Usage
const sBox = generateSBox(); // Generate S-Box
printSBox(sBox); // Print the S-Box without "0x" prefix

const row = 1; // User-specified row
const column = 5; // User-specified column

// Find the item at the specified row and column
try {
    const item = findSBoxItem(row, column, sBox);
    console.log(
        `S-Box Item at Row: ${row}, Column: ${column} is: ${item.toString(16).toUpperCase()}`
    );
} catch (error) {
    console.error(error.message);
}
