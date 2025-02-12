
import { z } from "zod";

// Define the schema for SKU enrollment form validation
export const enrollmentFormSchema = z.object({
  id: z.string().optional(),
  employeeNumber: z.string().min(1, "Employee number is required"),
  fullName: z.string().min(1, "Fullname is required"),
  designation: z.string().min(1, "Designation is required"),
  agency: z.string().min(1, "Agency is required"),
  teamAssignment: z.string().min(1, "Team assignment is required"),
});
//   .refine((data) => data.buildTo > data.trigger, {
//     message: "Build-to must be greater than to Trigger",
//     path: ["buildTo"], // The field that the error should appear under
//   })
//   .refine((data) => data.trigger < data.buildTo, {
//     message: "Trigger must be less than Build-to",
//     path: ["trigger"],
//   });

// Export the inferred TypeScript type for the form values
export type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>;
