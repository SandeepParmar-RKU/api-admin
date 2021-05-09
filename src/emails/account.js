const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
	"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"
);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "sparmar586@rku.ac.in",
		subject: "Welcome to the app",
		text: `Hey, ${name} Let me know how you get along with the app`,
	});
};

const sendCancellationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "sparmar586@rku.ac.in",
		subject: "Sorry to see you go!",
		text: `Goodbye ${name}. See you soon `,
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancellationEmail,
};
