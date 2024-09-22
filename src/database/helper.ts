import { createHash } from "crypto";

interface iCreateAccount {
    name: string;
    email: string;
    password: string;
    mediaUrl?: string;
}

export function hashPassword(rawPass: string) {
    return createHash('sha256').update(rawPass).digest('base64');
}

export function createAccountObject({ name, email, password, mediaUrl } : iCreateAccount) {
    const hashPass = hashPassword(password);
    return {
        name: name,
        email: email,
        password: hashPass,
        profilePicture: mediaUrl || ""
    }
}