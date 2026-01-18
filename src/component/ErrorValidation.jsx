import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object().shape({
	fullName: Yup.string()
		.required("Full name is required")
		.min(2, "Full name must be at least 2 characters")
		.max(50, "Full name must not exceed 50 characters"),
	email: Yup.string()
		.required("Email is required")
		.email("Invalid email address"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		),
	isChecked: Yup.boolean().oneOf(
		[true],
		"You must agree to the terms and conditions"
	),
});

export const LoginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.required("Email is required")
		.email("Invalid email address"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
});

export const ForgetPasswordValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});

export const Email2VerificationCode = Yup.object().shape({
	otp: Yup.string()
		.required("otp is required")
		.min(6, "otp must be at least 6 numbers")
		.matches(/^\d+$/, "otp must be a number"),
});
export const EmailResendSchema = Yup.object().shape({
	email: Yup.string()
		.required("Email is required")
		.email("Invalid email address"),
});

export const KycValidationSchema = Yup.object().shape({
	documentType: Yup.string().required("Document Type is required"),
	documentImage: Yup.mixed().required("Document Image is required"),
	occupation: Yup.string()
		.required("Occupation is required")
		.min(2, "Occupation must be at least 2 characters long"),
	address: Yup.string()
		.required("Address is required")
		.min(5, "Address must be at least 5 characters long"),
	dateOfBirth: Yup.date()
		.required("Date of Birth is required")
		.nullable()
		.test("age", "You must be at least 18 years old", function (value) {
			const cutoff = new Date();
			cutoff.setFullYear(cutoff.getFullYear() - 18);
			return value <= cutoff;
		}),
	placeOfWork: Yup.string()
		.required("Place of Work is required")
		.min(3, "Place of Work must be at least 3 characters long"),
	bvn: Yup.string()
		.required("BVN is required")
		.length(11, "BVN must be exactly 11 digits")
		.matches(/^\d+$/, "BVN must be numeric"),
	phoneNumber: Yup.string()
		.required("Phone Number is required")
		.matches(/^\d{10,15}$/, "Phone Number must be between 10 to 15 digits"),
});
