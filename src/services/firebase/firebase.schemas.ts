import { z } from 'zod';

export const QuizResponsePayloadSchema = z.object({
  id: z.string().optional(),
  studentUid: z.string().min(1, 'Student UID is required'),
  studentName: z.string().min(1, 'Student Name is required'),
  studentRegistration: z.string().min(1, 'Student Registration is required'),
  quizId: z.string().min(1, 'Quiz ID is required'),
  questionText: z.string().min(1, 'Question text is required'),
  selectedOptionIndex: z.number().int().nonnegative('Selected option index must be non-negative'),
  isCorrect: z.boolean(),
  timestamp: z.union([z.date(), z.number()]),
});

export type QuizResponsePayload = z.infer<typeof QuizResponsePayloadSchema>;

export const FeedbackPayloadSchema = z.object({
  id: z.string().optional(),
  studentUid: z.string().min(1, 'Student UID is required'),
  studentName: z.string().min(1, 'Student Name is required'),
  studentRegistration: z.string().min(1, 'Student Registration is required'),
  lectureId: z.string().min(1, 'Lecture ID is required'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comments: z.string(),
  timestamp: z.union([z.date(), z.number()]),
});

export type FeedbackPayload = z.infer<typeof FeedbackPayloadSchema>;

export const UserPayloadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  registration: z.string().optional().nullable(),
  session: z.string().optional().nullable(),
  role: z.enum(['student', 'admin']),
  isGuest: z.boolean().optional(),
});

export type UserPayload = z.infer<typeof UserPayloadSchema>;


