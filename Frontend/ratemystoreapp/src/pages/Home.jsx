import React from 'react';
const Home = () => {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to RateMyStore</h1>
        <p className="text-lg max-w-xl mx-auto">
          Discover the best stores around you. Rate your experiences, help others choose better, and manage your stores efficiently if you're an owner.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/stores"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-medium"
          >
            Explore Stores
          </a>
          <a
            href="/register"
            className="bg-gray-200 text-gray-900 px-6 py-2 rounded-md text-lg font-medium hover:bg-white"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
