import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "eu-north-1" }); // change if needed

export const handler = async (event) => {
    console.log("Incoming DynamoDB Stream event:", JSON.stringify(event, null, 2));

    const emailPromises = event.Records
        .filter((record) => record.eventName === "INSERT")
        .map(async (record) => {
            const newImage = record.dynamodb.NewImage;

            // Extract fields from DynamoDB Stream
            const email = newImage.email?.S;
            const name = newImage.name?.S;

            if (!email) {
                console.warn("Skipping record without email.");
                return;
            }

            const subject = "Thank you for signing up!";
            const body = `
Hi ${name ?? "there"},
Thank you for subscribing! Your email has been saved successfully.
– Email List Team
`;

            const params = {
                Source: "vatkov.it@gmail.com",
                Destination: {
                    ToAddresses: [email],
                },
                Message: {
                    Subject: { Data: subject },
                    Body: {
                        Text: { Data: body },
                    },
                },
            };

            try {
                const response = await ses.send(new SendEmailCommand(params));
                console.log("Email sent to", email, response);
            } catch (err) {
                console.error("SES Error for", email, err);
            }
        });

    await Promise.all(emailPromises);

    return {
        statusCode: 200,
        body: "Stream processed",
    };
};

