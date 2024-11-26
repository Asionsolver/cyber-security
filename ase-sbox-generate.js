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

// Generate the S-Box
const sBox = generateSBox();

// Print S-Box in hexadecimal format
console.log("Generated AES S-Box:");
for (let i = 0; i < 256; i += 16) {
    console.log(sBox.slice(i, i + 16).map(byte => byte.toString(16).padStart(2, '0')).join(' '));
}
