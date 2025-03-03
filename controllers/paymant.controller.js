import Stripe from "stripe";
import prisma from "../prisma/client.js";
import { createPaymentSchema } from "../middlewares/validate.js";
import { getPaginationInfo, paginate } from "../utils/pagination.js";
import { sentPayment } from "../helpers/senOtp.js";
const stripeInstance = new Stripe(process.env.STRIPE_SCRET_KEY);

export async function createPayment(req, res, next) {
  try {
    const { bookingId } = req.body;
    await createPaymentSchema.validateAsync({ bookingId });
    let booking = await prisma.booking.findUnique({
      where: { id: Number(bookingId) },
    });

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Hotel Booking" },
            unit_amount: booking.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    const paymentProceess = await prisma.payment.create({
      data: {
        bookingId: Number(bookingId),
        totalPrice: booking.totalPrice,
      },
    });

    await prisma.booking.update({
      where: { id: Number(bookingId) },
      data: {
        status: "CONFIRMED",
        paymentId: Number(paymentProceess.id),
      },
    });
    const emailEmail = await prisma.user.findUnique({
      where: {
        id: Number(booking.userId),
      },
    });
    await sentPayment(emailEmail.email, booking.totalPrice);
    res.status(201).json({
      message: "Payment created successfully.",
      stripeSessionId: session.id,
      paymentId: paymentProceess.id,
      paymentUrl: session.url,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPayments(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pagination = await getPaginationInfo(prisma.payment, page, limit);
    const payments = await paginate(prisma.payment, page, limit);
    res.status(200).json({
      message: "success",
      Data: payments,
      Pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
}
