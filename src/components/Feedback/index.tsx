import { message } from 'antd';

interface FeedbackOptions {
  duration?: number;
}

export const Feedback = {
  success: (content: string, options?: FeedbackOptions) => {
    message.success(content, options?.duration);
  },
  error: (content: string, options?: FeedbackOptions) => {
    message.error(content, options?.duration);
  },
  warning: (content: string, options?: FeedbackOptions) => {
    message.warning(content, options?.duration);
  },
  info: (content: string, options?: FeedbackOptions) => {
    message.info(content, options?.duration);
  },
  loading: (content: string, options?: FeedbackOptions) => {
    return message.loading(content, options?.duration);
  },
}; 