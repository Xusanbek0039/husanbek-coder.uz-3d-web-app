import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div>
    <h1>{fullName} dan!</h1>
    <div className="text-red-500">{email} sizga xabar yubordi!</div>
    <blockquote>{message}</blockquote>
  </div>
);
