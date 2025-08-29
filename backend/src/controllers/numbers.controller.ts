import { Request, Response } from 'express';
import { Operators } from '../types';
import numbersModel from '../models/numbers.model';

export const getNumbers = async (req: Request, res: Response) => {
  const page = parseInt(req.params.page as string, 10) || 1;
  const op = ((req.params.op as string) || '') as Operators;
  const value = parseInt(req.params.value as string, 10) || 0;
  return res.status(200).send(numbersModel.getItems(page, op, value));
};

export const updateNumbers = async (req: Request, res: Response) => {
  const numbers = req.body;
  if (numbers.length) {
    numbersModel.updateItems(numbers);
    return res.status(200).send();
  }
  return res.status(401).send();
};

export const getSelected = async (_req: Request, res: Response) => {
  return res.status(200).send(numbersModel.getSelected());
};
export const updateSelected = async (req: Request, res: Response) => {
  const numbers = req.body;
  numbersModel.updateSelected(numbers || []);
  return res.status(200).send();
};

export const getTotal = (req: Request, res: Response) => {
  const op = ((req.params.op as string) || '') as Operators;
  const value = parseInt(req.params.value as string, 10) || 0;
  return res.status(200).json({ total: numbersModel.getTotal(op, value) });
};
