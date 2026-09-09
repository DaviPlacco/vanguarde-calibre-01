import { use } from 'react';
import ProductClient from './ProductClient';

export async function generateStaticParams() {
  return [
    { id: 'heritage-1952' },
    { id: 'sky-gazer' },
    { id: 'oceanic-deep' }
  ];
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return <ProductClient id={id} />;
}
