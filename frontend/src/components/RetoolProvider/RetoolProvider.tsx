'use client';
import * as React from 'react';
import { Refine } from '@refinedev/core';
import dataProvider from '@refinedev/simple-rest';
import { API_URL } from '@/constants';

function RetoolProvider({ children }: { children: React.ReactNode }) {
  return <Refine dataProvider={dataProvider(API_URL)}>{children}</Refine>;
}

export default RetoolProvider;
