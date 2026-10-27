import { useState } from "react";
import type { FormEvent } from "react";

export type FormStatus = "idle" | "submitting" | "success" | "error";

interface UseFormSubmitResult {
  status: FormStatus;
  message: string;
  submit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

/**
 * Shared form submission logic for the built-in Form service.
 * Uses application/x-www-form-urlencoded and inspects the server response code.
 */
export function useFormSubmit(submitAddr: string): UseFormSubmitResult {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const reset = () => {
    setStatus("idle");
    setMessage("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Anti-spam honeypot — silently succeed without sending anything.
    const honeypot = String(data.get("website_alt") ?? "").trim();
    if (honeypot) {
      setStatus("success");
      setMessage("Thank you. Your message has been sent.");
      form.reset();
      return;
    }
    data.delete("website_alt");

    setStatus("submitting");
    setMessage("");

    try {
      const body = new URLSearchParams();
      data.forEach((value, key) => {
        if (typeof value === "string") {
          body.append(key, value);
        }
      });

      const response = await fetch(submitAddr, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const responseText = await response.text();
      let parsed:
        | { code?: string; message?: string; meta?: { message?: string; detail?: string } }
        | null = null;
      try {
        parsed = responseText ? JSON.parse(responseText) : null;
      } catch {
        parsed = null;
      }

      const serverMessage =
        parsed?.meta?.message ||
        parsed?.message ||
        parsed?.meta?.detail ||
        responseText ||
        "";
      const isSpam = serverMessage.toLowerCase().includes("spam");
      const isSuccess = response.ok && parsed?.code === "OK" && !isSpam;

      if (isSuccess) {
        setStatus("success");
        setMessage("Thank you. Your message has been sent.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(
          serverMessage && !isSpam
            ? serverMessage
            : "We could not send your message. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return { status, message, submit, reset };
}