import { z } from "zod";

// Define the schema for SKU enrollment form validation
export const teamFormSchema = z.object({
  id: z.string().optional(),
  teamName: z.string().min(1, "Team name is required"),
  colorCode: z.string().min(1, "Color code is required"),
  area: z.string().min(1, "Area is required"),
  shift: z.string().min(1, "Shift is required"),
  restDay: z.string().min(1, "Rest day is required"),
  shiftPerRole: z
    .array(
      z.object({
        roleLabel: z.string().min(1, "Role label is required"),
        roleDesignation: z.string().min(1, "Role designation is required"),
      })
    )
    .optional(),
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
export type TeamFormValues = z.infer<typeof teamFormSchema>;
