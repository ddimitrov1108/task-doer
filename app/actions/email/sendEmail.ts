"use server";

import { Resend } from "resend";

type EmailPayload = {
  to: string[];
  subject: string;
  react: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: EmailPayload) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Admin <onboarding@resend.dev>",
      ...payload,
    });

    if (error) throw error;

    return { data };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
