import React from 'react';

interface ShimmerSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4' 
}) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded ${width} ${height} ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
  );
};

// Predefined skeleton components for common use cases
export const SkeletonCard: React.FC = () => (
  <div className="space-y-3">
    <ShimmerSkeleton height="h-4" width="w-3/4" />
    <ShimmerSkeleton height="h-3" width="w-full" />
    <ShimmerSkeleton height="h-3" width="w-5/6" />
  </div>
);

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <ShimmerSkeleton 
        key={i} 
        height="h-3" 
        width={i === lines - 1 ? 'w-5/6' : 'w-full'} 
      />
    ))}
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: string }> = ({ size = 'w-8 h-8' }) => (
  <ShimmerSkeleton className="rounded-full" width={size} height={size} />
);

export const SkeletonButton: React.FC<{ width?: string }> = ({ width = 'w-24' }) => (
  <ShimmerSkeleton height="h-10" width={width} className="rounded-lg" />
);
