// E-box permutation table
const E_box = [
    31, 0, 1, 2, 3, 4,
    3, 4, 5, 6, 7, 8,
    7, 8, 9, 10, 11, 12,
    11, 12, 13, 14, 15, 16,
    15, 16, 17, 18, 19, 20,
    19, 20, 21, 22, 23, 24,
    23, 24, 25, 26, 27, 28,
    27, 28, 29, 30, 31, 0
  ];
  
  // E-box expansion function
  function eBoxExpansion(inputBits) {
    // Ensure that the input is a 32-bit string
    if (inputBits.length !== 32) {
      throw new Error("Input must be 32-bit");
    }
  
    // Perform the expansion using the E-box table
    let expandedBits = '';
    for (let i = 0; i < E_box.length; i++) {
      expandedBits += inputBits[E_box[i]];
    }
  
    return expandedBits;
  }
  
  // Example usage
  const inputBits = "11010011001101000101011101111010"; // 32-bit binary input
  const expandedBits = eBoxExpansion(inputBits);
  
  console.log(`Input (32-bit):  ${inputBits}`);
  console.log(`Expanded (48-bit): ${expandedBits}`);
  