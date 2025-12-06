// app/dashboard/page.js
'use client';
import { Suspense } from "react";
import Layout from "./layout.jsx"; // the component you showed me

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Layout />
    </Suspense>
  );
}

