/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { GenericModule } from './pages/GenericModule';
import { Finance } from './pages/Finance';
import { Discipline } from './pages/Discipline';
import { Planner } from './pages/Planner';
import { AIHub } from './pages/AIHub';
import { Profile } from './pages/Profile';
import { Study } from './pages/Study';
import { Health } from './pages/Health';
import { Business } from './pages/Business';
import { Communication } from './pages/Communication';
import { Jobs } from './pages/Jobs';
import { Power } from './pages/Power';
import { Biometrics } from './pages/Biometrics';
import { Timeline } from './pages/Timeline';
import { Documents } from './pages/Documents';
import { Automations } from './pages/Automations';
import { IoT } from './pages/IoT';
import { Notes } from './pages/Notes';
import SystemReport from './pages/SystemReport';
import { BootLoader } from './components/BootSequence';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [booting, setBooting] = useState(true);

  if (booting) {
    return <BootLoader onComplete={() => setBooting(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          
          {/* Core Platform */}
          <Route path="timeline/*" element={<Timeline />} />
          <Route path="ai-hub/*" element={
            <ErrorBoundary>
              <AIHub />
            </ErrorBoundary>
          } />
          <Route path="automations/*" element={<Automations />} />

          {/* Life Modules */}
          <Route path="finance/*" element={<Finance />} />
          <Route path="study/*" element={<Study />} />
          <Route path="health/*" element={<Health />} />
          <Route path="discipline/*" element={<Discipline />} />
          <Route path="communication/*" element={<Communication />} />
          <Route path="business/*" element={<Business />} />
          <Route path="power/*" element={<Power />} />
          <Route path="planner/*" element={<Planner />} />
          <Route path="jobs/*" element={<Jobs />} />
          <Route path="notes/*" element={<Notes />} />
          
          {/* Preset Generic Modules */}
          <Route path="labs/*" element={<GenericModule title="Labs" description="Experimental features and neural prototypes." />} />
          <Route path="network/*" element={<GenericModule title="Network" description="Monitoring relational throughput and node health." />} />
          <Route path="archive/*" element={<GenericModule title="Archive" description="Long-term indexing of life events and documents." />} />
          
          {/* Intelligence Layer */}
          <Route path="iot/*" element={<IoT />} />
          <Route path="biometrics/*" element={<Biometrics />} />
          <Route path="documents/*" element={<Documents />} />
          <Route path="backend-report/*" element={<SystemReport />} />

          <Route path="settings/*" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
