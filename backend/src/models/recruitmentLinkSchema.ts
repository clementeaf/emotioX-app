import mongoose, { Schema, Document } from "mongoose";

export interface IRecruitmentLink extends Document {
  demographicQuestionsRequired?: boolean;
  demographicQuestions?: {
    age?: boolean;
    country?: boolean;
    gender?: boolean;
    educationLevel?: boolean;
    annualHouseholdIncome?: boolean;
    employmentStatus?: boolean;
    dailyHoursOnline?: boolean;
    technicalProficiency?: boolean;
  };
  linkConfiguration?: {
    allowMobileDevices?: boolean;
    trackLocation?: boolean;
    multipleSessionsAllowed?: boolean;
  };
  participantLimit?: number;
}

const RecruitmentLinkSchema: Schema = new Schema<IRecruitmentLink>({
  demographicQuestionsRequired: { type: Boolean },
  demographicQuestions: {
    age: { type: Boolean },
    country: { type: Boolean },
    gender: { type: Boolean },
    educationLevel: { type: Boolean },
    annualHouseholdIncome: { type: Boolean },
    employmentStatus: { type: Boolean },
    dailyHoursOnline: { type: Boolean },
    technicalProficiency: { type: Boolean },
  },
  linkConfiguration: {
    allowMobileDevices: { type: Boolean },
    trackLocation: { type: Boolean },
    multipleSessionsAllowed: { type: Boolean },
  },
  participantLimit: { type: Number },
});

const RecruitmentLink = mongoose.model("RecruitmentLink", RecruitmentLinkSchema);

export default RecruitmentLink
