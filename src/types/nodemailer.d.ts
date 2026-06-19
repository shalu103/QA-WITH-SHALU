declare module "nodemailer" {
  import type { Transporter, SendMailOptions } from "nodemailer";
  // Fallback typing for build-only usage.
  // Runtime uses the real nodemailer package.
  const nodemailer: {
    createTransport: (options: any) => Promise<Transporter> | Transporter;
    // Some codebases use nodemailer directly; keep it permissive.
  };
  export default nodemailer;
}

