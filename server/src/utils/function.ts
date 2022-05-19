export const generateRandomString = async () => {
    return [...Array(26)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join("");
};
