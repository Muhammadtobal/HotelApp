import transporter from "./mailer.js";

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}
export async function sendOtp(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: " OTP Code ",
    text: `Your OTP Code is ${otp}`,
  });
}
export async function sentPayment(email,totalPrice) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: " Your Payments ",
    text: `the count you Payed is ${totalPrice}`,
  })
}