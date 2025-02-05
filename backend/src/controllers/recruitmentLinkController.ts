import { Request, Response } from "express";
import RecruitmentLink from "../models/recruitmentLinkSchema";

/**
 * Create a new RecruitmentLink document
 */
export const createRecruitmentLink = async (req: Request, res: Response): Promise<void> => {
    try {
        const newRecruitmentLink = new RecruitmentLink(req.body);
        const savedRecruitmentLink = await newRecruitmentLink.save();
        res.status(201).json(savedRecruitmentLink); // 201 Created
    } catch (error) {
        res.status(500).json({ error: "Failed to create RecruitmentLink", details: error });
    }
};

/**
 * Get all RecruitmentLink documents
 */
export const getAllRecruitmentLinks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const recruitmentLinks = await RecruitmentLink.find();
        res.status(200).json(recruitmentLinks); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch RecruitmentLinks", details: error });
    }
};

/**
 * Get a single RecruitmentLink document by ID
 */
export const getRecruitmentLinkById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const recruitmentLink = await RecruitmentLink.findById(id);

        if (!recruitmentLink) {
            res.status(404).json({ error: "RecruitmentLink not found" }); // 404 Not Found
            return;
        }

        res.status(200).json(recruitmentLink); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch RecruitmentLink", details: error });
    }
};

/**
 * Update a RecruitmentLink document by ID
 */
export const updateRecruitmentLink = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedRecruitmentLink = await RecruitmentLink.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!updatedRecruitmentLink) {
            res.status(404).json({ error: "RecruitmentLink not found" }); // 404 Not Found
            return;
        }

        res.status(200).json(updatedRecruitmentLink); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Failed to update RecruitmentLink", details: error });
    }
};
