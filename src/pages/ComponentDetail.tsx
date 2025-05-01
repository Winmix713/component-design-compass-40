
import React from 'react';
import { useParams } from 'react-router-dom';
import { findComponentById } from '@/lib/componentData';
import ComponentPage from '@/components/ComponentPage';
import NotFound from './NotFound';

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const component = id ? findComponentById(id) : undefined;
  
  if (!component) {
    return <NotFound />;
  }
  
  return <ComponentPage component={component} />;
};

export default ComponentDetail;
