import { Router, type IRouter } from "express";
import { z } from "zod";
import {
  createRepresentation,
  getAllRepresentations,
  getRepresentationByReference,
} from "../lib/representationStore";
import { sendRepresentationEmail, SECRETARIAT_EMAIL } from "../lib/emailService";

const router: IRouter = Router();

const representationSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  constituency: z.string().trim().min(1, "Please select a constituency"),
  category: z.string().trim().min(1, "Please select a category / subject"),
  message: z.string().trim().min(10, "Representation must be at least 10 characters").max(2000),
});

// Submit a new representation
router.post("/representations", async (req, res) => {
  try {
    const parseResult = representationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { name, mobile, email, constituency, category, message } = parseResult.data;
    const representation = await createRepresentation({
      name,
      mobile,
      email: email || undefined,
      constituency,
      category,
      message,
    });

    // Dispatch automated email notification to srikanthk.vtelangana@gmail.com
    const emailDispatch = await sendRepresentationEmail(representation);

    return res.status(201).json({
      success: true,
      message: "Representation successfully submitted to the Secretariat Desk",
      referenceNumber: representation.referenceNumber,
      representation,
      targetEmail: SECRETARIAT_EMAIL,
      emailDispatch,
    });
  } catch (error) {
    req.log?.error?.({ error }, "Error creating representation");
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing your representation",
    });
  }
});

// List all representations
router.get("/representations", async (_req, res) => {
  try {
    const list = await getAllRepresentations();
    return res.json({
      success: true,
      count: list.length,
      representations: list,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve representations",
    });
  }
});

// Query a representation by tracking reference number
router.get("/representations/:ref", async (req, res) => {
  try {
    const ref = req.params["ref"] || "";
    const found = await getRepresentationByReference(ref);
    if (!found) {
      return res.status(404).json({
        success: false,
        message: `Representation with reference "${ref}" was not found`,
      });
    }
    return res.json({
      success: true,
      representation: found,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to query representation",
    });
  }
});

export default router;

