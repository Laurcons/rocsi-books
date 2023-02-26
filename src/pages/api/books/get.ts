import { prisma } from '@/lib/prisma';
import { termToRegexStage } from '@/lib/search/termToRegexStage';
import { Book, BookObtainMode } from '@prisma/client';
import { plainToClass, Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsNumberString, isNumberString, IsOptional, IsString, validateOrReject } from 'class-validator';
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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(o => o.value?.split(','))
  tags: string[];
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const query = plainToClass(QueryParams, req.query);
  await validateOrReject(query);
  const { skip, take, author, notes, obtainMode, receivedFrom, title, tags } = query;

  const pipeline = [
    {
      $match: {
        ...(title && { title: termToRegexStage(title) }),
        ...(author && { author: termToRegexStage(author) }),
        ...(notes && { notes: termToRegexStage(notes) }),
        ...(receivedFrom && { receivedFrom: termToRegexStage(receivedFrom) }),
        ...(obtainMode && { obtainMode }),
        ...(tags && {
          $expr: {
            $setIsSubset: [tags, '$tags']
          }
        })
      }
    },
    ...(skip ? [{
      $skip: skip
    }] : []),
    ...(take ? [{
      $limit: take
    }] : []),
    {
      // projection for Prisma
      $addFields: {
        id: { $toString: '$_id' }
      }
    }
  ];

  console.log(JSON.stringify({ pipeline }, null, 2));

  const books = await prisma.book.aggregateRaw({
    pipeline
  });

  res.json(books);
}