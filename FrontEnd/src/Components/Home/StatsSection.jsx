import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const StatsSection = () => {
  const [counts, setCounts] = useState({
    jobs: 0,
    companies: 0,
    listings: 0,
  });

  useEffect(() => {
    const targetCounts = { jobs: 250, companies: 48, listings: 12 };
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      setCounts({
        jobs: Math.floor(progress * targetCounts.jobs),
        companies: Math.floor(progress * targetCounts.companies),
        listings: Math.floor(progress * targetCounts.listings),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="mt-10 text-center md:flex md:justify-center md:gap-12 md:text-center">
      <div className="mb-6 md:mb-0">
        <h2 className="text-4xl font-bold text-green-500">{counts.jobs}+</h2>
        <p className="text-emerald-300">Active Jobs</p>
      </div>

      <div className="mb-6 md:mb-0">
        <h2 className="text-4xl font-bold text-green-500">{counts.companies}+</h2>
        <p className="text-emerald-300">Companies Hiring</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-green-500">{counts.listings}+</h2>
        <p className="text-emerald-300">New Listings Today</p>
      </div>
    </div>
  );
};

export default StatsSection;
