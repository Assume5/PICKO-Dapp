import { UserAuthInfo } from "../../types/interface";
import { Request, Response } from "express";

export const getGuestCart = (req: Request, res: Response) => {};

export const getCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const createCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const createGuestCart = (req: Request, res: Response) => {};

export const updateCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const updateGuestCart = (req: Request, res: Response) => {};

export const removeCustomerCart = (req: UserAuthInfo, res: Response) => {};

export const removeGuestCart = (req: Request, res: Response) => {};
