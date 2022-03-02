import React from 'react'
import { Skeleton } from '@mantine/core';
const VideoSkeleton = () => {
    return (
        <>
            <Skeleton height={400}  mb="xl" />
            <Skeleton height={8}  mb="xl" />
        </>
    )
}

export default VideoSkeleton