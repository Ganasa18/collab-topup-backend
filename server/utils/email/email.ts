import { UserInput } from "../../../storage/models/user/user_model";
var handlebars = require("handlebars");
const nodemailer = require("nodemailer");
import * as path from "path";
var fs = require("fs");

export class Email {
  user: UserInput;
  to: string;
  url: string;
  title: string;
  description: string;
  note: string;

  constructor(
    user: any,
    to: string,
    url: string,
    title: string = "activate account",
    description: string = "We have sent you this email in response to your request to active your account.",
    note: string = "Please ignore this email if you did not request a password change."
  ) {
    this.user = user;
    this.to = to;
    this.url = url;
    this.title = title;
    this.description = description;
    this.note = note;
  }

  public newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST
        ? process.env.EMAIL_HOST
        : "smtp.mailspons.com",
      port: process.env.EMAIL_PORT ? process.env.EMAIL_PORT : 2525,
      //   secure: true,
      auth: {
        user: process.env.EMAIL_USER
          ? process.env.EMAIL_USER
          : "c885fd98006a41debaa7",
        pass: process.env.EMAIL_PASSWORD
          ? process.env.EMAIL_PASSWORD
          : "8f25a7581bce4b0080b4d9419fa55e7e",
      },
    });
  }

  async send(subject: string) {
    // html
    const __dirname = path.resolve();
    const filePath = `${__dirname}/views/auth/active_account.html`;
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      username: this.user?.name?.toLocaleUpperCase(),
      url: this.url,
      title: this.title,
      description: this.description,
      note: this.note,
    };
    const htmlToSend = template(replacements);

    // 1) Define email options
    const mailOptions = {
      from: "topup@gmail.com",
      to: this.to,
      subject,
      html: htmlToSend,
      text: HTMLPartToTextPart(htmlToSend),
    };

    //  2) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendTicket() {
    await this.send(`New Register`);
  }
}

// const readHTMLFile = function (path: string, callback: Function) {
//   fs.readFile(path, { encoding: "utf-8" }, function (err: Error, html: any) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, html);
//     }
//   });
// };

const HTMLPartToTextPart = (HTMLPart: any) =>
  HTMLPart.replace(/\n/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style[^>]*>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head[^>]*>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script[^>]*>/gi, "")
    .replace(/<\/\s*(?:p|div)>/gi, "\n")
    .replace(/<br[^>]*\/?>/gi, "\n")
    .replace(/<[^>]*>/gi, "")
    .replace("&nbsp;", " ")
    .replace(/[^\S\r\n][^\S\r\n]+/gi, " ");
