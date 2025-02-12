import { isEmpty } from "lodash";
import { z } from "zod";
import { doesYearHave53Weeks } from "../../../../utils/doesCurrentYearHave53Weeks";

// Define the schema for SKU enrollment form validation
export const skuEnrollmentFormSchema = z.object({
  id: z.string().optional(),
  skuNumber: z.string().min(1, "SKU number is required"),
  itemDescription: z.string().min(1, "Item description is required"),
  vendorCode: z.string().min(1, "Vendor code is required"),
  vendorName: z.string().min(1, "Vendor name is required"),
  foreignVendorName: z.string().min(1, "Foreign Vendor Name is required"),
  foreignVendorCode: z.string().min(1, "Foreign Vendor Code is required"),
  countryOrigin: z.string().min(1, "Country of origin is required"),
  itemStatus: z.string().min(1, "Item status is required"),
  shelfLifeWeeks: z
    .number()
    .min(1, "Shelf life must be at least 1 week")
    .refine((value) => value <= 53, { message: "Cannot exceed 53 weeks" })
    .refine(
      (value) => {
        if (value === 53) {
          const year = new Date().getFullYear(); // Replace with dynamic year if needed
          return doesYearHave53Weeks(year);
        }
        return true; // Allow if not 53 weeks
      },
      { message: "Year does not support 53 weeks" }
    ),
  trigger: z.number().min(0, "Trigger cannot be negative"),
  buildTo: z.number().min(0, "Build-to cannot be negative"),
  totalOrderLeadTime: z.number().min(0, "Lead time cannot be negative"),
  cbmPerCase: z.number().min(0, "CBM per case cannot be negative"),
  totalCbmPerContainer: z
    .number()
    .min(0, "Total CBM per container cannot be negative"),
  tonPerCase: z.number().min(0, "Ton per case cannot be negative"),
  poDay: z.string().min(1, "PO day is required"),
  buyer: z.string().min(1, "Buyer is required"),
  // orderSpecialist: z.string().min(1, "Order specialist is required"),
  unitPerCase: z.number().min(0, "Units per case cannot be negative"),
  casePerPallet: z.number().min(0, "Cases per pallet cannot be negative"),
  unitPerPallet: z.number().min(0, "Units per pallet cannot be negative"),
  totalTonPerContainer: z
    .number()

    .min(0, "Total ton per container cannot be negative"),
  noOfPalletsPerContainer: z
    .number()
    .min(0, "Number of pallets per container cannot be negative"),
  containerStacking: z.string().min(1, "Container stacking is required"),
  unitsPerContainer: z
    .number()
    .min(0, "Units per container cannot be negative"),
  containerLoad: z.string().min(1, "Container load is required"),
  containerSize: z.string().min(1, "Container size is required"),
  moq: z.number().min(0, "MOQ cannot be negative"),
  mixLoadSkus: z.string().min(1, "Mix Load SKUs is required"),
});

// Export the inferred TypeScript type for the form values
export type SkuEnrollmentFormValues = z.infer<typeof skuEnrollmentFormSchema>;
