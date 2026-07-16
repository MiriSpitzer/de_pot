import { Resend } from "resend";
import { Body, Button, Container, Head, Heading, Html, render, Text } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "no-reply@example.com";

function LowBalanceEmail({ name, saldo }: { name: string; saldo: number }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f5f7fb", margin: 0, padding: 0 }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "0 auto",
            padding: "24px",
            borderRadius: "12px",
            maxWidth: "600px",
            border: "1px solid #eaeaef",
          }}
        >
          <Heading style={{ fontSize: "24px", marginBottom: "16px" }}>Je saldo is laag...</Heading>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>Hallo {name},</Text>
          <Text style={{ fontSize: "16px", lineHeight: "1.6" }}>
            Je saldo bedraagt momenteel <strong>{saldo.toFixed(2)} kr</strong>. Gelieve je tot de beheerder van de je pot te wenden om je aandeel in de pot aan te vullen.
          </Text>
          <Text style={{ fontSize: "14px", color: "#666", marginTop: "24px" }}>
            Dit is een automatisch bericht van DE POT app. Gelieve hierop niet te reageren.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export async function sendLowBalaceEmail(email: string, name: string, saldo: number) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required to send email.");
  }

  const html = await render(<LowBalanceEmail name={name} saldo={saldo} />);

  try {
    const resp = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Je saldo is laag...",
      html,
    });
    // Log response so dev can inspect delivery id/status in terminal running Next
    console.log("Resend send response:", resp);
    return resp;
  } catch (err) {
    // Log full error for debugging (visible in dev server terminal)
    console.error("Resend send error:", err);
    throw err;
  }
}
