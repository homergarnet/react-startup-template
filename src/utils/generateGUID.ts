export function generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; // Random number from 0 to 15
        const v = c === 'x' ? r : (r & 0x3 | 0x8); // Set the 13th character (version) to 4
        return v.toString(16); // Convert number to hexadecimal
    });
}