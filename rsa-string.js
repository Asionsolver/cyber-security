// Function to calculate GCD (used for checking if numbers are coprime)
function gcd(a, h) {
    let temp;
    while (true) {
        temp = a % h;
        if (temp == 0) return h;
        a = h;
        h = temp;
    }
}

// Function to generate RSA keys
function generateKeys(p, q) {
    let n = p * q;
    let phi = (p - 1) * (q - 1);
    
    let e = 2;
    while (e < phi) {
        if (gcd(e, phi) == 1) break;
        else e++;
    }

    let d = modInverse(e, phi);  // Use modular inverse function for d

    return { publicKey: { e, n }, privateKey: { d, n } };
}

// Function for modular exponentiation (m^e) % n
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;  // In case base is larger than mod

    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Function to calculate modular inverse using Extended Euclidean Algorithm
function modInverse(a, m) {
    let m0 = m;
    let y = 0, x = 1;

    if (m === 1) return 0;

    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
        
        // m is remainder now, process same as Euclid's algo
        m = a % m;
        a = t;
        t = y;

        // Update x and y
        y = x - q * y;
        x = t;
    }

    if (x < 0) x += m0;

    return x;
}

// Function to encrypt a message (string to number, encrypt each number)
function encryptMessage(msg, publicKey) {
    let encryptedMsg = [];
    for (let i = 0; i < msg.length; i++) {
        let m = msg.charCodeAt(i); // Get the ASCII value of the character
        let c = modExp(m, publicKey.e, publicKey.n); // RSA encryption formula with modExp
        encryptedMsg.push(c);
    }
    return encryptedMsg;
}

// Function to decrypt a message (decrypt each number back to character)
function decryptMessage(encryptedMsg, privateKey) {
    let decryptedMsg = '';
    for (let i = 0; i < encryptedMsg.length; i++) {
        let c = encryptedMsg[i];
        let m = modExp(c, privateKey.d, privateKey.n); // RSA decryption formula with modExp
        decryptedMsg += String.fromCharCode(m);  // Convert back to character using ASCII
    }
    return decryptedMsg;
}

// Example Usage
let p = 61;  // Large prime numbers
let q = 53;
let { publicKey, privateKey } = generateKeys(p, q);

// Message to be encrypted
let msg = "Hello";  // Lowercase message

// Encrypt the message
let encryptedMsg = encryptMessage(msg, publicKey);
console.log("Encrypted message:", encryptedMsg);

// Decrypt the message
let decryptedMsg = decryptMessage(encryptedMsg, privateKey);
console.log("Decrypted message:", decryptedMsg);
