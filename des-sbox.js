// S1-box definition
const S1 = [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ];
  
  // S-box lookup function
  function sBoxLookup(sBox, sixBitInput) {
    // Ensure that the input is 6 bits
    const sixBitBinary = sixBitInput.toString(2).padStart(6, '0');
  
    // Determine row and column
    const row = parseInt(sixBitBinary[0] + sixBitBinary[5], 2);  // Outer bits (first and last)
    const column = parseInt(sixBitBinary.slice(1, 5), 2);        // Inner 4 bits
  
    // Find the output from the S-box
    const output = sBox[row][column];
  
    // Return the output as a 4-bit binary string
    return output.toString(2).padStart(4, '0');
  }
  
  // Example usage
  const sixBitInput = 0b011011;
  const output = sBoxLookup(S1, sixBitInput);
  
  console.log(`S1(${sixBitInput.toString(2).padStart(6, '0')}) = ${output}`);
  