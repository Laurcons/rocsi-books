import { prisma } from "@/lib/prisma";
import { plainToClass, Transform } from "class-transformer";
import { IsNumber, IsNumberString, isNumberString, IsOptional, validateOrReject } from "class-validator";
import { NextApiRequest, NextApiResponse } from "next";

class QueryParams {
  @IsOptional()
  @IsNumber()
  @Transform(o => parseInt(o.value))
  skip: number;

  @IsOptional()
  @IsNumber()
  @Transform(o => parseInt(o.value))
  take: number;
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const query = plainToClass(QueryParams, req.query);
  await validateOrReject(query);
  const { skip, take, ...filters } = query;

  const books = await prisma.book.findMany({
    skip, take,
    where: filters
  });

  res.json(books);
}