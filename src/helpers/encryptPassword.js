import bcrypt from 'bcrypt'

const saltRounds = 10; // Número de veces que se ejecutará el algoritmo de hash, mayor número más seguro pero también más lento

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return hashedPassword;
    } catch (error) {
        console.log(error)
        throw new Error('Error al encriptar la contraseña');
    }
};