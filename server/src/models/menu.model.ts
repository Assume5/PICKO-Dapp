import { prisma } from "../services/db";

export const getMenuItemFromDB = async (
    menuId: number,
) => {
    return await prisma.menus.findUnique({
        where: {
            id: menuId
        },
    });
};
