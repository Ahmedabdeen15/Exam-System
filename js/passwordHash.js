async function hashPassword(password) {
    // Encode the password as UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Hash the password using SHA-256 (you might want to use a stronger algorithm)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}