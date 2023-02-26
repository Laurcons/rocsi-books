import { Book, BookObtainMode, Prisma } from '@prisma/client';
import { useEffect, useReducer, useRef, useState } from 'react';
import { Card, Col, FormControl, FormSelect, Row, Table } from 'react-bootstrap';
import { TagsInput } from 'react-tag-input-component';

export type BookQuery = {
  take?: number;
  skip?: number;
} & Partial<Book>;

interface FilterConfig {
  name: keyof BookQuery;
  humanized: string;
  type: 'string' | 'enum' | 'tags';
  nullable?: boolean;
  // enum val, humanized val
  values?: [string, string][];
  if?: (state: BookQuery) => boolean;
}

const filters: FilterConfig[] = [
  {
    name: 'title',
    humanized: 'Titlu',
    type: 'string',
  },
  {
    name: 'author',
    humanized: 'Autor',
    type: 'string',
  },
  {
    name: 'obtainMode',
    humanized: 'Modul obținerii',
    type: 'enum',
    values: [
      [BookObtainMode.BOUGHT, 'Cumpărată'],
      [BookObtainMode.RECEIVED, 'Primită'],
    ],
  },
  {
    name: 'receivedFrom',
    humanized: 'Primit de la',
    type: 'string',
    if: (state) => state.obtainMode === BookObtainMode.RECEIVED,
  },
  {
    name: 'tags',
    humanized: 'Etichete',
    type: 'tags',
  },
];

export default function FilteredSearch({
  onFilters,
  addTagRef,
}: {
  onFilters: (newFilters: BookQuery) => void;
  addTagRef?: ReturnType<typeof useRef>;
}) {
  const [displayedFilters, setDisplayedFilters] = useState<FilterConfig[]>(filters);
  const [state, dispatch] = useReducer(
    (prevState: BookQuery, [key, value]: [keyof BookQuery, any]) => {
      const newState = {
        ...prevState,
        [key]: value,
      };
      if (!value) {
        delete newState[key];
      }
      // update conditions on filters
      setDisplayedFilters(
        filters.filter((f) => {
          if (f.if) {
            if (f.if(newState)) {
              return true;
            }
            // if the cond is not true, the field is hidden,
            //  and it should be deleted from the state
            delete newState[f.name];
            return false;
          }
          return true;
        })
      );
      return newState;
    },
    {}
  );

  if (addTagRef) {
    addTagRef.current = (tag: string) => {
      dispatch(['tags', [...(state.tags ?? []), tag]]);
    };
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilters(state);
    }, 500);
    // cleanup
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <>
      <Card className="mb-3">
        <Card.Header>Căutare avansată</Card.Header>
        <Card.Body>
          {displayedFilters.map((filter) => (
            <Row key={filter.name}>
              <Col md="3" className="p-2">
                {filter.humanized}
              </Col>
              <Col md="9" className="p-1">
                {filter.type === 'string' && (
                  <>
                    <FormControl
                      type="text"
                      value={(state[filter.name] as any) ?? ''}
                      onChange={(ev) => dispatch([filter.name, ev.target.value])}
                    />
                  </>
                )}
                {filter.type === 'enum' && (
                  <>
                    <FormSelect
                      value={(state[filter.name] as any) ?? ''}
                      onChange={(ev) => dispatch([filter.name, ev.target.value])}
                    >
                      <option key="none" value="">
                        Indiferent
                      </option>
                      {filter.values!.map((v) => (
                        <option key={v[0]} value={v[0]}>
                          {v[1]}
                        </option>
                      ))}
                    </FormSelect>
                  </>
                )}
                {filter.type === 'tags' && (
                  <>
                    <TagsInput
                      value={(state[filter.name] as string[]) ?? []}
                      onChange={(tags) => dispatch([filter.name, tags])}
                      placeHolder="Introdu etichete"
                    />
                  </>
                )}
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}
