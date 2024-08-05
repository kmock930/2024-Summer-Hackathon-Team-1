import { MRT_ColumnDef } from 'mantine-react-table';
import React from 'react';

export const BREAKPOINTS = {
  laptopMax: 1100,
  tabletMax: 1024,
  mobileMax: 430,
};

export const QUERIES = {
  laptopAndDown: `(max-width: ${BREAKPOINTS.laptopMax}px)`,
  tabletAndDown: `(max-width: ${BREAKPOINTS.tabletMax}px)`,
  mobileAndDown: `(max-width: ${BREAKPOINTS.mobileMax}px)`,
};

export const API_URL = 'http://localhost:3001';
