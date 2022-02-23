import React from 'react'
import { Skeleton } from '@mantine/core'
import BlogSkeleton from './blog-skeleton';
const SkeletonGrid = () => {
  return (
    <div className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  );
}

export default SkeletonGrid