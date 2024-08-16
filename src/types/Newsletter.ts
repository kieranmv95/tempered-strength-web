import type { NewsletterShort } from '@/types/NewsLetterShort';

export type Newsletter = NewsletterShort & {
  newsLetterBody: {
    json: any;
  };
};
