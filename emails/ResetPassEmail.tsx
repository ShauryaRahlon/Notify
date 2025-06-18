import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

interface ResetPassProps {
  username: string;
  resetCode: string;
}

export default function ResetPassEmail({
  username,
  resetCode,
}: ResetPassProps) {
  return (
    <Html>
      <Head />
      <Preview>Your reset code is {resetCode}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white rounded-2xl shadow-md p-8 max-w-xl mx-auto">
            <Section className="text-center">
              <Img
                src="https://yourdomain.com/logo.png"
                width="80"
                height="80"
                alt="Logo"
                className="mx-auto mb-4"
              />
              <Text className="text-xl font-bold text-gray-800 mb-2">
                Welcome to Our App, {username}!
              </Text>
              <Text className="text-gray-600 mb-6">
                Use the following code to reset your password:
              </Text>
              <Text className="text-3xl font-mono font-semibold text-blue-600 tracking-widest mb-6">
                {resetCode}
              </Text>
              <Text className="text-gray-500 text-sm">
                If you did not create an account, you can safely ignore this
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
