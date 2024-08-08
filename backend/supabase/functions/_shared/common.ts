/**
 * @summary To calculate the age from the date of birth.
 * @author Chat-GPT
 * @param dob 
 * @returns number
 */
export const calculateAge = (dob: string | Date): number => {
    // Parse the date of birth
    const birthDate = new Date(dob);
    const today = new Date();
    
    // Calculate the age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    
    // Adjust if the current date hasn't yet reached the birth date this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    
    return age;
};