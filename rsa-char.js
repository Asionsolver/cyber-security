function gcd(a, h) {
    let temp;
    while (true) {
        temp = a % h;
        if (temp === 0) return h;
        a = h;
        h = temp;
    }
}

function modularExponentiation(base, exp, mod) {
    let result = 1;
    base = base % mod; // Handle cases where base > mod
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2); // Divide exp by 2
        base = (base * base) % mod;
    }
    return result;
}

function modularInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    if (phi === 1) return 0;

    while (e > 1) {
        // q is quotient
        q = Math.floor(e / phi);
        t = phi;

        // phi is remainder now, process same as Euclid's algo
        phi = e % phi;
        e = t;
        t = x0;

        x0 = x1 - q * x0;
        x1 = t;
    }

    // Make x1 positive
    if (x1 < 0) x1 += m0;

    return x1;
}

function rsaEncryptChar(char, p, q) {
    // Step 1: Generate keys
    const n = p * q; // Part of the public key
    const phi = (p - 1) * (q - 1);

    // Find public key exponent 'e'
    let e = 2;
    while (e < phi) {
        if (gcd(e, phi) === 1) break; // e must be coprime to phi
        e++;
    }

    // Find private key exponent 'd' using modular inverse
    const d = modularInverse(e, phi);

    // Step 2: Convert the character to its ASCII value
    const m = char.charCodeAt(0);

    // Step 3: Encrypt the character
    const c = modularExponentiation(m, e, n);

    return { encrypted: c, privateKey: d, publicKey: { e, n } };
}

function rsaDecryptChar(encryptedChar, privateKey, n) {
    // Decrypt the character
    const m = modularExponentiation(encryptedChar, privateKey, n);

    // Convert the numeric value back to a character
    return String.fromCharCode(m);
}

// Example Usage
const p = 61; // A large prime number
const q = 53; // Another large prime number
const char = 'Y'; // Single character to encrypt

// Encrypt the character
const { encrypted, privateKey, publicKey } = rsaEncryptChar(char, p, q);
console.log(`Original Character: ${char}`);
console.log(`Encrypted Character (numeric): ${encrypted}`);
console.log(`Public Key: e = ${publicKey.e}, n = ${publicKey.n}`);
console.log(`Private Key: d = ${privateKey}`);

// Decrypt the character
const decryptedChar = rsaDecryptChar(encrypted, privateKey, publicKey.n);
console.log(`Decrypted Character: ${decryptedChar}`);
