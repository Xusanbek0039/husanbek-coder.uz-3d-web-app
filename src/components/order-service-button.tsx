"use client";
import React from "react";

export const ORDER_SELECT_EVENT = "order:select";

/**
 * Xizmat kartasidagi "Buyurtma berish" tugmasi: formadagi xizmatni tanlaydi,
 * buyurtma formasigacha silliq siljiydi va xabar maydoniga fokus beradi.
 * (Oldingi Link + scroll={false} bir xil sahifaga navigatsiya qilib, hech qayerga siljimas edi.)
 */
export default function OrderServiceButton({
  serviceId,
  className,
  children,
}: {
  serviceId: string;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = () => {
    window.dispatchEvent(new CustomEvent(ORDER_SELECT_EVENT, { detail: serviceId }));

    const url = new URL(window.location.href);
    url.searchParams.set("service", serviceId);
    url.hash = "buyurtma";
    window.history.replaceState(window.history.state, "", url);

    document.getElementById("buyurtma")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById("order-message")?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
