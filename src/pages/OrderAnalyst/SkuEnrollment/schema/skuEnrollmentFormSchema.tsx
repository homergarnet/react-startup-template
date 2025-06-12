import { isEmpty } from "lodash";
import { z } from "zod";
import { doesYearHave53Weeks } from "../../../../utils/doesCurrentYearHave53Weeks";

// Define the schema for SKU enrollment form validation
export const skuEnrollmentFormSchema = z
  .object({
    id: z.string().optional(),
    skuNumber: z.string().min(1, "SKU number is required"),
    itemDescription: z.string(),
    vendorCode: z.string(),
    vendorName: z.string(),
    foreignVendorName: z.string(),
    foreignVendorCode: z.string(),
    countryOrigin: z.string(),
    itemStatus: z.string(),
    shelfLifeWeeks: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    // .refine((value) => value <= 53, { message: "Cannot exceed 53 weeks" })
    // .refine(
    //   (value) => {
    //     if (value === 53) {
    //       const year = new Date().getFullYear(); // Replace with dynamic year if needed
    //       return doesYearHave53Weeks(year);
    //     }
    //     return true; // Allow if not 53 weeks
    //   },
    //   { message: "Year does not support 53 weeks" }
    // ),
    //this is now a number datatype
    trigger: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string" && val.trim() === "") return NaN;
        return typeof val === "string" ? Number(val.replace(/,/g, "")) : val;
      })
      .refine((num) => !isNaN(num) && num >= 1, {
        message: "Value must be at least 1",
      }), // Ensure at least 1

    buildTo: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string" && val.trim() === "") return NaN;
        return typeof val === "string" ? Number(val.replace(/,/g, "")) : val;
      })
      .refine((num) => !isNaN(num) && num >= 1, {
        message: "Value must be at least 1",
      }), // Ensure at least 1
    //this is now a number datatype
    totalOrderLeadTime: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" })
      .refine((num) => num >= 1, { message: "Value must be at least 1" }),
    //this is now a number or string datatype
    cbmPerCase: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    //this is now a number datatype
    totalCbmPerContainer: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    //this is now a number datatype
    tonPerCase: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    poDay: z.string().min(1, "PO day is required"),
    buyer: z.string(),
    // orderSpecialist: z.string().min(1, "Order specialist is required"),
    //this is now a number datatype
    unitPerCase: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string" && val.trim() === "") return NaN;
        return typeof val === "string" ? Number(val.replace(/,/g, "")) : val;
      })
      .refine((num) => !isNaN(num) && num >= 1, {
        message: "Value must be at least 1",
      }), // Ensure at least 1
    //this is now a number datatype
    casePerPallet: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    //this is now a number datatype
    unitPerPallet: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    //this is now a number datatype
    totalTonPerContainer: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    //this is now a number datatype
    noOfPalletsPerContainer: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    containerStacking: z.string().min(1, "Container stacking is required"),
    //this is now a number datatype
    unitsPerContainer: z
      .union([z.string(), z.number()])
      .superRefine((val, ctx) => {
        if (typeof val === "string") {
          // Check if the format is valid (1,234 format)
          const regex = /^\d{1,3}(,\d{3})*$/;
          if (!regex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Invalid number format. Use comma-separated format (e.g., 1,234).",
            });
          }
        }
      })
      .transform((val) =>
        typeof val === "string" ? Number(val.replace(/,/g, "")) : val
      )
      .refine((num) => !isNaN(num), { message: "Must be a valid number" }),
    containerLoad: z.string().min(1, "Container load is required"),
    containerSize: z.string().min(1, "Container size is required"),
    //this is now a number datatype
    moq: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (typeof val === "string" && val.trim() === "") return NaN;
        return typeof val === "string" ? Number(val.replace(/,/g, "")) : val;
      })
      .refine((num) => !isNaN(num) && num >= 1, {
        message: "Value must be at least 1",
      }), // Ensure at least 1
    mixLoadSkus: z.array(z.string()),

    // .min(1, "Mix Load SKUs is required"),
  })
  .superRefine((data, ctx) => {
    console.log(
      "Validation Running - Trigger:",
      data.trigger,
      "BuildTo:",
      data.buildTo
    );

    if (isNaN(data.trigger) || isNaN(data.buildTo)) {
      console.error("Invalid values detected");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Both Trigger and Build-to must be valid numbers",
        path: ["trigger"],
      });
    } else if (data.trigger >= data.buildTo) {
      console.warn("Trigger must be less than Build-to");
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Trigger must be less than Build-to",
        path: ["trigger"],
      });
    }
  });

// Export the inferred TypeScript type for the form values
export type SkuEnrollmentFormValues = z.infer<typeof skuEnrollmentFormSchema>;

// if we want greater than zero:
// cbmPerCase: z
// .union([z.string(), z.number()])
// .transform((val) =>
//   typeof val === "string" ? Number(val.replace(/,/g, "")) : val
// )
// .refine((val) => val > 0, {
//   message: "CBM per case must be greater than 0",
// }),
