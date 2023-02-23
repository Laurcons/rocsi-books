import { BookObtainMode, Prisma } from '@prisma/client';
import { useEffect, useReducer, useState } from 'react';
import { Card, FormControl, FormSelect, Table } from 'react-bootstrap';

export type BookQuery = {
  take?: number;
  skip?: number;
} & Prisma.BookSelect;

interface FilterConfig {
  name: keyof BookQuery;
  humanized: string;
  type: 'string' | 'enum';
  nullable?: boolean;
  // enum val, humanized val
  values?: [string, string][];
}

const filters: FilterConfig[] = [
  {
    name: 'title',
    humanized: 'Titlu',
    type: 'string',
  },
  {
    name: 'obtainMode',
    humanized: 'Data obținerii',
    type: 'enum',
    values: [
      [BookObtainMode.BOUGHT, 'Cumpărată'],
      [BookObtainMode.RECEIVED, 'Primită'],
    ]
  }
];

export default function FilteredSearch(
  { 
    onFilters,
  }:
  { 
    onFilters: (newFilters: BookQuery) => void;
  }
) {
  const [state, dispatchState] = useReducer((prevState: BookQuery, [key, value]: [keyof BookQuery, any]) => {
    const newState = {
      ...prevState,
      [key]: value,
    };
    if (!value) {
      delete newState[key];
    }
    return newState;
  }, {});

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilters(state);
    }, 500);
    // cleanup
    return () => clearTimeout(timeout);
  }, [state, onFilters]);

  return <>
    <Card className="mb-3">
      <Card.Header>Căutare avansată</Card.Header>
      <Card.Body className="p-0">
        <Table className="m-0">
          <tbody>
            {filters.map(filter => <>
              <tr>
                <td>{ filter.humanized }</td>
                <td>
                  { filter.type === 'string' && <>
                    <FormControl type="text" value={state[filter.name] as any ?? ''} onChange={ev => dispatchState([filter.name, ev.target.value])} />
                  </>}
                  { filter.type === 'enum' && <>
                    <FormSelect value={state[filter.name] as any} onChange={ev => dispatchState([filter.name, ev.target.value])}>
                      { filter.values!.map(v => <option key={v[0]} value={v[0]}>{v[1]}</option>)}
                    </FormSelect>
                  </>}
                </td>
              </tr>
            </>)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  </>;
}