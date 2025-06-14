import jwt from 'jsonwebtoken'

interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}

const generateToken = (user: User): string => {
    try {
        // Simulate configuration values
        const config = {
            subject: "JWTServiceAccessClient",
            key: "tJlskfjNNVfh232Us!22@fJfljlgJm4775dKJSHDkjH",
            issuer: "JWTAuthenticationServer",
            audience: "JWTServicePostmanClient",
        };

        const claims = {
            aud: config.subject,
            jti: crypto.randomUUID(), // Unique identifier for the token
            iat: Math.floor(Date.now() / 1000), // Issued at time in seconds
            Id: user.id.toString(),
            DisplayName: `${user.firstName} ${user.lastName}`,
            EmployeeName: user.firstName,
            Username: user.username,
        };

        const token = jwt.sign(claims, config.key, {
            algorithm: "HS256",
            expiresIn: "25m", // Token expiry time
            issuer: config.issuer,
            audience: config.audience,
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

export default generateToken;