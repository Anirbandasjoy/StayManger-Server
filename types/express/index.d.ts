import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}

declare global {
  namespace Express {
    interface User {
      _id: string;
      name: string;
      email: string;
      profileImage: string;
      backgroundImage: string;
      phone: number;
      address: string;
      department: string;
      role: string;
      id: string;
    }
  }
}
