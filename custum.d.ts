// custom.d.ts
import { Request } from 'express';

interface PayloadData {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: PayloadData;
    }
  }
}
