import { isEmpty } from "lodash";
import { z } from "zod";
import { doesYearHave53Weeks } from "../../../../utils/doesCurrentYearHave53Weeks";

// Define the schema for SKU enrollment form validation
export const skuEnrollmentFormSchema = z
  .object({
    id: z.string().optional(),
    skuNumber: z.string().min(1, "SKU number is required"),
    itemDescription: z.string().min(1, "Item description is required"),
    vendorCode: z.string().min(1, "Vendor code is required"),
    vendorName: z.string().min(1, "Vendor name is required"),
    foreignVendorName: z.string().min(1, "Foreign Vendor Name is required"),
    foreignVendorCode: z.string().min(1, "Foreign Vendor Code is required"),
    countryOrigin: z.string().min(1, "Country of origin is required"),
    itemStatus: z.string().min(1, "Item status is required"),
    shelfLifeWeeks: z.number().min(1, "Shelf life is required"),
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
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, "")))
      .refine((num) => num >= 1, { message: "Value must be at least 1" }), // Ensure at least 1 // Convert to number
    //this is now a number datatype
    buildTo: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, "")))
      .refine((num) => num >= 1, { message: "Value must be at least 1" }), // Ensure at least 1 // Convert to number
    //this is now a number datatype
    totalOrderLeadTime: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, "")))
      .refine((num) => num >= 1, { message: "Value must be at least 1" }), // Ensure at least 1 // Convert to number
    //this is now a number datatype
    cbmPerCase: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    //this is now a number datatype
    totalCbmPerContainer: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    //this is now a number datatype
    tonPerCase: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    poDay: z.string().min(1, "PO day is required"),
    buyer: z.string().min(1, "Buyer is required"),
    // orderSpecialist: z.string().min(1, "Order specialist is required"),
    //this is now a number datatype
    unitPerCase: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    //this is now a number datatype
    casePerPallet: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    //this is now a number datatype
    unitPerPallet: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    //this is now a number datatype
    totalTonPerContainer: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    //this is now a number datatype
    noOfPalletsPerContainer: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    containerStacking: z.string().min(1, "Container stacking is required"),
    //this is now a number datatype
    unitsPerContainer: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, ""))),
    containerLoad: z.string().min(1, "Container load is required"),
    containerSize: z.string().min(1, "Container size is required"),
    //this is now a number datatype
    moq: z
      .string()
      .regex(/^\d{1,3}(,\d{3})*$/, "Invalid number format") // Ensure comma format
      .transform((val) => Number(val.replace(/,/g, "")))
      .refine((num) => num >= 1, { message: "Value must be at least 1" }), // Ensure at least 1 // Convert to number
    mixLoadSkus: z.array(z.string()),

    // .min(1, "Mix Load SKUs is required"),
  })
  .refine((data) => data.buildTo > data.trigger, {
    message: "Build-to must be greater than to Trigger",
    path: ["buildTo"], // The field that the error should appear under
  })
  .refine((data) => data.trigger < data.buildTo, {
    message: "Trigger must be less than Build-to",
    path: ["trigger"],
  });

// Export the inferred TypeScript type for the form values
export type SkuEnrollmentFormValues = z.infer<typeof skuEnrollmentFormSchema>;
