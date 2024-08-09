import { TableProps } from '@/types';
import * as React from 'react';
import TopBar from '../TopBar';
import {
  MRT_GlobalFilterTextInput,
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
} from 'mantine-react-table';
import { styled } from '@pigment-css/react';
import Link from '../Link';

const ToolWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const TableToggleGlobalFilterButton = styled(MRT_ToggleGlobalFilterButton)`
  color: var(--color-blue-1);
`;

const TableToggleFiltersButton = styled(MRT_ToggleFiltersButton)`
  color: var(--color-blue-1);
`;

const CreateLink = styled(Link)`
  background: hsla(0, 0%, 100%, 1);
  border: 2px solid var(--color-blue-1);
  height: 32px;
  color: var(--color-blue-1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-radius: 4px;
  padding: 8px;
`;

function Table<TData extends Record<string, any>>({
  name,
  isEnableCreate = true,
  isEnableTopBar = true,
  isEnableGlobalFilter = true,
  isEnableFilter = true,
  table,
}: TableProps<TData>) {
  return (
    <div>
      {isEnableTopBar && (
        <TopBar>
          <ToolWrapper>
            {isEnableGlobalFilter && (
              <>
                <MRT_GlobalFilterTextInput table={table} />
                <TableToggleGlobalFilterButton table={table} />
              </>
            )}
            {isEnableFilter && <TableToggleFiltersButton table={table} />}
            {isEnableCreate && (
              <CreateLink href={`/admin/${name}s/create`}>
                Create New {name.charAt(0).toUpperCase()}
                {name.slice(1).toLowerCase()}
              </CreateLink>
            )}
          </ToolWrapper>
        </TopBar>
      )}

      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </div>
  );
}

export default Table;
