import React from 'react';

export default function Quote({ quote }: { quote: string[] }) {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            {/* <div className="sm:text-center lg:text-left"> */}
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-8xl md:text-6xl">
                <span className="block xl:inline">{quote[0]}</span>
                <span className="block text-indigo-600 xl:inline">
                  {quote[1]}
                </span>
              </h1>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
