import { prisma } from "../services/db";
import { order } from "../types";
import { deleteAllCartDB } from "./cart.modal";
import { getRestaurant } from "./restaurant.model";

export const createOrderDB = async (order: order) => {
    const latLong = await getRestaurant(order.restaurantID);
    await prisma.order.create({
        data: {
            id: order.order_number,
            customer_id: order.customer_id,
            restaurant_id: order.restaurantID,
            deliver_fee: +order.deliver_fee,
            driver_tip: +order.driver_tip,
            total_items: +order.total_items,
            status: "0",
            sub_total: +order.sub_total,
            sub_total_eth: +order.sub_total_eth,
            destination_lat: order.destination_lat,
            destination_long: order.destination_long,
            payment_method: order.payment_method,
            delivery_address: order.delivery_address,
            restaurant_lat: +latLong.lat,
            restaurant_long: +latLong.long,
            details: {
                createMany: {
                    data: order.cartItems,
                },
            },
        },
    });

    await deleteAllCartDB("cart", order.customer_id);
};

export const getOrderCustomerDB = async (id: string) => {
    return await prisma.customer.findUnique({
        where: {
            id,
        },
        select: {
            orders: {
                select: {
                    id: true,
                    order_date: true,
                    deliver_fee: true,
                    driver_tip: true,
                    total_items: true,
                    status: true,
                    sub_total: true,
                    destination_lat: true,
                    destination_long: true,
                    driver_lat: true,
                    driver_long: true,
                    restaurant_long: true,
                    restaurant_lat: true,
                    payment_method: true,
                    sub_total_eth: true,
                    delivery_address: true,
                    details: true,
                    restaurant: {
                        select: {
                            restaurant_name: true,
                            restaurant_card_image: true,
                            id: true,
                        },
                    },
                },
                orderBy: {
                    order_date: "desc",
                },
            },
        },
    });
};

export const getOrderOwnerDB = async (id: string) => {
    return await prisma.owner.findUnique({
        where: {
            id,
        },
        select: {
            restaurants: {
                select: {
                    orders: {
                        select: {
                            id: true,
                            order_date: true,
                            total_items: true,
                            status: true,
                            sub_total: true,
                            payment_method: true,
                            sub_total_eth: true,
                            delivery_address: true,
                            details: true,
                            customer: {
                                select: {
                                    first_name: true,
                                    last_name: true,
                                    phone: true,
                                },
                            },
                            driver: {
                                select: {
                                    first_name: true,
                                    last_name: true,
                                    phone: true,
                                },
                            },
                        },
                        orderBy: {
                            order_date: "desc",
                        },
                    },
                },
            },
        },
    });
};

export const getOrderDetailsDB = async (orderId: string) => {
    return await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        select: {
            id: true,
            order_date: true,
            deliver_fee: true,
            driver_tip: true,
            total_items: true,
            status: true,
            sub_total: true,
            destination_lat: true,
            destination_long: true,
            driver_lat: true,
            driver_long: true,
            restaurant_long: true,
            restaurant_lat: true,
            payment_method: true,
            sub_total_eth: true,
            delivery_address: true,
            details: true,
            restaurant: {
                select: {
                    restaurant_name: true,
                },
            },
        },
    });
};
