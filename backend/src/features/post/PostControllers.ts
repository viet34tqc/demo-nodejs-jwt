import { Request, Response } from 'express';

export class PostController {
  getPosts(req: Request, res: Response) {
    res.status(200).json({ message: 'Load posts successful' });
  }
  addPost(req: Request, res: Response) {
    res.status(200).json({ message: 'Create posts successful' });
  }
}
