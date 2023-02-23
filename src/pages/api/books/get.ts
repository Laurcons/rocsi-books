import { prisma } from '@/lib/prisma';
import { termToRegex } from '@/lib/search/termToRegex';
import { Book, BookObtainMode } from '@prisma/client';
import { plainToClass, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsNumberString, isNumberString, IsOptional, IsString, validateOrReject } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';

class QueryParams implements Partial<Book> {
  @IsOptional()
  @IsNumber()
  @Transform(o => parseInt(o.value))
    skip: number;

  @IsOptional()
  @IsNumber()
  @Transform(o => parseInt(o.value))
    take: number;

  @IsOptional()
  @IsString()
    title: string;

  @IsOptional()
  @IsString()
    author: string;

  @IsOptional()
  @IsEnum(Object.values(BookObtainMode))
    obtainMode: BookObtainMode;

  @IsOptional()
  @IsString()
    receivedFrom: string;

  @IsOptional()
  @IsString()
    notes: string;
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const query = plainToClass(QueryParams, req.query);
  await validateOrReject(query);
  const { skip, take, author, notes, obtainMode, receivedFrom, title } = query;

  const books = await prisma.book.aggregateRaw({
    pipeline: [
      {
        $match: {
          ...(title && { author: termToRegex(title) }),
        }
      } as any
    ]
  });
  //   skip, take,
  //   where: {
  //     ...(author && { author: { equals: author, mode: 'insensitive' } }),
  //     ...(notes && { notes: { contains: notes, mode: 'insensitive' } }),
  //     ...(receivedFrom && { receivedFrom: { contains: receivedFrom, mode: 'insensitive' } }),
  //     ...(title && { title: { contains: title, mode: 'insensitive' } }),
  //     ...(obtainMode && { obtainMode }),
  //   }
  // });

  res.json(books);
}