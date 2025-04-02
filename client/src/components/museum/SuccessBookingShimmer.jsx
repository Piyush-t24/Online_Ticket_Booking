import React from 'react';

const SuccessBookingSkeleton = () => {
    const shimmerEffect = (
        <div className="animate-pulse bg-gray-200 rounded-lg w-full h-4"></div>
    );

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 transition-colors z-50">
            <div className="bg-white rounded-xl shadow p-4 mx-2 mt-[8vh] max-h-[85vh] overflow-y-scroll scrollbar-hidden transition-all relative w-full max-w-md">
                <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4 shimmer">
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 shimmer">{shimmerEffect}</h2>
                    <div className="flex items-center justify-center shimmer">
                        {shimmerEffect}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shimmer">
                        <div className="font-semibold shimmer">{shimmerEffect}</div>
                        <div className="shimmer">{shimmerEffect}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shimmer">
                        <div className="font-semibold shimmer">{shimmerEffect}</div>
                        <div className="shimmer">{shimmerEffect}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shimmer">
                        <h3 className="font-semibold mb-2 shimmer">{shimmerEffect}</h3>
                        <div className="grid grid-cols-2 gap-1 shimmer">
                            {shimmerEffect}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shimmer">
                        <h3 className="font-semibold mb-2 shimmer">{shimmerEffect}</h3>
                        <div className="shimmer">{shimmerEffect}</div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-4 shimmer">
                    <h3 className="font-semibold mb-2 shimmer">{shimmerEffect}</h3>
                    <div className="shimmer">{shimmerEffect}</div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600 shimmer">
                    {shimmerEffect}
                </div>
            </div>
        </div>
    );
};

export default SuccessBookingSkeleton;