import { prisma } from "../services/db";
import { NearByDriver, order } from "../types";
import { getTimeNow } from "../utils/function";
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
                            confirm_at: true,
                            ready_at: true,
                            pickup_at: true,
                            compelete_at: true,
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
            confirm_at: true,
            pickup_at: true,
            ready_at: true,
            compelete_at: true,
            restaurant: {
                select: {
                    restaurant_name: true,
                },
            },
            driver: {
                select: {
                    lat: true,
                    long: true,
                },
            },
        },
    });
};

export const updateOrderStatusDB = async (
    orderId: string,
    status: string,
    driverId: string | null
) => {
    const select = {
        id: true,
        customer: {
            select: {
                socket_cookie: true,
                first_name: true,
                last_name: true,
            },
        },
        restaurant: {
            select: {
                restaurant_name: true,
                address: true,
                owner: {
                    select: {
                        socket_cookie: true,
                    },
                },
            },
        },
        restaurant_lat: true,
        restaurant_long: true,
        destination_lat: true,
        destination_long: true,
        delivery_address: true,
        driver_tip: true,
        details: true,
        total_items: true,
        confirm_at: true,
        pickup_at: true,
        ready_at: true,
        compelete_at: true,
    };

    let updateData: {
        status: string;
        driver_id?: string;
        confirm_at?: string;
        ready_at?: string;
        pickup_at?: string;
        compelete_at?: string;
    };
    if (driverId) {
        updateData = { status, driver_id: driverId };
    } else {
        updateData = { status };
    }

    if (status === "1") {
        updateData["confirm_at"] = getTimeNow();
    } else if (status === "2") {
        updateData["ready_at"] = getTimeNow();
    } else if (status === "3") {
        updateData["pickup_at"] = getTimeNow();
    } else if (status === "4" || status === "-1") {
        updateData["compelete_at"] = getTimeNow();
    }
    return await prisma.order.update({
        where: {
            id: orderId,
        },
        data: updateData,
        select,
    });
};

export const driverAcceptOrder = async (
    orderId: string,
    status: string,
    driverId: string
) => {
    return await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
            driver_id: driverId,
        },
        select: {
            customer: {
                select: {
                    socket_cookie: true,
                },
            },
            restaurant_lat: true,
            restaurant_long: true,
            destination_lat: true,
            destination_long: true,
        },
    });
};

export const getNearByDriverDB = async (
    storeLat: number,
    storeLong: number
) => {
    const res: NearByDriver[] = await prisma.$queryRaw`SELECT socket_cookie,  
        status,
        lat, 
        long, SQRT(
        POW(69.1 * (cast(lat as double precision) - ${storeLat}), 2) +
        POW(69.1 * (${storeLong} - cast(long as double precision)) * COS(cast(lat as double precision) / 57.3), 2)) AS distance
        FROM driver WHERE SQRT(
        POW(69.1 * (cast(lat as double precision) - ${storeLat}), 2) +
        POW(69.1 * (${storeLong} - cast(long as double precision)) * COS(cast(lat as double precision) / 57.3), 2)) < 10 AND status='1' ORDER BY distance;`;
    return res;
};

export const getNearByOrderDB = async (
    driverLat: number,
    driverLong: number
) => {
    const res: { id: string }[] = await prisma.$queryRaw`SELECT id,  
    status,
    restaurant_lat, 
    restaurant_long, SQRT(
    POW(69.1 * (cast(restaurant_lat as double precision) - ${driverLat}), 2) +
    POW(69.1 * (${driverLong} - cast(restaurant_long as double precision)) * COS(cast(restaurant_lat as double precision) / 57.3), 2)) AS distance
    FROM public.order WHERE SQRT(
    POW(69.1 * (cast(restaurant_lat as double precision) - ${driverLat}), 2) +
    POW(69.1 * (${driverLong} - cast(restaurant_long as double precision)) * COS(cast(restaurant_lat as double precision) / 57.3), 2)) < 10 AND status='1' ORDER BY distance;`;
    const data: string[] = [];
    res.forEach((item) => {
        data.push(item.id);
    });

    return await prisma.order.findMany({
        where: {
            id: {
                in: data,
            },
        },
        select: {
            id: true,
            customer: {
                select: {
                    socket_cookie: true,
                    first_name: true,
                    last_name: true,
                },
            },
            restaurant: {
                select: {
                    restaurant_name: true,
                    address: true,
                },
            },
            restaurant_lat: true,
            restaurant_long: true,
            destination_lat: true,
            destination_long: true,
            delivery_address: true,
            driver_tip: true,
            details: true,
            total_items: true,
            confirm_at: true,
            pickup_at: true,
            ready_at: true,
            compelete_at: true,
        },
    });
};

export const assignDriverOrder = async (id: string, orderId: string) => {
    return await prisma.driver.update({
        where: {
            id,
        },
        data: {
            current_order: orderId,
        },
    });
};

export const getDriverCurrentOrderDetailsDB = async (orderId: string) => {
    return await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        select: {
            id: true,
            customer: {
                select: {
                    socket_cookie: true,
                    first_name: true,
                    last_name: true,
                },
            },
            restaurant: {
                select: {
                    restaurant_name: true,
                    address: true,
                },
            },
            restaurant_lat: true,
            restaurant_long: true,
            destination_lat: true,
            destination_long: true,
            delivery_address: true,
            driver_tip: true,
            details: true,
            total_items: true,
            confirm_at: true,
            pickup_at: true,
            ready_at: true,
            compelete_at: true,
        },
    });
};

export const clearDriverCurrentOrderDB = async (id: string) => {
    return await prisma.driver.update({
        where: {
            id,
        },
        data: {
            current_order: null,
        },
    });
};

export const getDriverOrderDB = async (id: string) => {
    return await prisma.driver.findUnique({
        where: {
            id,
        },
        select: {
            orders: {
                select: {
                    restaurant: {
                        select: {
                            restaurant_name: true,
                            address: true,
                            city: true,
                            state: true,
                            zipcode: true,
                        },
                    },
                    customer: {
                        select: {
                            first_name: true,
                            last_name: true,
                        },
                    },
                    driver_tip: true,
                    restaurant_lat: true,
                    restaurant_long: true,
                    pickup_at: true,
                    ready_at: true,
                    compelete_at: true,
                    status: true,
                    details: true,
                    id: true,
                    total_items: true,
                },
            },
        },
    });
};
