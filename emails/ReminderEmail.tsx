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
    Link,
} from "@react-email/components";
import * as React from "react";
import { Contest } from "@/model/Contest";

const platformStyles = {
    LeetCode: {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    },
    CodeForces: {
        color: "text-blue-600",
        bg: "bg-blue-100",
        logo: "https://sta.codeforces.com/s/95625/images/codeforces-logo-with-telegram.png",
    },
    CodeChef: {
        color: "text-purple-700",
        bg: "bg-purple-100",
        logo: "https://cdn.dribbble.com/userupload/20103349/file/original-a0411030f26482dcee9298419bf8d1c6.png",
    },
};
const formatDate = (date: Date) =>
    date.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
export default function ReminderEmail({
    code,
    name,
    platform,
    startTime,
    endTime,
    duration,
    url,
}: Contest) {
    const theme = platformStyles[platform as keyof typeof platformStyles];
    return (
        <Html>
            <Head />
            <Preview>⏰ Reminder: {platform} Contest "{name}" is starting soon!</Preview>
            <Tailwind>
                <Body className="bg-gray-50 font-sans">
                    <Container className={`rounded-xl shadow-md p-8 max-w-xl mx-auto ${theme.bg}`}>
                        <Section className="text-center">
                            <Img src={theme.logo} width="80" height="80" alt={`${platform} Logo`} className="mx-auto mb-4" />
                            <Text className={`text-xl font-bold mb-2 ${theme.color}`}>
                                Contest Reminder: {name}
                            </Text>
                            <Text className="text-gray-700 mb-4 font-semibold">
                                The {platform} contest <b>{name}</b> is about to begin!
                            </Text>
                            <Text className="text-gray-600 mb-2">
                                🆔 <b>Contest Code:</b> {code}
                            </Text>
                            <Text className="text-gray-600 mb-2">
                                🕒 <b>Starts at:</b> {formatDate(startTime)} {formatTime(startTime)}
                            </Text>
                            <Text className="text-gray-600 mb-2">
                                ⏰ <b>Ends at:</b> {formatDate(endTime)} {formatTime(endTime)}
                            </Text>
                            <Text className="text-gray-600 mb-6">
                                ⏳ <b>Duration:</b> {duration} minutes
                            </Text>
                            <Link
                                href={url}
                                className={`inline-block px-6 py-2 text-white rounded-md font-medium bg-black hover:opacity-90 ${platform === "LeetCode" ? "bg-yellow-500" : platform === "Codeforces" ? "bg-blue-600" : "bg-purple-700"}`}
                            >
                                Go to Contest
                            </Link>
                            <Text className="text-xs text-gray-500 mt-6">
                                This is a reminder email for your upcoming contest. Good luck!
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}